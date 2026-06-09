<template>
  <div class="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
    <div
      v-for="petal in petals"
      :key="petal.id"
      class="absolute rounded-[50%_0] opacity-0"
      :style="{
        left: petal.x + '%',
        top: '-20px',
        width: petal.size + 'px',
        height: petal.size + 'px',
        background: petal.color,
        animation: `petal-drift ${petal.duration}s linear ${petal.delay}s infinite`,
        transform: `rotate(${petal.rotation}deg)`,
        '--random': petal.random,
      }"
    ></div>
  </div>
</template>

<script setup>
const colors = [
  'rgba(244, 168, 184, 0.4)',
  'rgba(249, 208, 217, 0.35)',
  'rgba(212, 160, 167, 0.35)',
  'rgba(252, 231, 235, 0.4)',
  'rgba(237, 122, 149, 0.25)',
  'rgba(183, 110, 121, 0.3)',
]

// Reduced quantity and slowed down duration for premium, elegant ambient look
const petals = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 8 + Math.random() * 12,
  color: colors[Math.floor(Math.random() * colors.length)],
  duration: 15 + Math.random() * 20, // 15s to 35s duration for ultra-slow, graceful fall
  delay: Math.random() * 15,
  rotation: Math.random() * 360,
  random: Math.random(),
}))
</script>

<style scoped>
@keyframes petal-drift {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg) scale(0.8);
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    /* Gentle horizontal sway (40px) and rotation (180deg) for maximum elegance */
    transform: translate(calc(40px - 80px * var(--random, 0.5)), 105vh) rotate(180deg) scale(0.5);
  }
}
</style>
