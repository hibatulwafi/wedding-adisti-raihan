<template>
  <section id="love-story" class="relative py-20 md:py-28 overflow-hidden">
    <!-- Parallax Background Layer -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-fixed opacity-30 mix-blend-multiply pointer-events-none"
        style="background-image: url('/images/bg-flower-2.jpeg');"
      ></div>
      <!-- Gradient overlay for readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-warm-white/60 to-transparent"></div>
      
      <!-- Falling Petals -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div v-for="n in 25" :key="'petal-'+n" class="falling-petal" :style="getPetalStyle()"></div>
      </div>
    </div>

    <!-- Content container -->
    <div class="relative z-10 mx-auto max-w-3xl px-6">
      <div class="mb-16 text-center" data-animate="fade-up">
        <h2 class="text-4xl md:text-5xl text-rose-gold-dark" style="font-family: var(--font-script);">Love Story<br><span class="text-3xl">Adisti & Raihan</span></h2>
        <div class="ornament-divider">
          <svg class="h-5 w-5 text-rose-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-gold-light via-blush-300 to-rose-gold-light md:-translate-x-px"></div>

        <div
          v-for="(item, i) in timeline"
          :key="i"
          class="relative mb-12 last:mb-0"
          :data-animate="i % 2 === 0 ? 'fade-right' : 'fade-left'"
          :data-delay="i * 150"
        >
          <div class="flex items-start gap-6" :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
            <!-- Dot -->
            <div class="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border-2 border-rose-gold-light animate-float-slow">
                <span class="text-lg" v-html="item.icon"></span>
              </div>
            </div>

            <!-- Content -->
            <div class="ml-16 md:ml-0 md:w-[calc(50%-40px)]" :class="i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left md:ml-auto'">
              <div class="glass rounded-xl p-5 shadow-md hover-lift">
                <span class="text-xs tracking-widest text-rose-gold uppercase" style="font-family: var(--font-sans);">{{ item.date }}</span>
                <h4 class="mt-1 text-xl text-rose-gold-dark" style="font-family: var(--font-script);">{{ item.title }}</h4>
                <p class="mt-2 text-sm leading-relaxed text-gray-600" style="font-family: var(--font-sans);">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const timeline = [
  {
    date: '2022',
    title: 'when worlds collide',
    desc: 'Tidak ada yang kebetulan di dunia ini, semua sudah tersusun rapih oleh sang maha kuasa, kita tidak bisa memilih kepada siapa kita akan jatuh cinta. Uniknya kami berkenalan di media sosial.',
    icon: `<svg class="h-5 w-5 text-rose-gold" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>`
  },
  {
    date: '2022',
    title: 'We found the rhythm',
    desc: 'Seiring waktu kami lanjut ke social media line, dimana yang awalnya kami ragu karna terhalang jarak yang cukup jauh SMI-JKT akhirnya kami memutuskan untuk bertemu tatap muka setelah sebulan kami berkomunikasi pada bulan maret 2022, pertemuan itu berkembang menjadi kisah yang kami rawat perlahan kami menjalin hubungan long distance relationship (LDR) yang dipenuhi proses belajar dan bertumbuh tentang kepercayaan, pengertian, komunikasi, dan bagaimana saling menjaga. Bukan perjalanan yang mudah, tapi selalu kami perjuangkan dengan keyakinan, bahwa hati yang ditujukan untuk menetap akan selalu menemukan jalan nya untuk bertahan.',
    icon: `<svg class="h-5 w-5 text-rose-gold" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>`
  },
  {
    date: '30 November 2025',
    title: 'A promise carved in time',
    desc: 'Setelah bertahun-tahun saling mengenal dan belajar tentang arti sabar, menunggu dan pengertian, ia datang membawa niat baik dan tulus bersama restu kedua orangtua adik- adik dan keluarganya hari itu menjadi saksi bahwa kami melangsungkan acara lamaran di bulan November tanggal 30 2025 ketika dua hati menyatukan harapan dalam ridho keluarga dan bimbingan nya, tidak ada yang pernah menyangka bahwa pertemuan di dunia maya itu membawa kami pada suatu ikatan cinta.',
    icon: `<svg class="h-5 w-5 text-rose-gold" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.092 2.022-.273 3-.168.93-.405 1.846-.703 2.727M12 11c0 3.517 1.009 6.799 2.753 9.571m3.44-2.04l-.054-.09A13.916 13.916 0 0116 11a4 4 0 10-8 0"/></svg>`
  },
  {
    date: '20 Juni 2026',
    title: 'This Love Led Us Home',
    desc: 'Akhirnya, kami melangkah ke hari yang selama ini kami panjatkan dalam doa. Kami memutuskan untuk mengikrarkan janji suci pernikahan kami insyaallah ditanggal 20 juni 2026. Bukan karena waktu yang panjang, tapi karena keyakinan yang kuat bahwa cinta yang diridhoi allah pasti akan menemukan jalannya. Sebagaimana yang disampaikan oleh sayyidina ali bin abi thalib: “apa yang menjadi takdirmu akan menemukan jalannya untuk menemuimu” Inilah sepenggal kisah cinta kami yang kami bagikan dengan penuh syukur dan sukacita.',
    icon: `<svg class="h-5 w-5 text-rose-gold" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>`
  }
]

const getPetalStyle = () => {
  const left = Math.random() * 100
  const animationDuration = 8 + Math.random() * 15
  const animationDelay = Math.random() * -20
  const opacity = 0.4 + Math.random() * 0.5
  const scale = 0.4 + Math.random() * 0.6
  
  return {
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${animationDelay}s`,
    opacity,
    '--scale-factor': scale
  }
}
</script>

<style scoped>
.falling-petal {
  position: absolute;
  top: -10%;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, var(--color-rose-gold-light), var(--color-rose-gold));
  border-radius: 15px 0 15px 0;
  animation: fall-and-sway linear infinite;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  opacity: 0;
}

@keyframes fall-and-sway {
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
</style>
