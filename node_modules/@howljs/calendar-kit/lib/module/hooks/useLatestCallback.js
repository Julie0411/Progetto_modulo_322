import { useLayoutEffect, useRef } from 'react';
export default function useLatestCallback(callback) {
  const ref = useRef(callback);
  const latestCallback = useRef(function latestCallback(...args) {
    if (typeof ref.current !== 'function') {
      console.warn('Should reload app to update callback');
      return;
    }
    const refCallback = ref.current;
    return refCallback.apply(this, args);
  }).current;
  useLayoutEffect(() => {
    ref.current = callback;
  });
  return callback ? latestCallback : callback;
}
//# sourceMappingURL=useLatestCallback.js.map