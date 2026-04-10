import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation.js';

/**
 * AnimatedSection - Wrapper component for scroll-triggered animations
 * Automatically handles reduced motion preferences
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - CSS class names
 * @param {Object} props.style - Inline styles
 * @param {Object} props.animation - Animation options (passed to useScrollAnimation)
 * @param {boolean} props.stagger - Use stagger animation for children
 * @param {string} props.as - HTML element type (default: 'div')
 */
export function AnimatedSection({ 
  children, 
  className = '', 
  style = {}, 
  animation = {},
  stagger = false,
  as: Component = 'div',
  ...rest 
}) {
  const ref = stagger 
    ? useStaggerAnimation(animation)
    : useScrollAnimation(animation);

  return (
    <Component 
      ref={ref} 
      className={className} 
      style={{ 
        opacity: stagger ? undefined : 0, // Initial state for non-stagger
        ...style 
      }} 
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * AnimatedItem - Individual animated element within a stagger container
 * Use inside AnimatedSection with stagger=true
 */
export function AnimatedItem({ children, className = '', style = {}, ...rest }) {
  return (
    <div className={className} style={style} {...rest}>
      {children}
    </div>
  );
}
