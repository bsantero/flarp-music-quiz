import React, { useState } from 'react';

function useMenuStatus(menu) {
  const [isOn, setIsOn] = useState(null);

  return isOn;
}
