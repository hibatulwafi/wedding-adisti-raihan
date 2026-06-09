<template>
  <div class="mx-auto max-w-5xl">
    <!-- Header -->
    <header class="mb-10 text-center">
      <h1 class="text-4xl md:text-5xl text-rose-gold-dark" style="font-family: var(--font-script);">
        Generator Undangan WA
      </h1>
      <p class="mt-2 text-sm text-rose-gold/70" style="font-family: var(--font-sans);">
        Adisti & Raihan Wedding — Kelola dan Kirim Undangan Digital dengan Mudah
      </p>
      <div class="ornament-divider mx-auto max-w-xs">
        <svg class="h-5 w-5 shrink-0 text-rose-gold-light" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </header>

    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Left Panel: Template Configuration -->
      <div class="lg:col-span-1 space-y-6">
        <div class="glass rounded-2xl p-6 shadow-lg border border-white/40">
          <h2 class="text-xl text-rose-gold-dark mb-4 flex items-center gap-2" style="font-family: var(--font-serif);">
            <svg class="h-5 w-5 shrink-0 text-rose-gold" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Template Pesan
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-rose-gold-dark mb-1">Teks Template WhatsApp</label>
              <textarea
                v-model="templateText"
                rows="14"
                class="w-full text-xs text-gray-700 bg-white/70 p-3 rounded-xl border border-blush-200 outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold/20 leading-relaxed resize-y font-sans"
              ></textarea>
            </div>
            
            <div class="rounded-xl bg-blush-50/50 p-3 border border-blush-100/50 text-[10px] text-gray-500 leading-normal space-y-1">
              <p class="font-semibold text-rose-gold-dark text-xs mb-1">Panduan Placeholder:</p>
              <p>• Gunakan <code class="bg-white px-1 py-0.5 rounded border border-blush-200 font-mono text-[9px] font-bold text-rose-gold-dark">{nama}</code> untuk menyisipkan nama tamu.</p>
              <p>• Gunakan <code class="bg-white px-1 py-0.5 rounded border border-blush-200 font-mono text-[9px] font-bold text-rose-gold-dark">{link}</code> untuk menyisipkan tautan undangan kustom.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Generator Mode -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Tab Selectors -->
        <div class="glass rounded-2xl p-2 shadow flex gap-2 border border-white/40">
          <button
            @click="activeTab = 'single'"
            class="flex-1 py-2.5 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
            :class="activeTab === 'single' ? 'bg-gradient-to-r from-rose-gold to-blush-400 text-white shadow-md' : 'text-rose-gold-dark/70 hover:bg-white/40'"
          >
            <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Kirim Satuan (Single)
          </button>
          <button
            @click="activeTab = 'bulk'"
            class="flex-1 py-2.5 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
            :class="activeTab === 'bulk' ? 'bg-gradient-to-r from-rose-gold to-blush-400 text-white shadow-md' : 'text-rose-gold-dark/70 hover:bg-white/40'"
          >
            <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Kirim Banyak (Copas Excel)
          </button>
        </div>

        <!-- Single Mode Card -->
        <div v-if="activeTab === 'single'" class="glass rounded-2xl p-6 shadow-lg border border-white/40 space-y-5">
          <h2 class="text-xl text-rose-gold-dark flex items-center gap-2" style="font-family: var(--font-serif);">
            Input Tamu Satuan
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-rose-gold-dark mb-1">Nama Tamu</label>
              <input
                v-model="singleName"
                type="text"
                placeholder="Masukkan nama tamu undangan..."
                class="w-full text-sm text-gray-700 bg-white/70 px-4 py-3 rounded-xl border border-blush-200 outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold/20"
              />
            </div>

            <!-- Preview Card -->
            <div v-if="singleName.trim()" class="rounded-xl border border-blush-100 bg-blush-50/20 p-4 space-y-3">
              <div class="flex justify-between items-center border-b border-blush-100 pb-2">
                <span class="text-xs font-semibold text-rose-gold">Tautan Undangan Kustom:</span>
                <span class="text-[10px] text-gray-400 font-mono">{{ getLink(singleName) }}</span>
              </div>
              <div class="text-xs text-gray-600 font-mono leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto bg-white/50 p-3 rounded-lg border border-blush-100/50">
                {{ getFormattedText(singleName) }}
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="copySingle"
                :disabled="!singleName.trim()"
                class="flex-1 py-3 rounded-full border border-rose-gold/40 text-rose-gold font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-rose-gold hover:text-white hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-rose-gold disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
                {{ singleCopied ? '✓ Teks Tersalin' : 'Salin Teks Undangan' }}
              </button>
              
              <button
                @click="sendSingleWhatsApp"
                :disabled="!singleName.trim()"
                class="flex-1 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <svg class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.117-2.875-6.973C16.597 1.882 14.116.862 11.478.86 6.042.86 1.62 5.28 1.616 10.716c-.002 1.737.457 3.43 1.328 4.937L2 22l6.257-1.642a9.92 9.92 0 00-1.61 1.796z"/>
                </svg>
                Kirim via WhatsApp
              </button>
            </div>
          </div>
        </div>

        <!-- Bulk Mode Card -->
        <div v-else class="glass rounded-2xl p-6 shadow-lg border border-white/40 space-y-6">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 class="text-xl text-rose-gold-dark flex items-center gap-2" style="font-family: var(--font-serif);">
              Input Banyak Tamu (Excel / Daftar Nama)
            </h2>
            <div v-if="bulkList.length > 0" class="flex gap-2">
              <button
                @click="exportCsv"
                class="px-4 py-2 rounded-full border border-rose-gold/30 bg-white/70 text-rose-gold text-xs font-semibold uppercase hover:bg-rose-gold hover:text-white transition-all duration-300"
              >
                Ekspor ke Excel/CSV
              </button>
              <button
                @click="clearBulk"
                class="px-4 py-2 rounded-full border border-red-200 bg-white/70 text-red-500 text-xs font-semibold uppercase hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Kosongkan
              </button>
            </div>
          </div>

          <!-- Input Area (Shown if list is empty) -->
          <div v-if="bulkList.length === 0" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-rose-gold-dark mb-1">
                Copy-Paste Kolom Nama dari Excel / Tulis Daftar Nama (Satu nama per baris)
              </label>
              <textarea
                v-model="rawNamesInput"
                rows="8"
                placeholder="Contoh:&#10;Budi Raharjo&#10;Siti Aminah&#10;Farhan & Keluarga&#10;Bapak Hendra Wijaya"
                class="w-full text-sm text-gray-700 bg-white/70 p-4 rounded-xl border border-blush-200 outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold/20 leading-relaxed font-sans"
              ></textarea>
            </div>

            <button
              @click="processBulkNames"
              :disabled="!rawNamesInput.trim()"
              class="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-gold to-blush-400 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              Proses Daftar Nama
            </button>
          </div>

          <!-- Generated Guest Table List (Shown when names are processed) -->
          <div v-else class="space-y-4 animate-fade-in">
            <!-- Progress Tracking Bar -->
            <div class="rounded-xl bg-blush-50/30 p-4 border border-blush-100 space-y-2">
              <div class="flex justify-between text-xs text-rose-gold-dark font-medium">
                <span>Progress Pengiriman Undangan:</span>
                <span>{{ totalCompleted }} dari {{ bulkList.length }} Tamu ({{ progressPercent }}%)</span>
              </div>
              <div class="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-rose-gold to-blush-400 transition-all duration-500 rounded-full"
                  :style="{ width: progressPercent + '%' }"
                ></div>
              </div>
            </div>

            <!-- Search Filter -->
            <div class="relative">
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

            <!-- Guest Table List -->
            <div class="overflow-x-auto rounded-xl border border-blush-100 max-h-[500px] overflow-y-auto">
              <table class="w-full text-left text-xs bg-white/50">
                <thead class="bg-blush-50 text-rose-gold-dark sticky top-0 font-semibold border-b border-blush-100">
                  <tr>
                    <th class="px-4 py-3 text-center w-12">No.</th>
                    <th class="px-4 py-3 w-48">Nama Tamu</th>
                    <th class="px-4 py-3 hidden md:table-cell">Link Undangan</th>
                    <th class="px-4 py-3 text-center w-24">Status</th>
                    <th class="px-4 py-3 text-center w-52">Tindakan</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-blush-100/50">
                  <tr
                    v-for="(guest, idx) in filteredList"
                    :key="idx"
                    class="hover:bg-blush-50/20 transition-all duration-300"
                    :class="guest.status !== 'pending' && 'bg-green-50/10'"
                  >
                    <td class="px-4 py-3.5 text-center text-gray-400">{{ guest.index + 1 }}</td>
                    <td class="px-4 py-3.5 font-semibold text-gray-700">{{ guest.name }}</td>
                    <td class="px-4 py-3.5 hidden md:table-cell text-gray-400 font-mono text-[10px] max-w-[200px] truncate">
                      {{ guest.link }}
                    </td>
                    <td class="px-4 py-3.5 text-center">
                      <span
                        class="px-2 py-0.5 rounded-full text-[9px] font-medium"
                        :class="{
                          'bg-gray-100 text-gray-500': guest.status === 'pending',
                          'bg-blue-100 text-blue-700': guest.status === 'copied',
                          'bg-green-100 text-green-700': guest.status === 'sent'
                        }"
                      >
                        {{ guest.status === 'pending' ? 'Antrean' : guest.status === 'copied' ? 'Tersalin' : 'Kirim WA' }}
                      </span>
                    </td>
                    <td class="px-4 py-3.5 text-center">
                      <div class="flex gap-1.5 justify-center">
                        <button
                          @click="copyBulkItem(guest)"
                          class="p-2 rounded-full border transition-all duration-300 hover:scale-115 active:scale-95"
                          :class="guest.status === 'copied' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-blush-200 text-rose-gold hover:border-rose-gold'"
                          title="Salin Teks Undangan"
                        >
                          <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                          </svg>
                        </button>
                        <button
                          @click="copyLinkOnly(guest)"
                          class="p-2 rounded-full border bg-white border-blush-200 text-rose-gold hover:border-rose-gold transition-all duration-300 hover:scale-115 active:scale-95"
                          title="Salin Link Saja"
                        >
                          <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                          </svg>
                        </button>
                        <button
                          @click="sendBulkWhatsApp(guest)"
                          class="p-2 rounded-full border transition-all duration-300 hover:scale-115 active:scale-95"
                          :class="guest.status === 'sent' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-green-200 text-green-600 hover:bg-green-600 hover:text-white'"
                          title="Kirim ke WhatsApp"
                        >
                          <svg class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.117-2.875-6.973C16.597 1.882 14.116.862 11.478.86 6.042.86 1.62 5.28 1.616 10.716c-.002 1.737.457 3.43 1.328 4.937L2 22l6.257-1.642a9.92 9.92 0 00-1.61 1.796z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredList.length === 0">
                    <td colspan="5" class="px-4 py-8 text-center text-gray-400">Nama tidak ditemukan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Default invitation message template filled with high-class custom copy
