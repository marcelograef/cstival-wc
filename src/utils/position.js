// Position utility functions for poker positions

/**
 * Converts a position index to a long position name for response situations
 * @param {number} index - The index of the position in the positions array
 * @returns {string} The long position name
 */
export const getRealPositionLong = (index) => {
    const positions = ['UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO', 'BU', 'SB', 'BB'];
    return positions[index] || '';
};

/**
 * Converts a position index to a position name for ROL situations
 * @param {number} index - The index of the position in the positions array
 * @returns {string} The position name
 */
export const getRealPositionROL = (index) => {
    const positions = ['UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO', 'BU', 'SB', 'BB'];
    return positions[index] || '';
};
