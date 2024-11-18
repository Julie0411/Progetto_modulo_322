"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalendar = exports.default = exports.CalendarContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CalendarContext = exports.CalendarContext = /*#__PURE__*/_react.default.createContext(undefined);
const CalendarProvider = ({
  value,
  children
}) => {
  return /*#__PURE__*/_react.default.createElement(CalendarContext.Provider, {
    value: value
  }, children);
};
var _default = exports.default = CalendarProvider;
const useCalendar = () => {
  const context = _react.default.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
exports.useCalendar = useCalendar;
//# sourceMappingURL=CalendarProvider.js.map