const templateText = ref(`Kepada Yth.
Bapak/Ibu/Saudara/i: *{nama}*

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
Assalamu'alaikum Warahmatullahi Wabarakatuh.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia kami pada pernikahan:

*Adisti & Raihan*

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Detail informasi serta RSVP online dapat diakses melalui tautan berikut:
{link}

Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami mengucapkan terima kasih.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.

*Adisti & Raihan*`)

// Active Tab ('single' or 'bulk')
const activeTab = ref('single')

// --- SINGLE MODE ---
const singleName = ref('')
const singleCopied = ref(false)

// Generate the personalized link based on name
const getLink = (name) => {
  if (!name.trim()) return ''
  const base = window.location.origin
  // Replace spaces with underscores for WhatsApp-sharing compatibility
  const formattedName = encodeURIComponent(name.trim().replace(/\s+/g, '_'))
  return `${base}/?to=${formattedName}`
}

// Format template text with guest's customized info
const getFormattedText = (name) => {
  const link = getLink(name)
  return templateText.value
    .replace(/{nama}/g, name.trim())
    .replace(/{link}/g, link)
}

const copySingle = () => {
  const text = getFormattedText(singleName.value)
  navigator.clipboard.writeText(text)
  singleCopied.value = true
  setTimeout(() => { singleCopied.value = false }, 2000)
}

