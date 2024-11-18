"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RRuleGenerator = void 0;
var _rrule = require("rrule");
var _dateUtils = require("../../utils/dateUtils");
class RRuleGenerator {
  constructor(rrule, dtstart, exDates) {
    this.dtstart = (0, _dateUtils.forceUpdateZone)(dtstart, 'UTC').toJSDate();
    const parsedRule = (0, _rrule.rrulestr)(rrule, {
      dtstart: this.dtstart
    });
    const rruleSet = new _rrule.RRuleSet();
    rruleSet.rrule(new _rrule.RRule(parsedRule.origOptions));
    exDates === null || exDates === void 0 || exDates.forEach(d => {
      return rruleSet.exdate((0, _dateUtils.forceUpdateZone)(d, 'UTC').toJSDate());
    });
    this.rule = rruleSet;
  }
  generateOccurrences(start, end, timeZone) {
    const startDate = (0, _dateUtils.parseDateTime)(start);
    const endDate = (0, _dateUtils.parseDateTime)(end);
    const occurrences = this.rule.between((0, _dateUtils.forceUpdateZone)(startDate, 'UTC').toJSDate(), (0, _dateUtils.forceUpdateZone)(endDate, 'UTC').toJSDate(), true);
    return occurrences.map(occurrence => (0, _dateUtils.forceUpdateZone)((0, _dateUtils.parseDateTime)(occurrence).toUTC(), timeZone));
  }
  firstOccurrence(timeZone) {
    const occurrences = this.rule.after(this.dtstart, true);
    return occurrences ? (0, _dateUtils.forceUpdateZone)((0, _dateUtils.parseDateTime)(occurrences).toUTC(), timeZone) : null;
  }
}
exports.RRuleGenerator = RRuleGenerator;
//# sourceMappingURL=index.js.map