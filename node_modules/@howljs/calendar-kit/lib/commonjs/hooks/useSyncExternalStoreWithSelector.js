"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector;
var _lodash = _interopRequireDefault(require("lodash.isequal"));
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function useSyncExternalStoreWithSelector(subscribe, getSnapshot, selector, isEqual) {
  const instRef = (0, _react.useRef)(null);
  let inst;
  if (instRef.current === null) {
    inst = {
      hasValue: false,
      value: null
    };
    instRef.current = inst;
  } else {
    inst = instRef.current;
  }
  const getSelection = (0, _react.useMemo)(() => {
    let hasMemo = false;
    let memoizedSnapshot;
    let memoizedSelection;
    const memoizedSelector = nextSnapshot => {
      if (!hasMemo) {
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;
        const nextSelection = selector(nextSnapshot);
        if (isEqual !== undefined && inst.hasValue) {
          const currentSelection = inst.value;
          if (isEqual(currentSelection, nextSelection)) {
            memoizedSelection = currentSelection;
            return currentSelection;
          }
        }
        memoizedSelection = nextSelection;
        return nextSelection;
      }
      const prevSnapshot = memoizedSnapshot;
      const prevSelection = memoizedSelection;
      if ((0, _lodash.default)(prevSnapshot, nextSnapshot)) {
        return prevSelection;
      }
      const nextSelection = selector(nextSnapshot);
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        return prevSelection;
      }
      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    };
    const getSnapshotWithSelector = () => memoizedSelector(getSnapshot());
    return getSnapshotWithSelector;
  }, [selector, isEqual, inst.hasValue, inst.value, getSnapshot]);
  const value = (0, _react.useSyncExternalStore)(subscribe, getSelection);
  (0, _react.useEffect)(() => {
    if (instRef.current) {
      instRef.current.hasValue = true;
      instRef.current.value = value;
    }
  }, [value]);
  return value;
}
//# sourceMappingURL=useSyncExternalStoreWithSelector.js.map