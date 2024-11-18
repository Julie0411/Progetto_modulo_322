import { RRule, RRuleSet, rrulestr } from 'rrule';
import { forceUpdateZone, parseDateTime } from '../../utils/dateUtils';
export class RRuleGenerator {
  constructor(rrule, dtstart, exDates) {
    this.dtstart = forceUpdateZone(dtstart, 'UTC').toJSDate();
    const parsedRule = rrulestr(rrule, {
      dtstart: this.dtstart
    });
    const rruleSet = new RRuleSet();
    rruleSet.rrule(new RRule(parsedRule.origOptions));
    exDates === null || exDates === void 0 || exDates.forEach(d => {
      return rruleSet.exdate(forceUpdateZone(d, 'UTC').toJSDate());
    });
    this.rule = rruleSet;
  }
  generateOccurrences(start, end, timeZone) {
    const startDate = parseDateTime(start);
    const endDate = parseDateTime(end);
    const occurrences = this.rule.between(forceUpdateZone(startDate, 'UTC').toJSDate(), forceUpdateZone(endDate, 'UTC').toJSDate(), true);
    return occurrences.map(occurrence => forceUpdateZone(parseDateTime(occurrence).toUTC(), timeZone));
  }
  firstOccurrence(timeZone) {
    const occurrences = this.rule.after(this.dtstart, true);
    return occurrences ? forceUpdateZone(parseDateTime(occurrences).toUTC(), timeZone) : null;
  }
}
//# sourceMappingURL=index.js.map