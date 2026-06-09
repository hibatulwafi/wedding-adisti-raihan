<template>
  <!-- Generator Page Route -->
  <div v-if="isGeneratorRoute" class="min-h-screen bg-gradient-to-br from-warm-white via-cream to-blush-50 py-12 px-4">
    <InvitationGenerator />
  </div>

  <!-- RSVP Dashboard Route -->
  <div v-else-if="isDashboardRoute" class="min-h-screen bg-gradient-to-br from-warm-white via-cream to-blush-50 py-12 px-4">
    <AdminDashboardPage />
  </div>

  <!-- Memory Game Route -->
  <div v-else-if="isGamesRoute">
    <MemoryGame />
  </div>

  <div v-else>
    <!-- Hero Cover -->
    <HeroCover @open="onOpenInvitation" />

    <!-- Main Content -->
    <main v-show="isOpened" class="relative">
    <!-- Background Music (Beautiful Soft Piano instrumental) -->
    <audio
      ref="audioPlayer"
      :src="weddingMusic"
      loop
    ></audio>

    <!-- Floating Petals (ambient) -->
    <FloatingPetals v-if="isOpened" />

    <!-- Parallax Background Layer -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <!-- Background Photo with gentle parallax scroll translation -->
      <div
        class="absolute inset-0 bg-cover bg-bottom transition-transform duration-100 ease-out"
        :style="{
          backgroundImage: `url('/images/gallery-1.jpg')`,
          filter: 'blur(3px) brightness(0.97) saturate(95%)',
          opacity: 0.12,
          transform: `translate3d(0, ${parallaxY}px, 0) scale(1.05)`
        }"
      ></div>
      <!-- Luxurious Texture Overlay (Radial dot pattern matching premium stationery) -->
      <div class="absolute inset-0 opacity-12 bg-[radial-gradient(var(--color-rose-gold-light)_0.8px,transparent_0.8px)] [background-size:24px_24px] mix-blend-multiply"></div>
      <!-- Premium Repeating Floral Watermark Overlay -->
      <div class="absolute inset-0 opacity-[0.03] bg-[length:350px_auto] bg-repeat pointer-events-none mix-blend-multiply" style="background-image: url('/images/bg-flower.png');"></div>
      <!-- Soft Gradient Overlay to ensure perfect readable contrast for text -->
      <div class="absolute inset-0 bg-gradient-to-b from-warm-white/95 via-cream/85 to-warm-white/95"></div>
    </div>

    <!-- Music Toggle with rotation when playing -->
    <button
      id="btn-music-toggle"
      @click="toggleMusic"
      class="fixed top-6 right-6 md:top-auto md:bottom-6 md:right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-blush-200 transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95"
    >
      <svg v-if="musicPlaying" class="h-5 w-5 text-rose-gold music-playing" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <svg v-else class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
    </button>

    <!-- Admin Toggle removed per request -->

    <!-- Floating Navigation (Desktop) -->
    <Transition name="nav-slide">
      <nav v-if="showNav" class="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <div class="glass rounded-full px-6 py-2 shadow-lg">
          <div class="flex items-center gap-6">
            <a
              v-for="nav in navItems"
              :key="nav.href"
              :href="nav.href"
              class="text-xs tracking-wider text-rose-gold/70 uppercase transition-all duration-300 hover:text-rose-gold-dark hover:scale-105"
              style="font-family: var(--font-sans);"
            >{{ nav.label }}</a>
          </div>
        </div>
      </nav>
    </Transition>

    <!-- Mobile Floating Bottom Navigation -->
    <Transition name="mobile-nav-slide">
      <nav v-if="showNav" class="fixed bottom-6 left-4 right-4 z-40 md:hidden">
        <div class="glass rounded-2xl py-2 px-3 shadow-[0_8px_30px_rgba(183,110,121,0.15)]">
          <div class="flex items-center justify-between">
            <a
              v-for="(nav, index) in navItems"
              :key="nav.href"
              :href="nav.href"
              class="flex flex-col items-center justify-center flex-1 py-1 text-[10px] tracking-wide text-rose-gold/70 transition-all duration-300 hover:text-rose-gold-dark hover:scale-105 active:scale-95"
              style="font-family: var(--font-sans);"
            >
              <div class="nav-wave flex flex-col items-center justify-center" :style="{ animationDelay: `${index * 0.15}s` }">
                <span class="mb-1 text-rose-gold" v-html="nav.icon"></span>
                <span class="scale-90 origin-top text-[9px] font-semibold">{{ nav.label }}</span>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </Transition>

    <!-- Sections -->
    <CoupleProfile />
    <EventDetails />
    <GallerySection />
    <LoveStory />
    <RsvpSection />
    <GiftSection />
    <!-- <InfoSection /> -->
    <FooterSection />

    <!-- Admin Dashboard Modal removed -->
  </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useScrollAnimation } from './composables/useScrollAnimation'
