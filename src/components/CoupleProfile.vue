<template>
  <section id="couple-profile" class="relative py-14 md:py-28 overflow-hidden bg-warm-white">
    <!-- Animated background blobs -->
    <div class="parallax-blob w-80 h-80 bg-blush-200 top-10 -left-20" style="animation-delay: 0s;"></div>
    <div class="parallax-blob w-64 h-64 bg-champagne bottom-10 -right-10" style="animation-delay: 2s;"></div>

    <!-- Beautiful Botanical Corner Ornaments -->
    <div class="absolute -top-16 -left-16 w-48 h-48 md:w-64 md:h-64 opacity-10 pointer-events-none select-none z-0">
      <img src="/images/bg-flower.png" class="w-full h-full object-contain -rotate-12 scale-110" />
    </div>
    <div class="absolute -bottom-16 -right-16 w-48 h-48 md:w-64 md:h-64 opacity-10 pointer-events-none select-none z-0">
      <img src="/images/bg-flower.png" class="w-full h-full object-contain rotate-168 scale-110" />
    </div>

    <div class="relative z-10 mx-auto max-w-5xl px-6">
      <!-- Section Header -->
      <div class="mb-16 text-center max-w-2xl mx-auto" data-animate="fade-up">
        <!-- Bismillah -->
        <p class="mb-4 text-base tracking-[0.25em] text-rose-gold uppercase font-medium" style="font-family: var(--font-sans);">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        
        <!-- Welcome Greeting -->
        <h2 class="text-xl md:text-2xl text-rose-gold-dark font-serif font-semibold mb-3" style="font-family: var(--font-serif);">
          Assalamu’alaikum Wr. Wb.
        </h2>
        
        <!-- Polite Invitation Phrasing -->
        <p class="text-xs md:text-sm text-gray-500 font-sans leading-relaxed tracking-wide mb-8">
          Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, serta kerabat sekalian, untuk menghadiri acara pernikahan kami:
        </p>

        <!-- Main Section Title -->
        <h3 class="text-4xl md:text-5xl text-rose-gold-dark font-serif italic" style="font-family: var(--font-serif);">
          Pasangan Mempelai
        </h3>
        
        <div class="ornament-divider">
          <svg class="h-4 w-4 text-rose-gold-light animate-heartbeat" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>

      <!-- Mempelai Couples Grid -->
      <div class="relative grid gap-12 md:grid-cols-2 md:gap-x-24 max-w-4xl mx-auto mt-12">
        <!-- Absolute Center & Divider (Desktop Only) -->
        <div class="hidden md:flex absolute top-[180px] left-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full border border-rose-gold/15 bg-warm-white text-rose-gold font-script text-4xl items-center justify-center shadow-sm select-none">
          &
        </div>

        <!-- Mempelai Pria (Groom) Column -->
        <div class="flex justify-center" data-animate="fade-right" data-delay="100">
          <PersonCard :person="people[0]" />
        </div>

        <!-- Mobile & Divider (Vertical Stack Only) -->
        <div class="md:hidden flex items-center justify-center -my-2 select-none" data-animate="zoom-in" data-delay="200">
          <span class="text-4xl text-rose-gold-light font-script">&</span>
        </div>

        <!-- Mempelai Wanita (Bride) Column -->
        <div class="flex justify-center" data-animate="fade-left" data-delay="300">
          <PersonCard :person="people[1]" />
        </div>
      </div>

      <!-- Quranic Quote Footer -->
      <div class="mt-20 text-center max-w-2xl mx-auto" data-animate="fade-up" data-delay="400">
        <p class="text-[13px] md:text-sm text-gray-500 font-serif leading-relaxed italic" style="font-family: var(--font-serif);">
          "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
        </p>
        <p class="mt-2.5 text-xs text-rose-gold font-sans font-medium uppercase tracking-widest">
          — QS. Ar-Rum: 21
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import PersonCard from './PersonCard.vue'

const people = [
  {
    role: 'Mempelai Pria',
    name: 'Ahmad Raihan Aghniansyah. S.E',
    image: '/images/groom.jpg',
    desc: 'Putra pertama dari',
    father: 'Bapak H. Agus Gustaf MA',
    mother: '& Ibu Lia Yulianingsih',
    ig: '@rehanagh'
  },
  {
    role: 'Mempelai Wanita',
    name: 'Adisti Apriyanti',
    image: '/images/bride.jpg',
    desc: 'Putri pertama dari',
    father: 'Bapak Ois Suswand',
    mother: '& Ibu Titin Kartini',
    ig: '@adistii.a'
  }
]
</script>

