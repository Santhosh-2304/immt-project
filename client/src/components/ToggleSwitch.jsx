import React from 'react';

export default function ToggleSwitch({ checked, onChange, size = 'normal' }) {
  // size: normal or small
  return (
    <label className={`switch ${size}`}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="slider" />
    </label>
  );
}
