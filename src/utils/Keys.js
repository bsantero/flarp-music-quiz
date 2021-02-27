import keyofc from '../img/keysigs/none.png';
import sharp1 from '../img/keysigs/sharp1.png';
import sharp2 from '../img/keysigs/sharp2.png';
import sharp3 from '../img/keysigs/sharp3.png';
import sharp4 from '../img/keysigs/sharp4.png';
import sharp5 from '../img/keysigs/sharp5.png';
import sharp6 from '../img/keysigs/sharp6.png';
import sharp7 from '../img/keysigs/sharp7.png';
import flat1 from '../img/keysigs/flat1.png';
import flat2 from '../img/keysigs/flat2.png';
import flat3 from '../img/keysigs/flat3.png';
import flat4 from '../img/keysigs/flat4.png';
import flat5 from '../img/keysigs/flat5.png';
import flat6 from '../img/keysigs/flat6.png';
import flat7 from '../img/keysigs/flat7.png';

// F♯/G♭
const keyboard = [
  { c: { base: 0 } },
  { 'c+': { base: 1 } },
  { d: { base: 2 } },
  { 'e-': { base: 3 } },
  { e: { base: 4 } },
  { f: { base: 5 } },
  { 'f+': { base: 6 } },
  { g: { base: 7 } },
  { 'g+': { base: 8 } },
  { a: { base: 9 } },
  { 'b-': { base: 10 } },
  { b: { base: 11 } }
];

const enharmonics = {
  'c♮': 0,
  'c♯': 1,
  'd♭': 1,
  'd♮': 2,
  'd♯': 3,
  'e♭': 3,
  'e♮': 4,
  'e♯': 5,
  'f♭': 4,
  'f♮': 5,
  'f♯': 6,
  'g♭': 6,
  'g♮': 7,
  'g♯': 8,
  'a♭': 8,
  'a♮': 9,
  'a♯': 10,
  'b♭': 10,
  'b♮': 11,
  'b♯': 0,
  'c♭': 11
};

const chromatic = {
  0: {
    default: 'nosig',
    sharp: 'c',
    flat: 'c',
    mode: 'Ionian',
    nosig: { uri: keyofc, label: 'c', weighted: 'default' }
  },
  1: {
    default: 'flat',
    sharp: 'c#',
    flat: 'd♭',
    flat: {
      uri: flat5,
      label: 'd♭',
      weighted: 'flat'
    },
    sharp: {
      uri: sharp7,
      label: 'c♯',
      weighted: 'sharp'
    }
  },
  2: {
    default: 'sharp',
    sharp: 'd',
    flat: 'd',
    mode: ['Dorian'],
    sharp: { uri: sharp2, label: 'd', weighted: 'sharp' }
  },
  3: {
    default: 'flat',
    sharp: 'd#',
    flat: 'e♭',
    flat: {
      uri: flat3,
      label: 'e♭',
      weighted: 'flat'
    }
  },
  4: {
    default: 'sharp',
    sharp: 'e',
    flat: 'e',
    mode: ['Phrygian'],
    sharp: {
      uri: sharp4,
      label: 'e',
      weighted: 'sharp'
    }
  },
  5: {
    default: 'flat',
    sharp: 'f',
    flat: 'f',
    mode: ['Lydian'],
    flat: {
      uri: flat1,
      label: 'f',
      weighted: 'flat'
    }
  },
  6: {
    default: 'sharp',
    sharp: 'f#',
    flat: 'g♭',
    flat: {
      uri: flat6,
      label: 'g♭',
      weighted: 'flat',
      weightedQuality: 'major'
    },
    sharp: {
      uri: sharp6,
      label: 'f♯',
      weighted: 'sharp',
      weightedQuality: 'minor'
    }
  },
  7: {
    default: 'sharp',
    sharp: 'g',
    flat: 'g',
    mode: ['Mixolydian'],
    sharp: {
      uri: sharp1,
      label: 'g',
      weighted: 'sharp'
    }
  },
  8: {
    default: 'flat',
    sharp: 'g#',
    flat: 'a♭',
    flat: {
      uri: flat4,
      label: 'a♭',
      weighted: 'flat'
    }
  },
  9: {
    default: 'sharp',
    sharp: 'a',
    flat: 'a',
    mode: ['minor', 'Aeolian'],
    sharp: {
      uri: sharp3,
      label: 'a',
      weighted: 'sharp'
    }
  },
  10: {
    default: 'flat',
    sharp: 'a#',
    flat: 'b♭',
    flat: {
      uri: flat2,
      label: 'b♭',
      weighted: 'flat'
    }
  },
  11: {
    default: 'sharp',
    sharp: 'b',
    flat: 'c♭',
    mode: 'Locrian',
    sharp: {
      uri: sharp5,
      label: 'b',
      weighted: 'sharp'
    },
    flat: {
      uri: flat7,
      label: 'c♭',
      weighted: 'flat'
    }
  }
};

const defCircleSignatures = [
  0, // C
  7, // G
  2, // D
  9, // A
  4, // E
  11, // B
  6, // F#-Gb
  1, // C#-Db
  8, // G#-Ab
  3, // Eb
  10, // Bb
  5 // F
];

const minorKeys = {
  0: { uri: keyofc, label: 'A' },
  1: { uri: sharp1, label: 'E' },
  2: { uri: sharp2, label: 'B' },
  3: { uri: sharp3, label: 'F♯' },
  4: { uri: sharp4, label: 'C♯' },
  5: {
    uri: null,
    sharp: {
      uri: sharp5,
      label: 'G♯'
    },
    flat: {
      uri: flat7,
      label: 'A♭'
    }
  },
  6: {
    uri: null,
    sharp: {
      uri: sharp6,
      label: 'D♯'
    },
    flat: {
      uri: flat6,
      label: 'E♭'
    }
  },
  7: {
    uri: null,
    sharp: {
      uri: sharp7,
      label: 'A♯'
    },
    flat: {
      uri: flat5,
      label: 'B♭'
    }
  },
  8: { uri: flat4, label: 'F' },
  9: { uri: flat3, label: 'C' },
  10: { uri: flat2, label: 'G' },
  11: { uri: flat1, label: 'D' }
};

const keySignatures = {
  0: {
    major: ['c'],
    minor: ['a'],
    uri: [keyofc]
  },
  1: {
    major: ['g'],
    minor: ['e'],
    uri: [sharp1]
  },
  2: {
    major: ['d'],
    minor: ['b'],
    uri: [sharp2]
  },
  3: {
    major: ['a'],
    minor: ['f♯'],
    uri: [sharp3]
  },
  4: {
    major: ['e'],
    minor: ['c♯'],
    uri: [sharp4]
  },
  5: {
    major: ['b', 'c♭'],
    minor: ['g♯', 'a♭'],
    uri: [sharp5, flat6]
  },
  6: {
    major: ['f♯', 'g♭'],
    minor: ['d♯', 'e♭'],
    uri: [sharp6, flat6]
  },
  7: {
    sharp: 7,
    flat: 0,
    major: ['c♯', 'd♭'],
    minor: ['a♯', 'b♭'],
    uri: [sharp7, flat5]
  },
  8: {
    major: ['a♭'],
    minor: ['f'],
    uri: [flat4]
  },
  9: {
    major: ['e♭'],
    minor: ['c'],
    uri: [flat3]
  },
  10: {
    major: ['b♭'],
    minor: ['g'],
    uri: [flat2]
  },
  11: {
    major: ['f'],
    minor: ['d'],
    uri: [flat1]
  }
};

export { keyboard, keyofc, chromatic, enharmonics, defCircleSignatures };
