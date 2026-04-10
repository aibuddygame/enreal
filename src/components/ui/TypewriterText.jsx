import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/**
 * TypewriterText - Animated typewriter effect with reduced motion support
 * 
 * @param {Object} props
 * @param {string[]} props.phrases - Array of phrases to cycle through
 * @param {number} props.typingSpeed - Milliseconds per character (default: 60)
 * @param {number} props.deletingSpeed - Milliseconds per character when deleting (default: 30)
 * @param {number} props.pauseDuration - Milliseconds to pause at end of phrase (default: 1500)
 * @param {Object} props.style - Inline styles for the text
 * @param {string} props.className - CSS class names
 */
export function TypewriterText({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 1500,
  style = {},
  className = '',
}) {
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState('typing');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const timeoutRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion, just show the first phrase statically
    if (prefersReducedMotion) {
      setDisplay(phrases[0] || '');
      return;
    }

    const target = phrases[phraseIdx];
    let cancelled = false;

    const schedule = (fn, delay) => {
      timeoutRef.current = setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
    };

    if (phase === 'typing') {
      if (display.length < target.length) {
        schedule(() => {
          setDisplay(target.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        setPhase('paused');
      }
    }

    if (phase === 'paused') {
      schedule(() => setPhase('deleting'), pauseDuration);
    }

    if (phase === 'deleting') {
      if (display.length > 0) {
        schedule(() => {
          setDisplay((d) => d.slice(0, -1));
        }, deletingSpeed);
      } else {
        schedule(() => {
          setPhraseIdx((i) => (i + 1) % phrases.length);
          setPhase('typing');
        }, 220);
      }
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
    };
  }, [display, phase, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  // Reset when phrases change
  useEffect(() => {
    setDisplay('');
    setPhase('typing');
    setPhraseIdx(0);
  }, [phrases]);

  const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b), '');

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      {/* Hidden text for layout stability */}
      <span
        style={{
          visibility: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {longestPhrase}
      </span>
      {/* Visible animated text */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {display}
        <span
          style={{
            display: 'inline-block',
            width: '0.08em',
            height: '0.9em',
            background: 'currentColor',
            marginLeft: '0.05em',
            verticalAlign: 'middle',
            borderRadius: 1,
            animation: prefersReducedMotion ? 'none' : 'blink 1s step-end infinite',
          }}
        />
      </span>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
