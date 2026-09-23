import { useReveal } from '../hooks/useReveal';

/**
 * Envolve o conteúdo com a animação de entrada por scroll.
 * `as` permite escolher a tag renderizada (div, h2, p, section…).
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay,
  children,
  style,
  ...rest
}) {
  const [ref, visible] = useReveal();

  const classes = ['reveal', visible ? 'visible' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: delay, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
