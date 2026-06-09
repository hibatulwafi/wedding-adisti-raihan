<template>
  <Transition name="cover-fade">
    <section
      v-if="!isOpened"
      id="hero-cover"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      <!-- Background Image with subtle zoom animation -->
      <div class="absolute inset-0">
        <img
          src="/images/gallery-1.jpg"
          alt="Wedding Background"
          class="h-full w-full object-cover object-bottom md:object-[center_50%] filter brightness-75 contrast-[1.15] saturate-[0.85] sepia-[.15]"
          :class="mounted && 'scale-110'"
          style="transition: transform 20s ease-out;"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>
      </div>

      <!-- Falling Petals on Cover -->
      <div
        v-for="petal in coverPetals"
        :key="petal.id"
        class="hero-falling-petal"
        :style="{
          left: petal.left + '%',
          animationDuration: petal.duration + 's',
          animationDelay: petal.delay + 's',
          opacity: petal.opacity,
          '--scale-factor': petal.scale,
          '--petal-color': petal.color
        }"
      ></div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center px-6 text-center">
        <!-- Bismillah -->
        <p class="mb-4 text-sm tracking-[0.3em] text-white/80 uppercase animate-fade-in" style="font-family: var(--font-sans); animation-fill-mode: both;">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <!-- The Wedding Of -->
        <p class="mb-2 text-sm tracking-[0.25em] text-white/70 uppercase animate-fade-in delay-100" style="font-family: var(--font-sans); animation-fill-mode: both;">
          The Wedding of
        </p>

        <!-- Names with shimmer -->
        <h1
          class="mb-2 text-5xl md:text-7xl text-white drop-shadow-lg animate-fade-in-up delay-200"
          style="font-family: var(--font-script); animation-fill-mode: both;"
        >
          Adisti <span class="text-3xl md:text-5xl animate-wiggle inline-block">&</span> Raihan
        </h1>

        <!-- Date -->
        <p class="mb-[20vh] md:mb-[15vh] text-lg tracking-wider text-white/90 animate-fade-in delay-300" style="font-family: var(--font-serif); animation-fill-mode: both;">
          20 . 06 . 2026
        </p>

        <!-- Countdown with flip effect -->
        <div class="mb-8 flex gap-4 md:gap-6 animate-fade-in delay-400" style="animation-fill-mode: both;">
          <div
            v-for="(unit, index) in countdownUnits"
            :key="index"
            class="glass-dark flex flex-col items-center rounded-xl px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px] hover-lift"
          >
            <span
              :key="unit.value"
              class="text-2xl md:text-3xl font-bold text-white counter-value animate-counter-flip"
              style="font-family: var(--font-serif);"
            >
              {{ unit.value }}
            </span>
            <span class="mt-1 text-[10px] md:text-xs tracking-widest text-white/70 uppercase">
              {{ unit.label }}
            </span>
          </div>
        </div>

        <!-- Kepada Label (Dynamic URL parameter reader) -->
        <div class="mb-4 animate-fade-in delay-500" style="animation-fill-mode: both;">
          <p class="text-xs tracking-[0.2em] text-white/60 uppercase" style="font-family: var(--font-sans);">Kepada Yth.</p>
          <p class="text-sm text-white/70 mt-0.5" style="font-family: var(--font-sans);">Bapak/Ibu/Saudara/i</p>
          <h4 v-if="hasGuest" class="mt-2 text-lg font-semibold text-white drop-shadow-sm px-5 py-2 glass-dark rounded-xl border border-white/10 max-w-xs mx-auto" style="font-family: var(--font-serif);">
            {{ guestName }}
          </h4>
          <p v-if="hasGuest" class="mt-2 text-[10px] tracking-[0.25em] text-white/50 uppercase" style="font-family: var(--font-sans);">di Tempat</p>
        </div>

        <!-- Open Button with pulse glow -->
        <button
          id="btn-open-invitation"
          @click="openInvitation"
          class="group relative overflow-hidden rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm tracking-widest text-white uppercase backdrop-blur-md transition-all duration-500 hover:bg-white/25 hover:border-white/50 hover:shadow-[0_0_30px_rgba(183,110,121,0.3)] animate-fade-in delay-600 animate-pulse-glow"
          style="font-family: var(--font-sans); animation-fill-mode: both;"
        >
          <span class="relative z-10 flex items-center gap-2">
            <svg class="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Buka Undangan
          </span>
          <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
        </button>
      </div>
    </section>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['open'])
const isOpened = ref(false)
const mounted = ref(false)

const guestName = ref('Bapak/Ibu/Saudara/i')
const hasGuest = ref(false)

// Falling petals effect for cover
const petalColors = ['#56130E', '#770C34', '#961005', '#D45871', '#FAA587', '#F9E6D7']

const coverPetals = Array.from({ length: 15 }, (_, i) => {
  const colorIndex = Math.floor(Math.random() * petalColors.length)
  return {
    id: i,
    left: Math.random() * 100,
    duration: 8 + Math.random() * 15,
    delay: Math.random() * -20,
    scale: 0.4 + Math.random() * 0.6,
    opacity: 0.3 + Math.random() * 0.5,
    color: petalColors[colorIndex]
  }
})

// Countdown (Silakan sesuaikan tanggal dan waktu pernikahan Adisti & Raihan di bawah ini)
const weddingDate = new Date('2026-06-20T09:00:00')
const now = ref(new Date())
let timer = null

const countdownUnits = computed(() => {
  const diff = weddingDate - now.value
  if (diff <= 0) {
    return [
      { value: '00', label: 'Hari' },
      { value: '00', label: 'Jam' },
      { value: '00', label: 'Menit' },
      { value: '00', label: 'Detik' }
    ]
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return [
    { value: String(days).padStart(2, '0'), label: 'Hari' },
    { value: String(hours).padStart(2, '0'), label: 'Jam' },
    { value: String(minutes).padStart(2, '0'), label: 'Menit' },
    { value: String(seconds).padStart(2, '0'), label: 'Detik' }
  ]
})

const openInvitation = () => {
  isOpened.value = true
  emit('open')
}

onMounted(() => {
  // Trigger subtle background zoom
  requestAnimationFrame(() => { mounted.value = true })

  // Read guest name from URL parameter ?to=Nama+Tamu
  const params = new URLSearchParams(window.location.search)
  const to = params.get('to')
  if (to) {
    guestName.value = to.replace(/_/g, ' ') // Replace underscores with spaces for WhatsApp compatibility
    hasGuest.value = true
  }

  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* Falling petal styling */
.hero-falling-petal {
  position: absolute;
  top: -10%;
  width: 16px;
  height: 16px;
  background: var(--petal-color);
  border-radius: 15px 0 15px 0;
  animation: hero-fall-and-sway linear infinite;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  pointer-events: none;
  z-index: 10;
}

@keyframes hero-fall-and-sway {
  0% {
    top: -10%;
    transform: scale(var(--scale-factor)) translateX(0) rotate(0deg);
  }
  25% {
    transform: scale(var(--scale-factor)) translateX(25px) rotate(90deg);
  }
  50% {
    transform: scale(var(--scale-factor)) translateX(-20px) rotate(180deg);
  }
  75% {
    transform: scale(var(--scale-factor)) translateX(20px) rotate(270deg);
  }
  100% {
    top: 110%;
    transform: scale(var(--scale-factor)) translateX(-25px) rotate(360deg);
  }
}

/* Cover fade-out transition */
.cover-fade-leave-active {
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.cover-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
