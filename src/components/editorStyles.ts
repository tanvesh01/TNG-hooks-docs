import { css, keyframes } from '@stitches/react';

export const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const fade = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const popOverStyles = css({
  color: 'Black',
  borderRadius: 6,
  border: '1px solid #e3e3e3',
  padding: '10px 20px',
  width: 300,
  maxHeight: '400px',
  overflow: 'scroll',
  backgroundColor: 'white',
  zIndex: 4,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    animation: `${fade} 0.2s ease`,
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },

  '& code': {
    border: '1px solid #e3e3e3',
    boxShadow: 'rgb(0 0 0 / 4%) 0px 2px 0px',
    padding: '1px 3px',
    borderRadius: '4px',
    background: '#f5f5f51a',
  },

  '& p': {
    marginTop: 0,
  },

  '& img': {
    maxWidth: '290px',
    margin: '16px 0',
  },
});
