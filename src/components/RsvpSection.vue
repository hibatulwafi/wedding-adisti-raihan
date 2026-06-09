<template>
  <section id="rsvp" class="relative py-20 md:py-28 overflow-hidden">
    <div class="parallax-blob w-72 h-72 bg-rose-gold-light -bottom-20 -right-20" style="animation-delay: 2s;"></div>

    <div class="mx-auto max-w-4xl px-6">
      <div class="mb-16 text-center" data-animate="fade-up">
        <h2 class="text-4xl md:text-5xl text-rose-gold-dark" style="font-family: var(--font-script);">RSVP & Ucapan</h2>
        <div class="ornament-divider">
          <svg class="h-5 w-5 text-rose-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>

      <!-- Form -->
      <div class="glass rounded-2xl p-6 md:p-8 shadow-lg mb-12" data-animate="zoom-in" data-delay="100">
        <form @submit.prevent="submitRsvp" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-rose-gold-dark mb-1" style="font-family: var(--font-sans);">Nama</label>
            <input v-model="form.name" type="text" required placeholder="Masukkan nama Anda"
              class="w-full rounded-lg border border-blush-200 bg-white/80 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 focus:shadow-[0_0_15px_rgba(183,110,121,0.1)]"
              style="font-family: var(--font-sans);" />
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-rose-gold-dark mb-1" style="font-family: var(--font-sans);">Kehadiran</label>
              <select v-model="form.attending" required
                class="w-full rounded-lg border border-blush-200 bg-white/80 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                style="font-family: var(--font-sans);">
                <option value="" disabled>Pilih kehadiran</option>
                <option value="yes">Ya, saya akan hadir</option>
                <option value="no">Maaf, saya tidak bisa hadir</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-rose-gold-dark mb-1" style="font-family: var(--font-sans);">Jumlah Tamu</label>
              <select v-model="form.guests" required
                class="w-full rounded-lg border border-blush-200 bg-white/80 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                style="font-family: var(--font-sans);">
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3">3 Orang</option>
                <option value="4">4 Orang</option>
                <option value="5">5 Orang</option>
                <option value="5+">5+ Orang</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-rose-gold-dark mb-1" style="font-family: var(--font-sans);">Ucapan & Doa</label>
            <textarea v-model="form.message" rows="3" placeholder="Tulis ucapan dan doa untuk mempelai..."
              class="w-full rounded-lg border border-blush-200 bg-white/80 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 focus:shadow-[0_0_15px_rgba(183,110,121,0.1)] resize-none"
              style="font-family: var(--font-sans);"></textarea>
          </div>

          <button type="submit" :disabled="submitting"
            class="group w-full rounded-full bg-gradient-to-r from-rose-gold to-blush-400 px-6 py-3 text-sm tracking-wider text-white uppercase shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed animate-gradient-shift"
            style="font-family: var(--font-sans);">
            <span v-if="!submitting" class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              Kirim Ucapan
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
              Mengirim...
            </span>
          </button>

          <!-- Success message -->
          <Transition name="success-msg">
            <p v-if="submitSuccess" class="text-center text-sm text-green-600" style="font-family: var(--font-sans);">
              ✨ Terima kasih! Ucapan Anda telah terkirim.
            </p>
          </Transition>
        </form>
      </div>

      <!-- Wishes Feed -->
      <div data-animate="fade-up" data-delay="200">
        <h3 class="text-center text-xl text-rose-gold-dark mb-6" style="font-family: var(--font-script);">Ucapan & Doa</h3>
        <div v-if="wishes.length === 0" class="text-center text-sm text-gray-400 py-8" style="font-family: var(--font-sans);">
          Belum ada ucapan. Jadilah yang pertama! 🌸
        </div>
        <TransitionGroup name="wish-list" tag="div" class="space-y-4">
          <div
            v-for="(wish, i) in paginatedWishes"
            :key="wish.id || i"
            class="glass rounded-xl p-4 shadow-sm hover-lift"
          >
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold to-blush-400 text-white text-sm font-bold shrink-0">
                {{ wish.name.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-medium text-sm text-rose-gold-dark" style="font-family: var(--font-sans);">{{ wish.name }}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full transition-colors" :class="wish.attending === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'" style="font-family: var(--font-sans);">
                    {{ wish.attending === 'yes' ? 'Hadir' : 'Tidak Hadir' }}
                  </span>
                </div>
                <p class="mt-1 text-sm text-gray-600 leading-relaxed" style="font-family: var(--font-sans);">{{ wish.message }}</p>
                <p class="mt-1 text-xs text-gray-400" style="font-family: var(--font-sans);">{{ formatDate(wish.createdAt) }}</p>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-4" style="font-family: var(--font-sans);">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            class="flex h-8 w-8 items-center justify-center rounded-full border border-rose-gold/30 text-rose-gold transition-all hover:bg-rose-gold hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-rose-gold"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="text-sm text-gray-500">
            Halaman <span class="font-semibold text-rose-gold-dark">{{ currentPage }}</span> dari {{ totalPages }}
          </span>
          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages"
            class="flex h-8 w-8 items-center justify-center rounded-full border border-rose-gold/30 text-rose-gold transition-all hover:bg-rose-gold hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-rose-gold"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore'

const form = ref({
  name: '',
  attending: '',
  guests: '1',
  message: ''
})

const submitting = ref(false)
const submitSuccess = ref(false)
const wishes = ref([])

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 5

const paginatedWishes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return wishes.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(wishes.value.length / itemsPerPage))

// Seeding high-quality default mock wishes to keep the UI engaging and beautiful before Firebase setup
const defaultWishes = [
  {
    id: 'mock-1',
    name: 'Budi Raharjo',
    attending: 'yes',
    message: 'Selamat menempuh hidup baru Adisti & Raihan! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin ya rabbal alamin.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
  },
  {
    id: 'mock-2',
    name: 'Siti Aminah',
    attending: 'yes',
    message: 'Alhamdulillah, selamat ya Adisti dan Raihan! Lancar terus acaranya sampai hari H. So happy for you both! 💕',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
  },
  {
    id: 'mock-3',
    name: 'Farhan & Keluarga',
    attending: 'yes',
    message: 'Selamat berbahagia untuk kedua mempelai! Maaf belum bisa hadir langsung karena masih di luar kota, tapi doa terbaik dari kami sekeluarga selalu menyertai.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString() // 12 hours ago
  }
]

const fetchWishes = async () => {
  try {
    // If Firebase config is default placeholder, don't trigger noisy console errors
    const isPlaceholder = !db || !db.app || db.app.options?.apiKey === 'YOUR_API_KEY'
    if (isPlaceholder) {
      throw new Error('Firebase using placeholder configuration')
    }

    const q = query(collection(db, 'rsvp-disti-raihan'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    wishes.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.warn('Wishes Feed: Falling back to localStorage database. Reason:', e.message || e)
    const local = localStorage.getItem('wedding_rsvp_wishes')
    if (local) {
      wishes.value = JSON.parse(local)
    } else {
      wishes.value = [...defaultWishes]
      localStorage.setItem('wedding_rsvp_wishes', JSON.stringify(defaultWishes))
    }
  }
}

const submitRsvp = async () => {
  submitting.value = true
  submitSuccess.value = false

  const newWish = {
    name: form.value.name,
    attending: form.value.attending,
    guests: form.value.guests,
    message: form.value.message,
    createdAt: new Date().toISOString()
  }

  try {
    const isPlaceholder = !db || !db.app || db.app.options?.apiKey === 'YOUR_API_KEY'
    if (isPlaceholder) {
      throw new Error('Firebase using placeholder configuration')
    }

    await addDoc(collection(db, 'rsvp-disti-raihan'), {
      ...newWish,
      createdAt: serverTimestamp()
    })
    submitSuccess.value = true
    form.value = { name: '', attending: '', guests: '1', message: '' }
    await fetchWishes()
    currentPage.value = 1 // reset to first page to see new wish
    setTimeout(() => { submitSuccess.value = false }, 4000)
  } catch (e) {
    console.warn('Submitting RSVP locally:', e.message || e)
    
    // Save to local storage database
    const local = localStorage.getItem('wedding_rsvp_wishes')
    const currentWishes = local ? JSON.parse(local) : [...defaultWishes]
    
    const savedWish = {
      id: 'local-' + Date.now(),
      ...newWish
    }
    
    currentWishes.unshift(savedWish)
    localStorage.setItem('wedding_rsvp_wishes', JSON.stringify(currentWishes))
    
    wishes.value = currentWishes
    submitSuccess.value = true
    form.value = { name: '', attending: '', guests: '1', message: '' }
    currentPage.value = 1 // reset to first page to see new wish
    setTimeout(() => { submitSuccess.value = false }, 4000)
  } finally {
    submitting.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(fetchWishes)
</script>

<style scoped>
/* Success message transition */
.success-msg-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.success-msg-leave-active {
  transition: all 0.3s ease;
}
.success-msg-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
.success-msg-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Wish list transitions */
.wish-list-enter-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.wish-list-leave-active {
  transition: all 0.3s ease;
}
.wish-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.wish-list-move {
  transition: transform 0.5s ease;
}
</style>
