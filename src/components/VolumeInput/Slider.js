import React from 'react';

export function Slider({ volume, setVolume, handleVolume }) {
  return (
    <div className="volume slider-wrapper">
      <label>
        Vol
        <input
          type="range"
          min="0"
          max="1"
          value={volume}
          // onChange={(event) => handleVolume(event.target.value)}
          onChange={(event) => handleVolume(event.target.value)}
          step="0.01"
        />
      </label>
    </div>
  );
}

export function CheckBox({ title = 'Check', checked = false, fnClick }) {
  return (
    <div className="playing checkbox-wrapper">
      <label>
        {title} {checked ? 'On' : 'Off'}
        <input
          type="checkbox"
          checked={checked}
          // onChange={(event) => handleVolume(event.target.value)}
          onChange={(e) => {
            // if (fnClick !== undefined) fnClick(e.target.checked);
            fnClick(e.target.checked);
          }}
        />
      </label>
    </div>
  );
}

export default { Slider, CheckBox };
