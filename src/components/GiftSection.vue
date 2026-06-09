<template>
  <section id="gift" class="relative py-20 md:py-28 overflow-hidden">
    <div class="parallax-blob w-56 h-56 bg-champagne top-0 left-20" style="animation-delay: 4s;"></div>

    <div class="mx-auto max-w-3xl px-6">
      <div class="mb-16 text-center" data-animate="fade-up">
        <h2 class="text-4xl md:text-5xl text-rose-gold-dark" style="font-family: var(--font-script);">Hadiah Pernikahan</h2>
        <div class="ornament-divider">
          <svg class="h-5 w-5 text-rose-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <p class="text-sm text-gray-500" style="font-family: var(--font-sans);">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, jika Anda ingin memberikan tanda kasih, kami menyediakan informasi berikut.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div
          v-for="(bank, i) in banks"
          :key="i"
          class="glass rounded-2xl p-6 text-center shadow-lg hover-lift"
          data-animate="flip-up"
          :data-delay="i * 200"
        >
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold to-blush-400 text-white animate-float-slow">
            <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
          </div>
          <p class="text-sm font-semibold text-rose-gold-dark" style="font-family: var(--font-sans);">{{ bank.name }}</p>
          <p class="mt-2 text-2xl font-bold tracking-wider text-gray-800" style="font-family: var(--font-serif);">{{ bank.number }}</p>
          <p class="text-sm text-gray-500" style="font-family: var(--font-sans);">a.n. {{ bank.holder }}</p>
          <button
            @click="copyAccount(bank.number, i)"
            class="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-gold/30 px-5 py-2 text-xs tracking-wider text-rose-gold uppercase transition-all duration-300 hover:bg-rose-gold hover:text-white hover:scale-105 active:scale-95"
            style="font-family: var(--font-sans);"
          >
            <svg v-if="copiedIndex !== i" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            <svg v-else class="h-4 w-4 animate-bounce-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            {{ copiedIndex === i ? 'Tersalin!' : 'Salin No. Rekening' }}
          </button>
        </div>
      </div>

      <!-- Address -->
      <div class="mt-8" data-animate="fade-up" data-delay="400">
        <button
          @click="showAddress = !showAddress"
          class="mx-auto flex items-center gap-2 text-sm text-rose-gold transition-all duration-300 hover:text-rose-gold-dark hover:gap-3"
          style="font-family: var(--font-sans);"
        >
          <svg class="h-4 w-4 transition-transform duration-300" :class="showAddress && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          Kirim Hadiah Fisik
        </button>
        <Transition name="address-expand">
          <div v-if="showAddress" class="mt-4 glass rounded-xl p-5 text-center">
            <p class="text-sm text-gray-600 leading-relaxed" style="font-family: var(--font-sans);">
              <span class="font-semibold text-rose-gold-dark text-base">Adisti & Raihan</span><br/>
              Jalan Wadassari III Gang Anggrek 2B No. 70, RT.5/RW.2<br/>
              Pondok Betung, Pondok Aren<br/>
              Kota Tangerang Selatan
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Jalan+Wadassari+III+Gang+Anggrek+2B+No.+70,+Pondok+Betung,+Pondok+Aren,+Tangerang+Selatan"
              target="_blank"
              class="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-white px-4 py-1.5 text-[10px] tracking-wider text-rose-gold uppercase transition-all hover:bg-rose-gold hover:text-white hover:shadow-md hover:scale-105"
              style="font-family: var(--font-sans);"
            >
              <svg class="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
              Buka di Google Maps
            </a>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const banks = [
  { name: 'BCA', number: '3770895471', holder: 'Adisti Apriyanti' },
  { name: 'CIMB NIAGA', number: '763823974000', holder: 'Ahmad Raihan Aghniansyah' }
]

const copiedIndex = ref(-1)
const showAddress = ref(false)

const copyAccount = (number, index) => {
  navigator.clipboard.writeText(number)
  copiedIndex.value = index
  setTimeout(() => { copiedIndex.value = -1 }, 2000)
}
</script>

<style scoped>
.address-expand-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.address-expand-leave-active {
  transition: all 0.3s ease;
}
.address-expand-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
.address-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
