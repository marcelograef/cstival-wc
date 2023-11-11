export const getRealPositionLong = (pos) => {
  let realPos;
  if (pos <= 1) {
    realPos = 'EP';
  } else if (pos <= 3) {
    realPos = 'MP';
  } else if (pos === 4) {
    realPos = 'HJ';
  } else if (pos === 5) {
    realPos = 'CO';
  } else if (pos === 6) {
    realPos = 'BU';
  } else if (pos === 7) {
    realPos = 'SB';
  } else {
    realPos = 'BB';
  }

  return realPos;
};

export const getRealPositionShort = (pos) => {
  let realPos;
  if (pos <= 1) {
    realPos = 'EP';
  } else if (pos <= 3) {
    realPos = 'MP';
  } else if (pos === 4) {
    realPos = 'HJ';
  } else if (pos === 5) {
    realPos = 'CO';
  } else if (pos === 6) {
    realPos = 'BU';
  } else if (pos === 7) {
    realPos = 'SB';
  } else {
    realPos = 'BB';
  }

  return realPos;
};

export const getRealPositionROL = (pos) => {
  // Define the standard positions in poker
  const positions = 'UTG,UTG+1,MP,MP+1,HJ,CO,BU,SB,BB';

  // Find the index of the 'HJ' position in the list
  const idxHJ = positions.split(',').indexOf('HJ');

  // Determine the real position based on the input position
  if (pos <= idxHJ || pos === idxHJ + 3) {
    return 'HJ-'; // Position is before or at 'HJ'
  } else if (pos <= idxHJ + 2) {
    return 'CO|BU'; // Position is at 'CO' or 'BU'
  }

  return 'BB'; // Default to 'BB' for positions after 'HJ+4'
};
