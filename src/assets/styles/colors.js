// Get colors from CSS custom properties
const getComputedColor = (name) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`).trim();
};

// These colors are read from CSS custom properties
export const colors = {
  allIn: getComputedColor('all-in'),
  bluff: getComputedColor('all-in'),
  raise: getComputedColor('raise'),
  call: getComputedColor('call'),
  fold: getComputedColor('fold')
};
