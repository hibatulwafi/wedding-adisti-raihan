<template>
  <div v-if="showDashboard" class="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="relative mx-4 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 md:p-8 shadow-2xl animate-fade-in-up">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <h2 class="text-2xl text-rose-gold-dark mb-6" style="font-family: var(--font-script);">Admin Dashboard</h2>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div class="rounded-xl bg-gradient-to-br from-blush-50 to-blush-100 p-4 text-center">
          <p class="text-3xl font-bold text-rose-gold-dark" style="font-family: var(--font-serif);">{{ totalRsvp }}</p>
          <p class="text-xs text-gray-500 mt-1" style="font-family: var(--font-sans);">Total RSVP</p>
        </div>
        <div class="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
          <p class="text-3xl font-bold text-green-700" style="font-family: var(--font-serif);">{{ totalGuests }}</p>
          <p class="text-xs text-gray-500 mt-1" style="font-family: var(--font-sans);">Total Tamu Hadir</p>
        </div>
        <div class="rounded-xl bg-gradient-to-br from-red-50 to-red-100 p-4 text-center col-span-2 md:col-span-1">
          <p class="text-3xl font-bold text-red-600" style="font-family: var(--font-serif);">{{ totalNotAttending }}</p>
          <p class="text-xs text-gray-500 mt-1" style="font-family: var(--font-sans);">Tidak Hadir</p>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto rounded-xl border border-gray-200">
        <table class="w-full text-sm" style="font-family: var(--font-sans);">
          <thead class="bg-blush-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-rose-gold-dark uppercase tracking-wider">Nama</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-rose-gold-dark uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-rose-gold-dark uppercase tracking-wider">Tamu</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(r, i) in rsvpList" :key="i" class="hover:bg-blush-50/50 transition-colors">
              <td class="px-4 py-3 text-gray-700">{{ r.name }}</td>
              <td class="px-4 py-3 text-center">
                <span class="inline-block px-2 py-0.5 rounded-full text-xs" :class="r.attendance === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'">{{ r.attendance }}</span>
              </td>
              <td class="px-4 py-3 text-center text-gray-600">{{ r.attendance === 'Hadir' ? r.guests : '-' }}</td>
            </tr>
            <tr v-if="rsvpList.length === 0">
              <td colspan="3" class="px-4 py-8 text-center text-gray-400">Belum ada data RSVP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

const props = defineProps({
  showDashboard: { type: Boolean, default: false }
})

defineEmits(['close'])

const rsvpList = ref([])

const totalRsvp = computed(() => rsvpList.value.length)
const totalGuests = computed(() => rsvpList.value.filter(r => r.attendance === 'Hadir').reduce((sum, r) => {
  const g = typeof r.guests === 'string' ? parseInt(r.guests) : r.guests
  return sum + (g || 1)
}, 0))
const totalNotAttending = computed(() => rsvpList.value.filter(r => r.attendance === 'Tidak Hadir').length)

const fetchData = async () => {
  try {
    const isPlaceholder = !db || !db.app || db.app.options?.apiKey === 'YOUR_API_KEY'
    if (isPlaceholder) {
      throw new Error('Firebase using placeholder configuration')
    }

    const q = query(collection(db, 'rsvp-raihan'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    rsvpList.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.warn('Admin Dashboard: Falling back to localStorage database. Reason:', e.message || e)
    const local = localStorage.getItem('wedding_rsvp_wishes')
    if (local) {
      rsvpList.value = JSON.parse(local)
    } else {
      // Default fallback matching RSVP seed
      const defaultWishes = [
        {
          name: 'Budi Raharjo',
          attendance: 'Hadir',
          guests: 2,
          message: 'Selamat menempuh hidup baru Adisti & Raihan! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin ya rabbal alamin.'
        },
        {
          name: 'Siti Aminah',
          attendance: 'Hadir',
          guests: 1,
          message: 'Alhamdulillah, selamat ya Adisti dan Raihan! Lancar terus acaranya sampai hari H. So happy for you both! 💕'
        },
        {
          name: 'Farhan & Keluarga',
          attendance: 'Hadir',
          guests: 2,
          message: 'Selamat berbahagia untuk kedua mempelai! Maaf belum bisa hadir langsung karena masih di luar kota, tapi doa terbaik dari kami sekeluarga selalu menyertai.'
        }
      ]
      rsvpList.value = defaultWishes
      localStorage.setItem('wedding_rsvp_wishes', JSON.stringify(defaultWishes))
    }
  }
}

watch(() => props.showDashboard, (val) => {
  if (val) fetchData()
})

onMounted(() => {
  if (props.showDashboard) fetchData()
})
</script>
