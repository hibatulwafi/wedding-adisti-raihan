<template>
  <section id="info" class="relative py-20 md:py-28 overflow-hidden">
    <div class="parallax-blob w-64 h-64 bg-blush-100 top-10 -right-10" style="animation-delay: 5s;"></div>

    <div class="mx-auto max-w-4xl px-6">
      <div class="mb-16 text-center" data-animate="fade-up">
        <h2 class="text-4xl md:text-5xl text-rose-gold-dark" style="font-family: var(--font-script);">Informasi Tambahan</h2>
        <div class="ornament-divider">
          <svg class="h-5 w-5 text-rose-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="(item, i) in infoItems"
          :key="i"
          class="glass rounded-2xl p-6 text-center shadow-md hover-lift"
          data-animate="fade-up"
          :data-delay="i * 150"
        >
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold/10 to-blush-100 transition-transform duration-500 hover:rotate-12 hover:scale-110">
            <span v-html="item.icon" class="text-rose-gold"></span>
          </div>
          <h4 class="text-lg text-rose-gold-dark mb-2" style="font-family: var(--font-script);">{{ item.title }}</h4>
          <p class="text-sm text-gray-500 leading-relaxed" style="font-family: var(--font-sans);">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const infoItems = [
  {
    title: 'Dress Code',
    desc: 'Kami mengundang tamu untuk mengenakan pakaian bernuansa pastel atau earth tone.',
    icon: '<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
  },
  {
    title: 'Tanpa Anak',
    desc: 'Mohon maaf, demi kenyamanan bersama, acara ini hanya untuk tamu dewasa.',
    icon: '<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>'
  },
  {
    title: 'Protokol Kesehatan',
    desc: 'Demi keamanan bersama, mohon patuhi protokol kesehatan yang berlaku.',
    icon: '<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
  }
]
</script>
