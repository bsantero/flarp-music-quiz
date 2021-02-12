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

export const noSig = keyofc;

export const keySignatures = [
  {
    id: 0,
    sharp: 0,
    flat: 0,
    major: 'c',
    minor: 'a',
    uri: keyofc
  },
  {
    id: 1,
    sharp: 1,
    flat: 0,
    major: 'g',
    minor: 'e',
    uri: sharp1
  },
  {
    id: 2,
    sharp: 2,
    flat: 0,
    major: 'd',
    minor: 'b',
    uri: sharp2
  },
  {
    id: 3,
    sharp: 3,
    flat: 0,
    major: 'a',
    minor: 'f sharp',
    uri: sharp3
  },
  {
    id: 4,
    sharp: 4,
    flat: 0,
    major: 'e',
    minor: 'c sharp',
    uri: sharp4
  },
  {
    id: 5,
    sharp: 5,
    flat: 0,
    major: 'b',
    minor: 'g sharp',
    uri: sharp5,
    altSharp: 0,
    altFlat: 7,
    altMajor: 'c flat',
    altMinor: 'a flat',
    altUri: flat7
  },
  {
    id: 6,
    sharp: 6,
    flat: 0,
    major: 'f sharp',
    minor: 'd sharp',
    uri: sharp6,
    altSharp: 0,
    altFlat: 6,
    altMajor: 'g flat',
    altMinor: 'e flat',
    altUri: flat6
  },
  {
    id: 7,
    sharp: 7,
    flat: 0,
    major: 'c sharp',
    minor: 'a sharp',
    uri: sharp7,
    altSharp: 0,
    altFlat: 5,
    altMajor: 'd flat',
    altMinor: 'b flat',
    altUri: flat5
  },
  {
    id: 8,
    sharp: 0,
    flat: 4,
    major: 'a flat',
    minor: 'f',
    uri: flat4
  },
  {
    id: 9,
    sharp: 0,
    flat: 3,
    major: 'e flat',
    minor: 'c',
    uri: flat3
  },
  {
    id: 10,
    sharp: 0,
    flat: 2,
    major: 'b flat',
    minor: 'g',
    uri: flat2
  },
  {
    id: 11,
    sharp: 0,
    flat: 1,
    major: 'f',
    minor: 'd',
    uri: flat1
  }
];
