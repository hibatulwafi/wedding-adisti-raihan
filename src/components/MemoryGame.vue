<template>
  <div class="min-h-screen bg-gradient-to-br from-warm-white via-cream to-blush-50 py-8 px-4">
    <div class="mx-auto max-w-2xl">
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-4xl md:text-5xl text-rose-gold-dark" style="font-family: var(--font-script);">
          Memory Game
        </h1>
        <p class="mt-2 text-sm text-rose-gold/70" style="font-family: var(--font-sans);">
          Adisti & Raihan Wedding — Temukan semua pasangan kartu! 🎮
        </p>
        <div class="ornament-divider mx-auto max-w-xs">
          <svg class="h-5 w-5 text-rose-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </header>

      <!-- Stats Bar -->
      <div class="glass rounded-2xl p-4 mb-6 border border-white/40 shadow-lg">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-rose-gold shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-sm font-bold text-rose-gold-dark tabular-nums" style="font-family: var(--font-sans);">{{ formattedTime }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-rose-gold shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122M5.05 12.95l-2.122 2.122"/></svg>
            <span class="text-sm font-bold text-rose-gold-dark" style="font-family: var(--font-sans);">{{ moves }} Langkah</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-rose-gold shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
            <span class="text-sm font-bold text-rose-gold-dark" style="font-family: var(--font-sans);">{{ matchedPairs }}/10</span>
          </div>
        </div>
      </div>

      <!-- Game Board -->
      <div class="grid grid-cols-4 gap-2 md:gap-3 mb-6">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          @click="flipCard(index)"
          class="relative aspect-square cursor-pointer"
          :class="{ 'pointer-events-none': card.isFlipped || card.isMatched || isChecking }"
        >
          <div
            class="card-inner w-full h-full transition-transform duration-500"
            :class="{ 'is-flipped': card.isFlipped || card.isMatched }"
          >
            <!-- Card Back -->
            <div class="card-face card-back absolute inset-0 rounded-xl bg-gradient-to-br from-rose-gold to-blush-400 border-2 border-rose-gold-light/50 shadow-md flex items-center justify-center hover:shadow-lg hover:scale-[1.03] transition-all duration-200">
              <div class="text-center">
                <span class="text-2xl md:text-3xl">💍</span>
                <p class="text-[8px] md:text-[9px] text-white/80 font-bold tracking-wider mt-1" style="font-family: var(--font-sans);">S & I</p>
              </div>
            </div>
            <!-- Card Front -->
            <div
              class="card-face card-front absolute inset-0 rounded-xl border-2 shadow-md flex flex-col items-center justify-center p-1"
              :class="card.isMatched ? 'border-green-300 bg-green-50/80 shadow-green-200/50' : 'border-blush-200 bg-white'"
            >
              <img
                :src="card.image"
                :alt="card.name"
                class="w-full h-3/4 object-contain pixel-art"
              />
              <p class="text-[7px] md:text-[8px] font-bold text-rose-gold-dark mt-0.5 truncate w-full text-center" style="font-family: var(--font-sans);">{{ card.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button
          @click="resetGame"
          class="flex-1 py-3 rounded-full border border-rose-gold/40 text-rose-gold font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-rose-gold hover:text-white hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          style="font-family: var(--font-sans);"
        >
          <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Main Ulang
        </button>
        <button
          @click="showLeaderboard = !showLeaderboard"
          class="flex-1 py-3 rounded-full bg-gradient-to-r from-rose-gold to-blush-400 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          style="font-family: var(--font-sans);"
        >
          <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          {{ showLeaderboard ? 'Tutup' : 'Leaderboard' }}
        </button>
      </div>

      <!-- Win Modal -->
      <Transition name="modal-fade">
        <div v-if="gameWon && !winDismissed" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" @click.self="winDismissed = true">
          <div class="glass rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-white/40 animate-bounce-in">
            <div class="text-5xl mb-4">🎉</div>
            <h2 class="text-3xl text-rose-gold-dark mb-2" style="font-family: var(--font-script);">Selamat!</h2>
            <p class="text-sm text-gray-600 mb-4" style="font-family: var(--font-sans);">
              Kamu berhasil menemukan semua pasangan!
            </p>
            <div class="glass rounded-xl p-4 mb-6 space-y-2">
              <div class="flex justify-between text-sm" style="font-family: var(--font-sans);">
                <span class="text-gray-500">Waktu:</span>
                <span class="font-bold text-rose-gold-dark">{{ formattedTime }}</span>
              </div>
              <div class="flex justify-between text-sm" style="font-family: var(--font-sans);">
                <span class="text-gray-500">Langkah:</span>
                <span class="font-bold text-rose-gold-dark">{{ moves }}</span>
              </div>
              <div class="flex justify-between text-sm" style="font-family: var(--font-sans);">
                <span class="text-gray-500">Skor:</span>
                <span class="font-bold text-rose-gold-dark text-lg">{{ finalScore }}</span>
              </div>
            </div>

            <!-- Submit Score Form -->
            <div v-if="!scoreSubmitted" class="space-y-3 mb-4">
              <input
                v-model="playerName"
                type="text"
                placeholder="Masukkan nama kamu..."
                class="w-full text-center text-sm bg-white/70 px-4 py-3 rounded-xl border border-blush-200 outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold/20"
                style="font-family: var(--font-sans);"
                maxlength="30"
              />
              <button
                @click="submitScore"
                :disabled="!playerName.trim() || submitting"
                class="w-full py-3 rounded-full bg-gradient-to-r from-rose-gold to-blush-400 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                style="font-family: var(--font-sans);"
              >
                {{ submitting ? 'Menyimpan...' : 'Simpan Skor ke Leaderboard' }}
              </button>
            </div>
            <p v-else class="text-sm text-green-600 font-semibold mb-4" style="font-family: var(--font-sans);">✅ Skor berhasil disimpan!</p>

            <button
              @click="resetGame(); winDismissed = true;"
              class="w-full py-3 rounded-full border border-rose-gold/40 text-rose-gold font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-rose-gold hover:text-white"
              style="font-family: var(--font-sans);"
            >
              Main Lagi
            </button>
          </div>
        </div>
      </Transition>

      <!-- Leaderboard Panel -->
      <Transition name="slide-up">
        <div v-if="showLeaderboard" class="glass rounded-2xl p-6 border border-white/40 shadow-lg mb-8">
          <h3 class="text-2xl text-rose-gold-dark mb-4 text-center" style="font-family: var(--font-script);">
            🏆 Leaderboard
          </h3>
          <div v-if="leaderboardLoading" class="text-center py-8 text-gray-400 text-sm">Memuat data...</div>
          <div v-else-if="leaderboard.length === 0" class="text-center py-8 text-gray-400 text-sm" style="font-family: var(--font-sans);">
            Belum ada skor. Jadilah yang pertama! 🎯
          </div>
          <div v-else class="overflow-x-auto rounded-xl border border-blush-100">
            <table class="w-full text-left text-xs bg-white/50" style="font-family: var(--font-sans);">
              <thead class="bg-blush-50 text-rose-gold-dark sticky top-0 font-semibold border-b border-blush-100">
                <tr>
                  <th class="px-3 py-3 text-center w-12">#</th>
                  <th class="px-3 py-3">Nama</th>
                  <th class="px-3 py-3 text-center">Skor</th>
                  <th class="px-3 py-3 text-center">Langkah</th>
                  <th class="px-3 py-3 text-center">Waktu</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-blush-100/50">
                <tr
                  v-for="(entry, idx) in leaderboard"
                  :key="entry.id || idx"
                  class="hover:bg-blush-50/20 transition-all"
                  :class="idx < 3 && 'bg-gradient-to-r from-transparent to-blush-50/30'"
                >
                  <td class="px-3 py-3 text-center">
                    <span v-if="idx === 0" class="text-lg">🥇</span>
                    <span v-else-if="idx === 1" class="text-lg">🥈</span>
                    <span v-else-if="idx === 2" class="text-lg">🥉</span>
                    <span v-else class="text-gray-400">{{ idx + 1 }}</span>
                  </td>
                  <td class="px-3 py-3 font-semibold text-gray-700">{{ entry.name }}</td>
                  <td class="px-3 py-3 text-center font-bold text-rose-gold-dark">{{ entry.score }}</td>
                  <td class="px-3 py-3 text-center text-gray-500">{{ entry.moves }}</td>
                  <td class="px-3 py-3 text-center text-gray-500">{{ formatSeconds(entry.time) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Transition>

      <!-- Back to invitation link -->
      <div class="text-center">
        <a href="/" class="inline-flex items-center gap-2 text-xs text-rose-gold/60 hover:text-rose-gold transition-colors" style="font-family: var(--font-sans);">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Kembali ke Undangan
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { db } from '../firebase.js'
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore'

// Card definitions (10 unique cards = 10 pairs = 20 cards total)
const cardTypes = [
  { type: 'bride', name: 'Mempelai Wanita', image: '/images/cards/bride.png' },
  { type: 'groom', name: 'Mempelai Pria', image: '/images/cards/groom.png' },
  { type: 'rings', name: 'Cincin Nikah', image: '/images/cards/rings.png' },
  { type: 'cake', name: 'Kue Pengantin', image: '/images/cards/cake.png' },
  { type: 'love-letter', name: 'Surat Cinta', image: '/images/cards/love-letter.png' },
  { type: 'bouquet', name: 'Buket Bunga', image: '/images/cards/bouquet.png' },
  { type: 'heart', name: 'Hati', image: '/images/cards/heart.png' },
  { type: 'mosque', name: 'Masjid', image: '/images/cards/mosque.png' },
  { type: 'bells', name: 'Lonceng', image: '/images/cards/bells.png' },
  { type: 'diamond', name: 'Berlian', image: '/images/cards/diamond.png' }
]

// Game state
const cards = ref([])
const moves = ref(0)
const matchedPairs = ref(0)
const isChecking = ref(false)
const gameWon = ref(false)
const winDismissed = ref(false)
const gameStarted = ref(false)

// Timer
const elapsedSeconds = ref(0)
let timerInterval = null

// Leaderboard
const showLeaderboard = ref(false)
const leaderboard = ref([])
const leaderboardLoading = ref(false)
const playerName = ref('')
const scoreSubmitted = ref(false)
const submitting = ref(false)

// Flipped state tracking
let firstFlipped = null
let secondFlipped = null

// Computed
const formattedTime = computed(() => formatSeconds(elapsedSeconds.value))

const finalScore = computed(() => {
  // Score formula: higher is better. Bonus for fewer moves and less time
  const timeBonus = Math.max(0, 300 - elapsedSeconds.value)
  const moveBonus = Math.max(0, 200 - (moves.value * 3))
  return 1000 + timeBonus + moveBonus
})

const gameWonCheck = computed(() => matchedPairs.value === 10)

// Methods
function formatSeconds(s) {
  const mins = Math.floor(s / 60)
  const secs = s % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function initCards() {
  const doubled = []
  cardTypes.forEach((card, idx) => {
    doubled.push({ ...card, id: idx * 2, isFlipped: false, isMatched: false })
    doubled.push({ ...card, id: idx * 2 + 1, isFlipped: false, isMatched: false })
  })
  cards.value = shuffleArray(doubled)
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    elapsedSeconds.value++
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function flipCard(index) {
  const card = cards.value[index]
  if (card.isFlipped || card.isMatched || isChecking.value) return

  // Start timer on first flip
  if (!gameStarted.value) {
    gameStarted.value = true
    startTimer()
  }

  card.isFlipped = true

  if (firstFlipped === null) {
    firstFlipped = index
  } else {
    secondFlipped = index
    moves.value++
    isChecking.value = true

    const first = cards.value[firstFlipped]
    const second = cards.value[secondFlipped]

    if (first.type === second.type) {
      // Match found!
      setTimeout(() => {
        first.isMatched = true
        second.isMatched = true
        matchedPairs.value++
        firstFlipped = null
        secondFlipped = null
        isChecking.value = false

        // Check win
        if (matchedPairs.value === 10) {
          stopTimer()
          gameWon.value = true
          winDismissed.value = false
          loadLeaderboard()
        }
      }, 500)
    } else {
      // No match - flip back
      setTimeout(() => {
        first.isFlipped = false
        second.isFlipped = false
        firstFlipped = null
        secondFlipped = null
        isChecking.value = false
      }, 1000)
    }
  }
}

function resetGame() {
  stopTimer()
  moves.value = 0
  matchedPairs.value = 0
  elapsedSeconds.value = 0
  gameWon.value = false
  winDismissed.value = false
  gameStarted.value = false
  scoreSubmitted.value = false
  playerName.value = ''
  firstFlipped = null
  secondFlipped = null
  isChecking.value = false
  initCards()
}

// Firebase Leaderboard
async function loadLeaderboard() {
  leaderboardLoading.value = true
  try {
    const q = query(collection(db, 'wed-games'), orderBy('score', 'desc'), limit(20))
    const snapshot = await getDocs(q)
    leaderboard.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (e) {
    console.warn('Could not load leaderboard:', e)
    // Fallback: use localStorage
    const saved = localStorage.getItem('wed_games_leaderboard')
    if (saved) {
      try { leaderboard.value = JSON.parse(saved) } catch (_) {}
    }
  } finally {
    leaderboardLoading.value = false
  }
}

async function submitScore() {
  if (!playerName.value.trim() || submitting.value) return
  submitting.value = true

  const entry = {
    name: playerName.value.trim(),
    score: finalScore.value,
    moves: moves.value,
    time: elapsedSeconds.value,
    createdAt: serverTimestamp()
  }

  try {
    await addDoc(collection(db, 'wed-games'), entry)
    scoreSubmitted.value = true
    loadLeaderboard()
  } catch (e) {
    console.warn('Could not save score to Firebase:', e)
    // Fallback: save to localStorage
    const saved = localStorage.getItem('wed_games_leaderboard')
    let localBoard = saved ? JSON.parse(saved) : []
    localBoard.push({ ...entry, createdAt: new Date().toISOString() })
    localBoard.sort((a, b) => b.score - a.score)
    localBoard = localBoard.slice(0, 20)
    localStorage.setItem('wed_games_leaderboard', JSON.stringify(localBoard))
    leaderboard.value = localBoard
    scoreSubmitted.value = true
  } finally {
    submitting.value = false
  }
}

// Lifecycle
onMounted(() => {
  initCards()
  loadLeaderboard()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
/* Pixel art rendering */
.pixel-art {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* 3D Card Flip */
.card-inner {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-inner.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-front {
  transform: rotateY(180deg);
}

/* Modal animation */
.modal-fade-enter-active {
  transition: all 0.3s ease;
}
.modal-fade-leave-active {
  transition: all 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Slide up animation */
.slide-up-enter-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Bounce in animation for win modal */
@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.95); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-bounce-in {
  animation: bounceIn 0.5s ease-out forwards;
}

/* Tabular nums for timer */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
