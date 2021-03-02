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

const modeTransposition = {
  major: 0,
  minor: 9,
  Ionian: 0,
  Dorian: 2,
  Phrygian: 4,
  Lydian: 5,
  Mixolydian: 7,
  Aeolian: 9,
  Locrian: 11
};

const KeyWeights = function (pitch) {
  switch (pitch) {
    case 'c♮':
    case 'f♮':
    case 'b♭':
    case 'e♭':
    case 'a♭':
    case 'd♭':
    case 'g♭':
    case 'c♭':
      return 'flat';
      break;
    case 'g♮':
    case 'd♮':
    case 'a♮':
    case 'e♮':
    case 'b♮':
    case 'f♯':
    case 'c♯':
      return 'sharp';
      break;
      return 'mixed';
      break;
    default:
      return 'error';
  }
};

const accidentalKeys = function (pitch) {
  switch (pitch) {
    case 'e♭':
    case 'a♭':
    case 'd♭':
    case 'g♭':
    case 'c♭':
    case 'f♮':
    case 'b♭':
      return 'flat';
      break;
    case 'a♮':
    case 'e♮':
    case 'b♮':
    case 'f♯':
    case 'c♯':
    case 'g♮':
    case 'd♮':
      return 'sharp';
      break;
    case 'c♮':
      return 'flat';
      break;
    default:
      return 'error';
  }
};

const majorKeysAvoid = ['d♯', 'e♯', 'f♭', 'g♯', 'b♯', 'a♯'];
const minorKeysAvoid = ['d♭', 'e♯', 'f♭', 'g♭', 'b♯', 'c♭'];

const enharmonics = {
  list: [
    'c♮',
    'c♯',
    'd♭',
    'd♮',
    'd♯',
    'e♭',
    'e♮',
    'e♯',
    'f♭',
    'f♮',
    'f♯',
    'g♭',
    'g♮',
    'g♯',
    'a♭',
    'a♮',
    'a♯',
    'b♭',
    'b♮',
    'b♯',
    'c♭'
  ],
  enhToInd: {
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
  },
  indToEnh: {
    0: ['c♮', 'b♯'],
    1: ['c♯', 'd♭'],
    2: ['d♮'],
    3: ['e♭', 'd♯'],
    4: ['e♮', 'f♭'],
    5: ['f♮', 'e♯'],
    6: ['f♯', 'g♭'],
    7: ['g♮'],
    8: ['a♭', 'g♯'],
    9: ['a♮'],
    10: ['b♭', 'a♯'],
    11: ['b♮', 'c♭']
  }
};

const chromatic = {
  0: {
    default: 'nosig',
    nosig: {
      uri: { major: keyofc, minor: flat3 } // C
    }
  },
  1: {
    default: 'flarp',
    flat: {
      uri: { major: flat5, minor: 'DNU' } // db
    },
    sharp: {
      uri: { major: sharp7, minor: sharp4 } // c#
    }
  },
  2: {
    default: 'sharp',
    sharp: {
      uri: { major: sharp2, minor: flat1 } // D
    }
  },
  3: {
    default: 'flarp',
    flat: {
      uri: { major: flat3, minor: flat6 } // eb
    },
    sharp: {
      uri: { major: 'DNU', minor: sharp6 } // d#
    }
  },
  4: {
    default: 'sharp',
    sharp: {
      uri: { major: sharp4, minor: sharp1 } // E
    }
  },
  5: {
    default: 'flat',
    flat: {
      uri: { major: flat1, minor: flat4 } // F
    }
  },
  6: {
    default: 'flarp',
    flat: {
      uri: { major: flat6, minor: 'DNU' } // gb
    },
    sharp: {
      uri: { major: sharp6, minor: sharp3 } //f#
    }
  },
  7: {
    default: 'sharp',
    sharp: {
      uri: { major: sharp1, minor: flat2 } // G
    }
  },
  8: {
    default: 'flarp',
    flat: {
      uri: { major: flat4, minor: flat7 } // ab
    },
    sharp: {
      uri: { major: 'DNU', minor: sharp5 } //g#
    }
  },
  9: {
    default: 'sharp',
    sharp: 'a',
    flat: 'a',
    sharp: {
      uri: { major: sharp3, minor: keyofc } // A
    }
  },
  10: {
    default: 'flarp',
    flat: {
      uri: { major: flat2, minor: flat5 } // bb
    },
    sharp: {
      uri: { major: 'DNU', minor: sharp7 } // a#
    }
  },
  11: {
    default: 'flarp',
    flat: {
      uri: { major: flat7, minor: 'DNU' } // cb
    },
    sharp: {
      uri: { major: sharp5, minor: sharp2 } // b
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

export {
  keyboard,
  keyofc,
  chromatic,
  modeTransposition,
  accidentalKeys,
  majorKeysAvoid,
  minorKeysAvoid,
  enharmonics,
  defCircleSignatures
};
