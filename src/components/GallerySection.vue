<template>
  <section id="gallery" class="relative py-20 md:py-28 overflow-hidden">
    <!-- Parallax Background Layer -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-fixed opacity-60"
        style="background-image: url('/images/gallery-1.jpg');"
      ></div>
      <!-- Overlay to soften the background so gallery grid is visible -->
      <div class="absolute inset-0 bg-blush-900/40 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-warm-white/90 via-warm-white/40 to-warm-white/90"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <div class="mb-16 text-center" data-animate="fade-up">
        <h2
          class="text-4xl md:text-5xl text-rose-gold-dark drop-shadow-sm"
          style="font-family: var(--font-script)"
        >
          Our Memories
        </h2>
        <div class="ornament-divider">
          <svg
            class="h-5 w-5 text-rose-gold-light"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="group relative overflow-hidden rounded-2xl cursor-pointer img-reveal border border-white/20 shadow-md hover:shadow-xl transition-all duration-500"
          :class="img.span"
          :data-animate="i % 2 === 0 ? 'zoom-in' : 'fade-up'"
          :data-delay="i * 100"
          @click="openLightbox(i)"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            :class="[
              'h-full w-full object-cover transition-transform duration-700 group-hover:scale-110',
              img.positionClass || 'object-[center_20%]',
            ]"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></div>
          <div
            class="absolute bottom-4 left-4 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2"
          >
            <svg
              class="h-6 w-6 text-white drop-shadow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <button
            @click="closeLightbox"
            class="absolute top-6 right-6 text-white/70 hover:text-white transition-all hover:rotate-90 duration-300"
          >
            <svg
              class="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            @click="prevImage"
            class="absolute left-4 text-white/70 hover:text-white transition-all hover:-translate-x-1 duration-300"
          >
            <svg
              class="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <img
            :key="currentIndex"
            :src="images[currentIndex].src"
            :alt="images[currentIndex].alt"
            class="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl animate-zoom-in"
          />
          <button
            @click="nextImage"
            class="absolute right-4 text-white/70 hover:text-white transition-all hover:translate-x-1 duration-300"
          >
            <svg
              class="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <!-- Dot indicators -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              v-for="(_, idx) in images"
              :key="idx"
              @click="currentIndex = idx"
              class="h-2 rounded-full transition-all duration-300"
              :class="
                idx === currentIndex
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              "
            ></button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from "vue";

const images = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Gallery 1",
    span: "col-span-2 md:row-span-2 h-[340px] md:h-[460px]",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Gallery 2",
    span: "col-span-1 h-[160px] md:h-[220px]",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Gallery 3",
    span: "col-span-1 h-[160px] md:h-[220px]",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Gallery 4",
    span: "col-span-2 h-[160px] md:h-[220px]",
    positionClass: "object-[center_35%]",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Gallery 5",
    span: "col-span-2 h-[160px] md:h-[220px]",
    positionClass: "object-[center_30%]",
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Gallery 6",
    span: "col-span-1 h-[160px] md:h-[220px]",
    positionClass: "object-[center_90%]",
  },
  {
    src: "/images/gallery-7.jpg",
    alt: "Gallery 7",
    span: "col-span-1 h-[160px] md:h-[220px]",
    positionClass: "object-[center_60%]",
  },
  {
    src: "/images/gallery-8.jpg",
    alt: "Gallery 8",
    span: "col-span-2 h-[160px] md:h-[220px]",
    positionClass: "object-[center_30%]",
  }
];

const lightboxOpen = ref(false);
const currentIndex = ref(0);

const openLightbox = (index) => {
  currentIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = "";
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};
</script>

<style scoped>
.lightbox-enter-active {
  transition: opacity 0.4s ease;
}
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
