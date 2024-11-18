import { useRef } from 'react';
function useLazyRef(initializer) {
  const ref1 = useRef(null);
  if (ref1.current === null) {
    ref1.current = initializer();
  }
  const ref2 = useRef(ref1.current);
  return ref2;
}
export default useLazyRef;
//# sourceMappingURL=useLazyRef.js.map