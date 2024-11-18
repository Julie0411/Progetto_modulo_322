import { DateTime } from 'luxon';
export const parseDateTime = (date, opts) => {
  if (date instanceof DateTime) {
    return opts ? DateTime.fromObject(date.toObject(), opts) : date;
  }
  if (date instanceof Date) {
    return DateTime.fromJSDate(date, opts);
  }
  if (typeof date === 'string') {
    return DateTime.fromISO(date, opts);
  }
  if (typeof date === 'number') {
    return DateTime.fromMillis(date, opts);
  }
  return DateTime.local(opts);
};
export const parseDate = (date, forceNewDate = true) => {
  if (date instanceof Date && !forceNewDate) {
    return forceNewDate ? new Date(date) : date;
  }
  if (date instanceof DateTime) {
    return date.toJSDate();
  }
  if (date) {
    return new Date(date);
  }
  return new Date();
};
export const startOfWeek = (date, weekStartsOn) => {
  const currentDate = parseDateTime(date);
  const diff = (currentDate.weekday - weekStartsOn + 7) % 7;
  return currentDate.minus({
    days: diff
  }).startOf('day');
};
export const endOfWeek = (date, weekStartsOn) => {
  return startOfWeek(date, weekStartsOn).plus({
    days: 6
  }).endOf('day');
};
export const diffDays = (date1, date2) => {
  const dt1 = parseDateTime(date1);
  const dt2 = parseDateTime(date2);
  return dt1.diff(dt2, 'days').days;
};
export const dateTimeToISOString = date => date.toUTC().toISO();
export const dateToDtStart = date => {
  const parsedDate = parseDateTime(date).toUTC();
  return ['DTSTART:', parsedDate.year, parsedDate.month.toString().padStart(2, '0'), parsedDate.day.toString().padStart(2, '0'), 'T', parsedDate.hour.toString().padStart(2, '0'), parsedDate.minute.toString().padStart(2, '0'), parsedDate.second.toString().padStart(2, '0'), 'Z\n'].join('');
};
export const toHourStr = (originalMinutes, hourFormat, meridiem) => {
  const hours = Math.floor(originalMinutes / 60);
  const minutes = Math.floor(originalMinutes % 60);
  const formatTokens = {
    HH: hours.toString().padStart(2, '0'),
    H: hours,
    hh: (hours % 12 || 12).toString().padStart(2, '0'),
    h: hours % 12 || 12,
    kk: (hours === 24 ? 24 : hours % 24 + 1).toString().padStart(2, '0'),
    k: hours === 24 ? 24 : hours % 24 + 1,
    mm: minutes.toString().padStart(2, '0'),
    m: minutes,
    ss: '00',
    s: '0',
    A: hours >= 12 ? meridiem.post.toUpperCase() : meridiem.ante.toUpperCase(),
    a: hours >= 12 ? meridiem.post.toLowerCase() : meridiem.ante.toLowerCase()
  };
  return hourFormat.replace(/HH|H|hh|h|kk|k|mm|m|ss|s|A|a/g, match => {
    var _formatTokens$match;
    return ((_formatTokens$match = formatTokens[match]) === null || _formatTokens$match === void 0 ? void 0 : _formatTokens$match.toString()) || match;
  });
};
export const getWeekNumberOfYear = (date, timeZone) => {
  'worklet';

  return parseDateTime(date).setZone(timeZone).weekNumber;
};
export const forceUpdateZone = (date, zone = 'local') => {
  return parseDateTime(date).setZone(zone, {
    keepLocalTime: true
  });
};
//# sourceMappingURL=dateUtils.js.map