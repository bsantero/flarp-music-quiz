import React from 'react';
import './volume-input.css';

export function Slider({ volume, fnClick }) {
  const vol = volume;
  return (
    <div className="volume slider-wrapper">
      <label>
        Vol
        <input
          type="range"
          min="0"
          max="1"
          value={vol}
          // onChange={(event) => handleVolume(event.target.value)}
          onChange={(e) => fnClick(e.target.value)}
          step="0.01"
        />
      </label>
    </div>
  );
}

export function CheckBox({
  title = 'Checkbox',
  extraClass = '',
  checked = false,
  fnClick
}) {
  const newTitle = title.toLowerCase() + '-checkbox';
  const newClassName = checked
    ? newTitle + ' checked playing checkbox-wrapper ' + extraClass
    : newTitle + ' playing checkbox-wrapper ' + extraClass;
  return (
    <div className={newClassName}>
      <label>
        {title} {checked ? 'On' : 'Off'}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            fnClick(!e.target.checked);
          }}
        />
      </label>
    </div>
  );
}

export default { Slider, CheckBox };
