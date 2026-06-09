<template>
  <section id="event-details" class="relative py-20 md:py-28 bg-transparent overflow-hidden">
    <!-- Animated blob -->
    <div class="parallax-blob w-72 h-72 bg-champagne top-20 right-0" style="animation-delay: 1s;"></div>

    <div class="mx-auto max-w-6xl px-6">
      <div class="mb-16 text-center" data-animate="fade-up">
        <h2 class="text-4xl md:text-5xl text-rose-gold-dark" style="font-family: var(--font-script);">Waktu & Tempat</h2>
        <div class="ornament-divider">
          <svg class="h-5 w-5 text-rose-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Akad -->
        <div class="relative glass group rounded-2xl p-8 text-center shadow-lg hover-lift" data-animate="fade-right" data-delay="0">
          <!-- Flower Ornament (Top Right) -->
          <img src="/images/event-flower-2.png" class="absolute -top-6 -right-6 w-40 h-40 opacity-60 mix-blend-multiply pointer-events-none select-none z-0 transition-transform duration-700 group-hover:scale-110" alt="Flower Ornament" />
          <!-- Flower Ornament (Bottom Left) -->
          <img src="/images/event-flower-2.png" class="absolute -bottom-6 -left-6 w-40 h-40 opacity-60 mix-blend-multiply pointer-events-none select-none z-0 transition-transform duration-700 group-hover:scale-110 rotate-180" alt="Flower Ornament" />
          
          <div class="relative z-10">
            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold to-blush-400 text-white shadow-md group-hover:animate-bounce-soft">
              <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
          <h3 class="text-2xl text-rose-gold-dark mb-1" style="font-family: var(--font-script);">Akad Nikah</h3>
          <div class="mx-auto my-4 h-px w-16 bg-gradient-to-r from-transparent via-rose-gold-light to-transparent animate-line-grow"></div>
          <div class="space-y-3 text-sm text-gray-600" style="font-family: var(--font-sans);">
            <div class="flex items-center justify-center gap-2">
              <svg class="h-5 w-5 shrink-0 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>Sabtu, 20 Juni 2026</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <svg class="h-5 w-5 shrink-0 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>09.00 WIB - Selesai</span>
            </div>
            <div class="flex items-start justify-center gap-2 text-left">
              <svg class="h-5 w-5 shrink-0 text-rose-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>GlassHouse<br/>Jl. Pelabuhan II No.329, Dayeuhluhur, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43134</span>
            </div>
          </div>
          <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://www.google.com/maps/search/?api=1&query=GlassHouse,+Sukabumi" target="_blank" class="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-white px-5 py-2 text-xs tracking-wider text-rose-gold uppercase transition-all hover:bg-rose-gold hover:text-white hover:shadow-md hover:scale-105" style="font-family: var(--font-sans);">
              <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
              Google Maps
            </a>
            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Adisti+%26+Raihan&dates=20260620T020000Z/20260620T050000Z&details=Pernikahan+Adisti+dan+Raihan&location=GlassHouse,+Sukabumi" target="_blank" class="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold px-5 py-2 text-xs tracking-wider text-white uppercase transition-all hover:bg-white hover:text-rose-gold hover:shadow-md hover:scale-105" style="font-family: var(--font-sans);">
              <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Simpan Jadwal
            </a>
          </div>
          </div>
        </div>

        <!-- Resepsi -->
        <div class="relative glass group rounded-2xl p-8 text-center shadow-lg hover-lift" data-animate="fade-left" data-delay="200">
          <!-- Flower Ornament (Top Right) -->
          <img src="/images/event-flower-2.png" class="absolute -top-6 -right-6 w-40 h-40 opacity-60 mix-blend-multiply pointer-events-none select-none z-0 transition-transform duration-700 group-hover:scale-110" alt="Flower Ornament" />
          <!-- Flower Ornament (Bottom Left) -->
          <img src="/images/event-flower-2.png" class="absolute -bottom-6 -left-6 w-40 h-40 opacity-60 mix-blend-multiply pointer-events-none select-none z-0 transition-transform duration-700 group-hover:scale-110 rotate-180" alt="Flower Ornament" />
          
          <div class="relative z-10">
            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-rose-gold text-white shadow-md group-hover:animate-bounce-soft">
              <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 15.546M12 3v2m0 0a3 3 0 013 3v4m-3-7a3 3 0 00-3 3v4m-2 0h10"/></svg>
          </div>
          <h3 class="text-2xl text-rose-gold-dark mb-1" style="font-family: var(--font-script);">Ngunduh Mantu</h3>
          <div class="mx-auto my-4 h-px w-16 bg-gradient-to-r from-transparent via-rose-gold-light to-transparent animate-line-grow"></div>
          <div class="space-y-3 text-sm text-gray-600" style="font-family: var(--font-sans);">
            <div class="flex items-center justify-center gap-2">
              <svg class="h-5 w-5 shrink-0 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>Minggu, 12 Juli 2026</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <svg class="h-5 w-5 shrink-0 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>11.00 WIB - Selesai</span>
            </div>
            <div class="flex items-start justify-center gap-2 text-left">
              <svg class="h-5 w-5 shrink-0 text-rose-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Talaga Sampireun Bintaro<br/>Kawasan Niaga Bintaro, Jl. Boulevard Bintaro Jaya Blok B7/N1, Pondok Jaya, Pondok Aren, South Tangerang City, Banten 14220</span>
            </div>
          </div>
          <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://www.google.com/maps/search/?api=1&query=Talaga+Sampireun+Bintaro" target="_blank" class="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-white px-5 py-2 text-xs tracking-wider text-rose-gold uppercase transition-all hover:bg-rose-gold hover:text-white hover:shadow-md hover:scale-105" style="font-family: var(--font-sans);">
              <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
              Google Maps
            </a>
            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ngunduh+Mantu+Adisti+%26+Raihan&dates=20260712T040000Z/20260712T080000Z&details=Ngunduh+Mantu+Adisti+dan+Raihan&location=Talaga+Sampireun+Bintaro" target="_blank" class="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold px-5 py-2 text-xs tracking-wider text-white uppercase transition-all hover:bg-white hover:text-rose-gold hover:shadow-md hover:scale-105" style="font-family: var(--font-sans);">
              <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Simpan Jadwal
            </a>
          </div>
          </div>
        </div>
      </div>

      <!-- Dresscode Section -->
      <div class="mt-12 relative glass rounded-2xl p-8 text-center shadow-lg mx-auto max-w-2xl hover-lift" data-animate="fade-up">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold to-blush-400 text-white shadow-md">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-3-1.536-3-3.364 0-1.829 1.5-3 3-3h4.242c1.5 0 3 1.171 3 3 0 1.828-1.828 1.411-3 3.364z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.5v3m0 0a3 3 0 100 6m0-6a3 3 0 110 6"/></svg>
        </div>
        <h3 class="text-3xl text-rose-gold-dark mb-2" style="font-family: var(--font-script);">Dresscode</h3>
        <p class="text-sm text-gray-600 mb-6 leading-relaxed" style="font-family: var(--font-sans);">
          Bagi tamu undangan yang berkenan hadir, kami menyarankan untuk menggunakan pakaian dengan sentuhan warna berikut:
        </p>
        
        <div class="flex flex-wrap items-center justify-center gap-10">
          <!-- Ivory -->
          <div class="flex flex-col items-center group">
            <div class="w-16 h-16 rounded-full shadow-md border border-gray-200 mb-3 transition-transform duration-300 group-hover:scale-110" style="background-color: #F4EEE0;"></div>
            <span class="text-xs font-semibold tracking-wider uppercase text-gray-700" style="font-family: var(--font-sans);">Ivory</span>
          </div>
          <!-- Mahogany -->
          <div class="flex flex-col items-center group">
            <div class="w-16 h-16 rounded-full shadow-md border border-white mb-3 transition-transform duration-300 group-hover:scale-110" style="background-color: #56130E;"></div>
            <span class="text-xs font-semibold tracking-wider uppercase text-gray-700" style="font-family: var(--font-sans);">Mahogany</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
