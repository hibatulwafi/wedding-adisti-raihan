<template>
  <div class="mx-auto max-w-5xl px-4 py-8">
    <!-- Secure Passcode Gate (If not authenticated) -->
    <div v-if="!isAuthenticated" class="min-h-[70vh] flex items-center justify-center">
      <div class="glass max-w-sm w-full p-8 rounded-3xl shadow-2xl border border-white/40 text-center space-y-6 animate-fade-in">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold/20 to-blush-100 text-rose-gold shadow-sm animate-float-slow">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <div>
          <h2 class="text-2xl text-rose-gold-dark font-semibold" style="font-family: var(--font-serif);">
            Akses Terkunci
          </h2>
          <p class="text-xs text-gray-500 mt-1" style="font-family: var(--font-sans);">
            Silakan masukkan kode sandi administrator untuk membuka dashboard RSVP.
          </p>
        </div>
        <form @submit.prevent="authenticate" class="space-y-4">
          <input
            v-model="passcode"
            type="password"
            placeholder="Masukkan Kode Sandi..."
            class="w-full text-center tracking-[0.2em] font-bold text-sm bg-white/70 px-4 py-3 rounded-xl border border-blush-200 outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold/20"
          />
          <p v-if="authError" class="text-xs text-red-500 font-medium">❌ Kode sandi salah!</p>
          <button
            type="submit"
            class="w-full py-3 rounded-full bg-gradient-to-r from-rose-gold to-blush-400 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Buka Akses
          </button>
        </form>
      </div>
    </div>

    <!-- Full Screen Dashboard (If authenticated) -->
    <div v-else class="space-y-8 animate-fade-in">
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-blush-100/50 pb-6">
        <div>
          <h1 class="text-4xl text-rose-gold-dark" style="font-family: var(--font-script);">
            RSVP Admin Dashboard
          </h1>
          <p class="text-xs text-rose-gold/70 mt-1" style="font-family: var(--font-sans);">
            Kelola data kehadiran dan ucapan dari para tamu terhormat
          </p>
        </div>
        
        <div class="flex gap-2">
          <button
            @click="exportCsv"
            class="px-4 py-2 rounded-full border border-rose-gold/30 bg-white/70 text-rose-gold text-xs font-semibold uppercase hover:bg-rose-gold hover:text-white transition-all duration-300 flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Ekspor ke Excel
          </button>
          
          <button
            @click="logout"
            class="px-4 py-2 rounded-full border border-red-200 bg-white/70 text-red-500 text-xs font-semibold uppercase hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
          >
            Keluar
          </button>
        </div>
      </header>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="glass rounded-2xl p-5 text-center shadow border border-white/40">
          <p class="text-3xl font-bold text-rose-gold-dark" style="font-family: var(--font-serif);">{{ totalRsvp }}</p>
          <p class="text-xs text-gray-500 font-medium mt-1" style="font-family: var(--font-sans);">Total Respon RSVP</p>
        </div>
        
        <div class="glass rounded-2xl p-5 text-center shadow border border-white/40">
          <p class="text-3xl font-bold text-green-600" style="font-family: var(--font-serif);">{{ totalGuests }}</p>
          <p class="text-xs text-gray-500 font-medium mt-1" style="font-family: var(--font-sans);">Total Tamu Hadir</p>
        </div>
        
        <div class="glass rounded-2xl p-5 text-center shadow border border-white/40">
          <p class="text-3xl font-bold text-red-500" style="font-family: var(--font-serif);">{{ totalNotAttending }}</p>
          <p class="text-xs text-gray-500 font-medium mt-1" style="font-family: var(--font-sans);">Tamu Tidak Hadir</p>
        </div>
      </div>

      <!-- Controls & Filter -->
      <div class="glass rounded-2xl p-4 shadow border border-white/40 flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Filter Tabs -->
        <div class="flex gap-1.5 w-full md:w-auto bg-gray-100/50 p-1 rounded-xl">
          <button
            @click="filterStatus = 'all'"
            class="flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300"
            :class="filterStatus === 'all' ? 'bg-white text-rose-gold-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            Semua
          </button>
          <button
            @click="filterStatus = 'yes'"
            class="flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300"
            :class="filterStatus === 'yes' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            Hadir
          </button>
          <button
            @click="filterStatus = 'no'"
            class="flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300"
            :class="filterStatus === 'no' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            Tidak Hadir
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama tamu..."
            class="w-full text-xs text-gray-700 bg-white/60 pl-10 pr-4 py-2.5 rounded-xl border border-blush-200 outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold/20"
          />
          <svg class="absolute left-3.5 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Guest Table & Feed -->
      <div class="glass rounded-2xl shadow border border-white/40 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs bg-white/20">
            <thead class="bg-blush-50/50 text-rose-gold-dark font-semibold border-b border-blush-100/50">
              <tr>
                <th class="px-6 py-3.5 text-center w-12">No.</th>
                <th class="px-6 py-3.5 w-48">Nama Tamu</th>
                <th class="px-6 py-3.5 text-center w-24">Status</th>
                <th class="px-6 py-3.5 text-center w-20">Tamu</th>
                <th class="px-6 py-3.5">Ucapan & Doa Restu</th>
                <th class="px-6 py-3.5 w-40 text-center">Waktu Kirim</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blush-100/30">
              <tr
                v-for="(r, idx) in filteredList"
                :key="idx"
                class="hover:bg-blush-50/10 transition-all duration-300"
              >
                <td class="px-6 py-4 text-center text-gray-400">{{ idx + 1 }}</td>
                <td class="px-6 py-4 font-semibold text-gray-700">{{ r.name }}</td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="px-2 py-0.5 rounded-full text-[9px] font-medium"
                    :class="r.attending === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                  >
                    {{ r.attending === 'yes' ? 'Hadir' : 'Tidak Hadir' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center font-mono font-bold text-gray-600">
                  {{ r.attending === 'yes' ? r.guests : '-' }}
                </td>
                <td class="px-6 py-4 text-gray-600 leading-relaxed max-w-sm break-words italic">
                  "{{ r.message || '— Tanpa Ucapan —' }}"
                </td>
                <td class="px-6 py-4 text-center text-gray-400 font-mono text-[10px]">
                  {{ formatDate(r.createdAt) }}
                </td>
              </tr>
              <tr v-if="filteredList.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-400 font-medium">
                  Belum ada data RSVP atau tidak ditemukan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

// Auth passcode protection state
const isAuthenticated = ref(false)
const passcode = ref('')
const authError = ref(false)

const authenticate = () => {
  if (passcode.value === 'raihanwithadisti') {
    isAuthenticated.value = true
    authError.value = false
    sessionStorage.setItem('wedding_admin_auth', 'true')
  } else {
    authError.value = true
  }
}

const logout = () => {
  isAuthenticated.value = false
  passcode.value = ''
  sessionStorage.removeItem('wedding_admin_auth')
}

// Data fetching
const rsvpList = ref([])
const searchQuery = ref('')
const filterStatus = ref('all') // 'all', 'Hadir', 'Tidak Hadir'

const totalRsvp = computed(() => rsvpList.value.length)
const totalGuests = computed(() => {
  return rsvpList.value
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => {
      const g = typeof r.guests === 'string' ? parseInt(r.guests) : r.guests
      return sum + (g || 1)
    }, 0)
})
const totalNotAttending = computed(() => rsvpList.value.filter(r => r.attending === 'no').length)

const filteredList = computed(() => {
  let list = rsvpList.value

  // Apply status filter
  if (filterStatus.value !== 'all') {
    list = list.filter(r => r.attending === filterStatus.value)
  }

  // Apply search query
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(r => r.name.toLowerCase().includes(q))
  }

  return list
})

