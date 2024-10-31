import { useState } from 'react';

export function useBoolean(initialValue = false) {
  const [isOn, setValue] = useState(initialValue);

  return {
    isOn,
    off: () => setValue(false),
    on: () => setValue(true),
    toggle: () => setValue((prev) => !prev),
  };
}