const sendSingleWhatsApp = () => {
  const text = getFormattedText(singleName.value)
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
}

// --- BULK MODE ---
const rawNamesInput = ref('')
const searchQuery = ref('')
const bulkList = ref([])

// Process bulk pasted text list of names
const processBulkNames = () => {
  if (!rawNamesInput.value.trim()) return
  
  const lines = rawNamesInput.value.split('\n')
  const guests = []
  let indexCounter = 0
  
  lines.forEach((line) => {
    const cleaned = line.trim()
    if (cleaned) {
      guests.push({
        index: indexCounter++,
        name: cleaned,
        link: getLink(cleaned),
        status: 'pending' // 'pending', 'copied', 'sent'
      })
    }
  })
  
  bulkList.value = guests
  searchQuery.value = ''
}

const filteredList = computed(() => {
  if (!searchQuery.value.trim()) return bulkList.value
  const query = searchQuery.value.toLowerCase().trim()
  return bulkList.value.filter(g => g.name.toLowerCase().includes(query))
})

const totalCompleted = computed(() => {
  return bulkList.value.filter(g => g.status !== 'pending').length
})

const progressPercent = computed(() => {
  if (bulkList.value.length === 0) return 0
  return Math.round((totalCompleted.value / bulkList.value.length) * 100)
})