import HeroCover from './components/HeroCover.vue'
import CoupleProfile from './components/CoupleProfile.vue'
import EventDetails from './components/EventDetails.vue'
import GallerySection from './components/GallerySection.vue'
import LoveStory from './components/LoveStory.vue'
import RsvpSection from './components/RsvpSection.vue'
import GiftSection from './components/GiftSection.vue'
import InfoSection from './components/InfoSection.vue'
import FooterSection from './components/FooterSection.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import FloatingPetals from './components/FloatingPetals.vue'
import InvitationGenerator from './components/InvitationGenerator.vue'
import AdminDashboardPage from './components/AdminDashboardPage.vue'
import MemoryGame from './components/MemoryGame.vue'
import weddingMusic from './assets/wedding-music.mp3'

// Instant redirect to hash routing for static hosting / simple dev servers compatibility
if (window.location.pathname === '/generate' || window.location.pathname.startsWith('/generate/')) {
  const search = window.location.search || ''
  window.location.replace('/#/generate' + search)
} else if (window.location.pathname === '/dashboard' || window.location.pathname.startsWith('/dashboard/')) {
  const search = window.location.search || ''
  window.location.replace('/#/dashboard' + search)
} else if (window.location.pathname === '/games' || window.location.pathname.startsWith('/games/')) {
  const search = window.location.search || ''
  window.location.replace('/#/games' + search)
}

const isGeneratorRoute = ref(
  window.location.pathname === '/generate' || 
  window.location.pathname.startsWith('/generate') || 
  window.location.hash === '#/generate' || 
  window.location.hash.startsWith('#/generate')
)
const isDashboardRoute = ref(
  window.location.pathname === '/dashboard' || 
  window.location.pathname.startsWith('/dashboard') || 
  window.location.hash === '#/dashboard' || 
  window.location.hash.startsWith('#/dashboard')
)
const isGamesRoute = ref(
  window.location.pathname === '/games' || 
  window.location.pathname.startsWith('/games') || 
  window.location.hash === '#/games' || 
  window.location.hash.startsWith('#/games')
)
const isOpened = ref(false)
const musicPlaying = ref(false)
const showAdmin = ref(false)
const showNav = ref(false)
const audioPlayer = ref(null)

const navItems = [
  { 
    label: 'Mempelai', 
    href: '#couple-profile',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`
  },
  { 
    label: 'Acara', 
    href: '#event-details',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`
  },
  { 
    label: 'Galeri', 
    href: '#gallery',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`
  },
  { 
    label: 'Kisah', 
    href: '#love-story',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`
  },
  { 
    label: 'RSVP', 
    href: '#rsvp',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`
  },
  { 
    label: 'Hadiah', 
    href: '#gift',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`
  },
]

const parallaxY = ref(0)

// Show floating nav and update background parallax scroll position
const handleScroll = () => {
  showNav.value = window.scrollY > 300
  parallaxY.value = window.scrollY * 0.12
}

const onOpenInvitation = () => {
  isOpened.value = true
  document.body.style.overflow = ''
  musicPlaying.value = true

  // Play background music
  if (audioPlayer.value) {
    audioPlayer.value.play().catch(err => {
      console.warn("Autoplay was prevented by browser security. Audio will start on user interaction.", err)
      musicPlaying.value = false
    })
  }

  // Initialize scroll animations after DOM updates
  nextTick(() => {
    initScrollAnimations()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })
}

const toggleMusic = () => {
  musicPlaying.value = !musicPlaying.value
  if (audioPlayer.value) {
    if (musicPlaying.value) {
      audioPlayer.value.play()
    } else {
      audioPlayer.value.pause()
    }
  }
}

// Manual init of scroll animation observer since the composable
// runs on mount but content is hidden until invitation is opened
let scrollObserver = null

const initScrollAnimations = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const delay = el.dataset.delay || 0
          setTimeout(() => {
            el.classList.add('scroll-animated')
            el.classList.remove('scroll-hidden')
          }, Number(delay))
          scrollObserver.unobserve(el)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  )

  document.querySelectorAll('[data-animate]').forEach((el) => {
    el.classList.add('scroll-hidden')
    scrollObserver.observe(el)
  })
}

const updateRoutes = () => {
  const path = window.location.pathname
  const hash = window.location.hash
  
  isGeneratorRoute.value = path === '/generate' || path.startsWith('/generate') || hash === '#/generate' || hash.startsWith('#/generate')
  isDashboardRoute.value = path === '/dashboard' || path.startsWith('/dashboard') || hash === '#/dashboard' || hash.startsWith('#/dashboard')
  isGamesRoute.value = path === '/games' || path.startsWith('/games') || hash === '#/games' || hash.startsWith('#/games')
  
  if (isGeneratorRoute.value || isDashboardRoute.value || isGamesRoute.value) {
    document.body.style.overflow = 'auto'
  }
}

onMounted(() => {
  window.addEventListener('hashchange', updateRoutes)
  updateRoutes()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateRoutes)
  if (scrollObserver) scrollObserver.disconnect()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Nav slide transition */
.nav-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-slide-leave-active {
  transition: all 0.3s ease;
}
.nav-slide-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
.nav-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* Mobile nav slide transition */
.mobile-nav-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.mobile-nav-slide-leave-active {
  transition: all 0.3s ease;
}
.mobile-nav-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.mobile-nav-slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

/* Nav wave animation */
@keyframes nav-wave-anim {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
.nav-wave {
  animation: nav-wave-anim 2s ease-in-out infinite;
}
</style>
