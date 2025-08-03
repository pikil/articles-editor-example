interface DebouncedFn {
  call: (_: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  cancel: () => void;
}

interface Timeouts {
  [key: string]: number | null;
}

const timeouts: Timeouts = {};

export default function (name: string, fn: () => void, wait: number = 250): DebouncedFn {
  function debounced (/* ...args */) {
    const args = arguments; // eslint-disable-line prefer-rest-params

    const later = () => {
      timeouts[name] = null;
      // @ts-expect-error args
      fn.apply(this, args);
    };

    if (timeouts[name] !== null)
      clearTimeout(timeouts[name]);

    timeouts[name] = setTimeout(later, wait);
  };

  debounced.cancel = () => {
    if (timeouts[name] !== null)
      clearTimeout(timeouts[name]);
  };

  return debounced;
};
