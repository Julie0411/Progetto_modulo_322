"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoading = exports.LoadingContext = void 0;
var _react = require("react");
const LoadingContext = exports.LoadingContext = /*#__PURE__*/(0, _react.createContext)({
  isLoading: false
});
const useLoading = () => {
  const {
    isLoading
  } = (0, _react.useContext)(LoadingContext);
  return isLoading;
};
exports.useLoading = useLoading;
//# sourceMappingURL=LoadingContext.js.map