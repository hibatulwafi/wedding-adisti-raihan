<template>
  <div class="flex flex-col items-center text-center group w-full">
    <!-- Tall Elegant Double-Arched Portrait Frame -->
    <div class="relative w-72 h-[380px] md:w-80 md:h-[430px] p-2 rounded-t-full rounded-b-[2rem] border border-rose-gold/20 bg-warm-white shadow-sm mb-6 flex items-center justify-center transition-all duration-700 group-hover:border-rose-gold/40 group-hover:shadow-md">
      
      <!-- Inner Arched Frame containing the image -->
      <div class="relative w-full h-full rounded-t-full rounded-b-[1.75rem] overflow-hidden shadow-inner bg-cream">
        <img
          :src="person.image"
          :alt="'Foto ' + person.role"
          class="h-full w-full object-cover object-[center_25%] transition-transform duration-1000 group-hover:scale-105"
        />
        
        <!-- Top soft gradient highlight inside the dome -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
        
        <!-- Ambient hover light overlay -->
        <div class="absolute inset-0 bg-rose-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
    </div>

    <!-- Elegant Role Badge (Sleek minimalist spacing) -->
    <span class="text-[10px] md:text-xs uppercase tracking-[0.25em] text-rose-gold-light font-sans font-medium mb-1.5 transition-colors duration-300 group-hover:text-rose-gold">
      {{ person.role }}
    </span>

    <!-- Premium Calligraphy Name -->
    <h3 class="text-3xl md:text-4xl text-rose-gold-dark font-serif font-medium tracking-wide transition-colors duration-300 group-hover:text-rose-gold" style="font-family: var(--font-serif);">
      {{ person.name }}
    </h3>

    <!-- Parent Info (Formatted elegantly in serif script style) -->
    <p class="mt-4 text-xs leading-relaxed text-gray-500 max-w-[260px]" style="font-family: var(--font-sans);">
      <span class="italic font-serif text-[13px] text-gray-400 block mb-1.5">{{ person.desc }}</span>
      <span class="text-sm font-semibold text-rose-gold-dark block">{{ person.father }}</span>
      <span class="text-xs font-serif text-rose-gold-light font-semibold my-0.5 block">&amp;</span>
      <span class="text-sm font-semibold text-rose-gold-dark block">{{ person.mother }}</span>
    </p>

    <!-- Instagram Handle Pill Button -->
    <a
      :href="'https://instagram.com/' + person.ig.replace('@', '')"
      target="_blank"
      class="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider bg-rose-gold text-warm-white transition-all duration-300 shadow-sm hover:bg-rose-gold-dark hover:scale-105 active:scale-95 hover:shadow"
    >
      <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
      <span>{{ person.ig }}</span>
    </a>
  </div>
</template>

<script setup>
defineProps({
  person: { type: Object, required: true }
})
</script>

<style scoped>
/* Scoped styles for precise adjustments */
</style>