const copyBulkItem = (guest) => {
  const text = getFormattedText(guest.name)
  navigator.clipboard.writeText(text)
  guest.status = 'copied'
  saveBulkStateToLocalStorage()
}

const copyLinkOnly = (guest) => {
  navigator.clipboard.writeText(guest.link)
  // Give subtle visual feedback by marking as copied
  if (guest.status === 'pending') {
    guest.status = 'copied'
    saveBulkStateToLocalStorage()
  }
}

const sendBulkWhatsApp = (guest) => {
  const text = getFormattedText(guest.name)
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  guest.status = 'sent'
  saveBulkStateToLocalStorage()
}

const clearBulk = () => {
  bulkList.value = []
  rawNamesInput.value = ''
  localStorage.removeItem('invitation_bulk_state')
}

// Local storage state saving so they don't lose their sending progress if page refreshes
const saveBulkStateToLocalStorage = () => {
  localStorage.setItem('invitation_bulk_state', JSON.stringify(bulkList.value))
}

const exportCsv = () => {
  if (bulkList.value.length === 0) return
  
  // Format CSV header and rows
  let csvContent = "data:text/csv;charset=utf-8,No,Nama Tamu,Link Undangan,Status Kirim\n"
  
  bulkList.value.forEach((g) => {
    const statusText = g.status === 'pending' ? 'Belum' : g.status === 'copied' ? 'Salin' : 'Terkirim WA'
    // Escape double quotes inside names to prevent CSV format breakage
    const escapedName = g.name.replace(/"/g, '""')
    csvContent += `${g.index + 1},"${escapedName}",${g.link},${statusText}\n`
  })
  
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "Daftar_Link_Undangan_Adisti_Raihan.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Restore progress if it exists in local storage
onMounted(() => {
  const saved = localStorage.getItem('invitation_bulk_state')
  if (saved) {
    try {
      bulkList.value = JSON.parse(saved)
    } catch (e) {
      console.warn("Could not parse saved bulk invitation state:", e)
    }
  }
})
</script>

<style scoped>
/* Fade-in animation for list */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
