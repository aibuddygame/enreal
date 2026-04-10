import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for scroll-triggered animations with reduced motion support
 * 
 * @param {Object} options - Animation options
 * @param {number} options.y - Vertical offset (default: 30)
 * @param {number} options.opacity - Initial opacity (default: 0)
 * @param {number} options.duration - Animation duration (default: 0.8)
 * @param {number} options.delay - Animation delay (default: 0)
 * @param {string} options.start - ScrollTrigger start point (default: 'top 85%')
 * @param {boolean} options.once - Trigger only once (default: true)
 * @param {Function} options.onComplete - Callback when animation completes
 */
export function useScrollAnimation(options = {}) {
  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
    once = true,
    onComplete,
  } = options;

  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start,
            once,
            onComplete: () => {
              if (onComplete) onComplete();
            },
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [y, opacity, duration, delay, start, once, onComplete, prefersReducedMotion]);

  return ref;
}

/**
 * Hook for staggered animations on multiple children
 * 
 * @param {Object} options - Animation options
 * @param {number} options.stagger - Stagger delay between children (default: 0.1)
 * @param {number} options.y - Vertical offset (default: 20)
 * @param {number} options.duration - Animation duration (default: 0.8)
 */
export function useStaggerAnimation(options = {}) {
  const {
    stagger = 0.1,
    y = 20,
    opacity = 0,
    duration = 0.8,
    start = 'top 85%',
    once = true,
  } = options;

  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (!children.length) return;

    // If user prefers reduced motion, show all children immediately
    if (prefersReducedMotion) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start,
            once,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stagger, y, opacity, duration, start, once, prefersReducedMotion]);

  return containerRef;
}
