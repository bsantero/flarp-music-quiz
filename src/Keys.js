import keyofc from './img/keysigs/none.png';
import sharp1 from './img/keysigs/sharp1.png';
import sharp2 from './img/keysigs/sharp2.png';
import sharp3 from './img/keysigs/sharp3.png';
import sharp4 from './img/keysigs/sharp4.png';
import sharp5 from './img/keysigs/sharp5.png';
import sharp6 from './img/keysigs/sharp6.png';
import sharp7 from './img/keysigs/sharp7.png';
import flat1 from './img/keysigs/flat1.png';
import flat2 from './img/keysigs/flat2.png';
import flat3 from './img/keysigs/flat3.png';
import flat4 from './img/keysigs/flat4.png';
import flat5 from './img/keysigs/flat5.png';
import flat6 from './img/keysigs/flat6.png';
import flat7 from './img/keysigs/flat7.png';

const majorKeys = {
  0: { uri: keyofc, name: 'C' },
  1: { uri: sharp1, name: 'G' },
  2: { uri: sharp2, name: 'D' },
  3: { uri: sharp3, name: 'A' },
  4: { uri: sharp4, name: 'E' },
  5: { uri: sharp5, name: 'B' },
  6: {
    uri: 'choose',
    sharp: {
      uri: sharp6,
      name: 'F sharp'
    },
    flat: {
      uri: flat6,
      name: 'G flat'
    }
  },
  7: {
    uri: 'choose',
    sharp: {
      uri: sharp7,
      name: 'C sharp'
    },
    flat: {
      uri: flat5,
      name: 'D flat'
    }
  },
  8: { uri: flat4, name: 'A flat' },
  9: { uri: flat3, name: 'E flat' },
  10: { uri: flat2, name: 'B flat' },
  11: { uri: flat1, name: 'F' }
};

const minorKeys = {
  0: { uri: keyofc, name: 'A' },
  1: { uri: sharp1, name: 'E' },
  2: { uri: sharp2, name: 'B' },
  3: { uri: sharp3, name: 'F sharp' },
  4: { uri: sharp4, name: 'C sharp' },
  5: {
    uri: 'choose',
    sharp: {
      uri: sharp5,
      name: 'G sharp'
    },
    flat: {
      uri: flat7,
      name: 'A flat'
    }
  },
  6: {
    uri: 'choose',
    sharp: {
      uri: sharp6,
      name: 'D sharp'
    },
    flat: {
      uri: flat6,
      name: 'E flat'
    }
  },
  7: {
    uri: 'choose',
    sharp: {
      uri: sharp7,
      name: 'A sharp'
    },
    flat: {
      uri: flat5,
      name: 'B flat'
    }
  },
  8: { uri: flat4, name: 'F' },
  9: { uri: flat3, name: 'C' },
  10: { uri: flat2, name: 'G' },
  11: { uri: flat1, name: 'D' }
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
    minor: ['f sharp'],
    uri: [sharp3]
  },
  4: {
    major: ['e'],
    minor: ['c sharp'],
    uri: [sharp4]
  },
  5: {
    major: ['b', 'c flat'],
    minor: ['g sharp', 'a flat'],
    uri: [sharp5, flat6]
  },
  6: {
    major: ['f sharp', 'g flat'],
    minor: ['d sharp', 'e flat'],
    uri: [sharp6, flat6]
  },
  7: {
    sharp: 7,
    flat: 0,
    major: ['c sharp', 'd flat'],
    minor: ['a sharp', 'b flat'],
    uri: [sharp7, flat5]
  },
  8: {
    major: ['a flat'],
    minor: ['f'],
    uri: [flat4]
  },
  9: {
    major: ['e flat'],
    minor: ['c'],
    uri: [flat3]
  },
  10: {
    major: ['b flat'],
    minor: ['g'],
    uri: [flat2]
  },
  11: {
    major: ['f'],
    minor: ['d'],
    uri: [flat1]
  }
};

export { keyofc, keySignatures, majorKeys, minorKeys };
