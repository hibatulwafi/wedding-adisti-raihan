// src/composables/useScrollAnimation.js
import { onMounted, onUnmounted } from 'vue'

/**
 * Composable that uses Intersection Observer to trigger
 * scroll-based reveal animations on elements with [data-animate].
 *
 * Usage:
 *   - Add `data-animate="fade-up"` (or fade-left, fade-right, fade-in, zoom-in, slide-up)
 *   - Optionally add `data-delay="200"` for stagger delays (in ms)
 *   - Call `useScrollAnimation()` in the component's setup
 */
export function useScrollAnimation() {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = el.dataset.delay || 0
            setTimeout(() => {
              el.classList.add('scroll-animated')
              el.classList.remove('scroll-hidden')
            }, Number(delay))
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('scroll-hidden')
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