const fetchData = async () => {
  try {
    const isPlaceholder = !db || !db.app || db.app.options?.apiKey === 'YOUR_API_KEY'
    if (isPlaceholder) {
      throw new Error('Firebase using placeholder configuration')
    }

    const q = query(collection(db, 'rsvp-disti-raihan'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    rsvpList.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.warn('Rsvp Dashboard: Falling back to localStorage database. Reason:', e.message || e)
    const local = localStorage.getItem('wedding_rsvp_wishes')
    if (local) {
      rsvpList.value = JSON.parse(local)
    } else {
      // Seed default wishes if localStorage is empty
      const defaultWishes = [
        {
          name: 'Budi Raharjo',
          attending: 'yes',
          guests: 2,
          message: 'Selamat menempuh hidup baru Adisti & Raihan! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin ya rabbal alamin.',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          name: 'Siti Aminah',
          attending: 'yes',
          guests: 1,
          message: 'Alhamdulillah, selamat ya Adisti dan Raihan! Lancar terus acaranya sampai hari H. So happy for you both! 💕',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
          name: 'Farhan & Keluarga',
          attending: 'yes',
          guests: '5+',
          message: 'Selamat berbahagia untuk kedua mempelai! Maaf belum bisa hadir langsung karena masih di luar kota, tapi doa terbaik dari kami sekeluarga selalu menyertai.',
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
        }
      ]
      rsvpList.value = defaultWishes
      localStorage.setItem('wedding_rsvp_wishes', JSON.stringify(defaultWishes))
    }
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return '—'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const exportCsv = () => {
  if (rsvpList.value.length === 0) return
  
  let csvContent = "data:text/csv;charset=utf-8,No,Nama Tamu,Status Kehadiran,Jumlah Tamu,Ucapan Doa,Waktu Kirim\n"
  
  rsvpList.value.forEach((r, idx) => {
    const escapedName = r.name.replace(/"/g, '""')
    const escapedMessage = (r.message || '').replace(/"/g, '""')
    const timeText = formatDate(r.createdAt).replace(/"/g, '""')
    const att = r.attending === 'yes' ? 'Hadir' : 'Tidak Hadir'
    csvContent += `${idx + 1},"${escapedName}",${att},${r.guests},"${escapedMessage}","${timeText}"\n`
  })
  
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "Data_RSVP_Undangan_Adisti_Raihan.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  // Restore auth state if previously unlocked in this session
  if (sessionStorage.getItem('wedding_admin_auth') === 'true') {
    isAuthenticated.value = true
  }
  
  fetchData()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.45s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
