import './styles.css';
import { chromatic } from '../../utils/Keys';
import { Keyboard } from '../Keyboard/Keyboard';
import { Chromatic } from '../Chromatic/Chromatic';

function Circle(dir) {
  return <div>circle of {dir} with 12 buttons.</div>;
}

export function InputPanel({
  inputType,
  handleClick,
  loading,
  octaves,
  currentNote,
  wrongEntries
}) {
  let parentClass;
  let childClass;
  let label;
  let inputButtons;
  // console.log('inputType will be:');
  // console.log(inputType);
  switch (inputType) {
    case 'circlefifths':
      parentClass = 'child input-container circleOfFifths';
      childClass = 'circlefifths';
      inputButtons = Circle('fifths');
      break;
    case 'keyboard':
      parentClass = 'child input-container keyboard-container';
      childClass = 'piano';
      const params = [];
      inputButtons = (
        <Keyboard
          octaves={octaves}
          currentNote={currentNote}
          handleClick={handleClick}
          wrongEntries={wrongEntries}
        />
      );
      // console.log(inputButtons);
      break;
    case 'chromatic':
      parentClass = 'child input-container chromatic-container';
      childClass = 'chromatic';
      inputButtons = (
        <Chromatic
          octaves={octaves}
          currentNote={currentNote}
          handleClick={handleClick}
          wrongEntries={wrongEntries}
        />
      );
      break;
    default:
      return <span>No input defined.</span>;
  }

  return loading ? (
    'Loading...'
  ) : (
    <div className={parentClass}>
      <div className={childClass}>{inputButtons}</div>
    </div>
  );
}

// function InputButtons({ numOfButtons, inputType, handleClick, label }) {
//   console.log(`let's create ${numOfButtons} buttons in a pattern of:`);
//   console.log(`\t${inputType}`);
//   console.log(`\tWrongs: ${wrongGuesses}`);

//   let className = '';
//   let keyClassName;

//   function NewButton(props) {
//     if (inputType == 'keyboard') {
//       return (
//         <div className={props.containerStyle}>
//           {/* <div className="label"> */}
//           <button
//             className={props.styles}
//             onClick={() => handleClick(props)}
//           ></button>
//           {/* </div> */}
//         </div>
//       );
//     } else {
//       return (
//         <div className={props.containerStyle}>
//           {/* <div className="label"> */}
//           <button className={props.styles} onClick={() => handleClick(props)}>
//             {props.label}
//           </button>
//           {/* </div> */}
//         </div>
//       );
//     }
//   }

//   // Generate new array of inputs
//   const chromaticKeys = Object.keys(keySigs);
//   console.log(chromaticKeys); // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
//   let newKeys;
//   // switch (userPrefRotate) {
//   //   case 'false':
//   newKeys = chromaticKeys;
//   //     console.log(newKeys);
//   //     break;
//   //   case 'true':
//   //     newKeys = reorder(chromaticKeys, 9); // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
//   //     console.log(newKeys);
//   //     break;
//   // }

//   // create Returned Array of buttons;
//   let buttons = [];
//   let capitalize = false;

//   let offset;
//   switch (answerMode) {
//     case 'major':
//       capitalize = true;
//       offset = 0;
//       break;
//     case 'minor':
//       offset = 3;
//       break;
//     default:
//       offset = 0;
//   }

//   // Ordering Input button logic
//   const offsetArray = reorder(chromaticKeys, offset); // ['9', '10', '11', '0', '1', '2', '3', '4', '5', '6', '7', '8'];

//   newKeys.forEach((i) => {
//     const intdex = parseInt(i);
//     let name;
//     let isWinner;
//     let offsetIndex;

//     if (intdex + offset < newKeys.length) {
//       offsetIndex = intdex + offset;
//     } else {
//       offsetIndex = intdex - (newKeys.length - offset);
//     }
//     // console.log(offsetIndex);

//     // console.log(`${offsetIndex} is`);
//     // console.log(chromatic[offsetIndex]);
//     // console.log(chromatic[i]);

//     if (answerPitch == offsetIndex) {
//       console.log(`${i} is a winner.`);
//       isWinner = true;
//     } else {
//       isWinner = false;
//       // console.log(`${i} is a loser.`);
//     }
//     if (!keySigs[i].label) {
//       if (capitalize) {
//         name = capitalizeFirstLetter(getNoteData(i, 'label'));
//       } else {
//         name = getNoteData(i, 'label');
//       }
//     } else {
//       name = 'err';
//     }

//     if (inputType == 'keyboard') {
//       switch (parseInt(i)) {
//         case 0:
//         case 2:
//         case 4:
//         case 5:
//         case 7:
//         case 9:
//         case 11:
//           // console.log(`key ${i} is white`);
//           keyClassName = `piano-key white key-${i}`;
//           className = 'white-btn';
//           break;
//         case 1:
//         case 3:
//         case 6:
//         case 8:
//         case 10:
//           // console.log(`key ${i} is black`);
//           keyClassName = `piano-key black key-${i}`;
//           className = 'black-btn';
//           break;
//       }
//     } else {
//       className = 'themed-button';
//       keyClassName = `tick key-${i}`;
//     }

//     if (wrongGuesses.includes(i)) {
//       console.log(`\tis wrong`);
//       if (inputType == 'keyboard') {
//         keyClassName = keyClassName + ' loser';
//       } else {
//         className = className + ' loser';
//       }
//     }

// buttons
//   .push
//   // <NewButton
//   //   btnKey={i}
//   //   winner={isWinner}
//   //   wrongs={wrongGuesses}
//   //   updateWrongs={updateWrongGuesses}
//   //   styles={className}
//   //   containerStyle={keyClassName}
//   //   key={i}
//   //   label={name}
//   // />
//   ();
//   });

//   return buttons;
// }

export default InputPanel;
