import { parseDateTime, startOfWeek } from './dateUtils';
export const prepareCalendarRange = props => {
  const {
    minDate,
    maxDate,
    firstDay,
    isSingleDay,
    timeZone
  } = props;
  const minIsoDate = parseDateTime(minDate, {
    zone: timeZone
  }).toISODate();
  const maxIsoDate = parseDateTime(maxDate, {
    zone: timeZone
  }).toISODate();
  const min = parseDateTime(minIsoDate);
  const max = parseDateTime(maxIsoDate);
  const originalMinDateUnix = min.toMillis();
  const originalMaxDateUnix = max.toMillis();

  // Single Day Mode
  if (isSingleDay) {
    const visibleDates = {};
    const visibleDatesArray = [];
    let currentDateTime = min;
    let index = 0;

    // Iterate over days, ensuring time zone and DST are accounted for
    while (currentDateTime.toMillis() <= originalMaxDateUnix) {
      var _props$hideWeekDays;
      const currentWeekDay = currentDateTime.weekday;
      const dateUnix = currentDateTime.toMillis();
      if (!((_props$hideWeekDays = props.hideWeekDays) !== null && _props$hideWeekDays !== void 0 && _props$hideWeekDays.includes(currentWeekDay))) {
        visibleDates[dateUnix] = {
          unix: dateUnix,
          index,
          weekday: currentWeekDay
        };
        visibleDatesArray.push(dateUnix);
        index++;
      }
      currentDateTime = currentDateTime.plus({
        days: 1
      });
    }
    return {
      count: visibleDatesArray.length,
      minDateUnix: originalMinDateUnix,
      maxDateUnix: originalMaxDateUnix,
      originalMinDateUnix,
      originalMaxDateUnix,
      visibleDates,
      visibleDatesArray,
      diffMinDays: 0,
      diffMaxDays: 0
    };
  }

  // Multi-day Mode (week-based)
  const minWeekDay = min.weekday;
  const diffToFirstDay = (minWeekDay - firstDay + 7) % 7;
  const adjustedMin = min.minus({
    days: diffToFirstDay
  });
  const maxWeekDay = max.weekday;
  const diffFromLastDay = (maxWeekDay - firstDay + 7) % 7;
  const adjustedMax = max.plus({
    days: 7 - diffFromLastDay
  });
  const visibleDates = {};
  const visibleDatesArray = [];
  let currentDateTime = adjustedMin;
  let index = 0;
  let diffMinDays = 0;
  let diffMaxDays = 0;
  while (currentDateTime.toMillis() < adjustedMax.toMillis()) {
    var _props$hideWeekDays2;
    const currentWeekDay = currentDateTime.weekday;
    const dateUnix = currentDateTime.toMillis();
    if (!((_props$hideWeekDays2 = props.hideWeekDays) !== null && _props$hideWeekDays2 !== void 0 && _props$hideWeekDays2.includes(currentWeekDay))) {
      visibleDates[dateUnix] = {
        unix: dateUnix,
        index,
        weekday: currentWeekDay
      };
      visibleDatesArray.push(dateUnix);
      index++;
      if (dateUnix < originalMinDateUnix) {
        diffMinDays++;
      }
      if (dateUnix > originalMaxDateUnix) {
        diffMaxDays++;
      }
    }
    currentDateTime = currentDateTime.plus({
      days: 1
    });
  }
  const diffWeeks = Math.floor(adjustedMax.diff(adjustedMin, 'weeks').weeks);
  return {
    count: diffWeeks,
    minDateUnix: adjustedMin.toMillis(),
    maxDateUnix: adjustedMax.toMillis(),
    originalMinDateUnix,
    originalMaxDateUnix,
    visibleDates,
    visibleDatesArray,
    diffMinDays,
    diffMaxDays
  };
};
export const findNearestNumber = (numbers, target) => {
  'worklet';

  if (numbers.includes(target)) {
    return target;
  }
  return numbers.reduce((nearest, current) => Math.abs(current - target) < Math.abs(nearest - target) ? current : nearest);
};
export const isNumbersEqual = (num1, num2, epsilon = 0.2) => {
  return Math.abs(num1 - num2) < epsilon;
};
export const calculateSlots = (start, end, step) => {
  const slots = [];
  const endInMinutes = end;
  let tempStart = start;
  while (tempStart < endInMinutes) {
    slots.push(tempStart);
    tempStart += step;
  }
  return slots;
};
export const clampValues = (value, min, max) => {
  'worklet';

  return Math.max(min, Math.min(value, max));
};
export const roundMinutes = (minutes, step, type = 'round') => {
  'worklet';

  return Math[type](minutes / step) * step;
};
export const prepareMonthData = props => {
  const minDateStr = parseDateTime(props.minDate, {
    zone: props.timeZone
  }).toISODate();
  const maxDateStr = parseDateTime(props.maxDate, {
    zone: props.timeZone
  }).toISODate();
  const minDate = parseDateTime(minDateStr);
  const maxDate = parseDateTime(maxDateStr);
  const minStartOfMonth = minDate.startOf('month');
  const maxStartOfMonth = maxDate.startOf('month');
  const min = startOfWeek(minStartOfMonth, props.firstDay);
  const minDateUnix = min.toMillis();
  const diffMonths = maxStartOfMonth.diff(minStartOfMonth, 'months').months;
  const minStartOfMonthUnix = minStartOfMonth.toMillis();
  const maxStartOfMonthUnix = maxStartOfMonth.toMillis();
  return {
    count: diffMonths,
    minDateUnix,
    originalMinDateUnix: minDate.toMillis(),
    originalMaxDateUnix: maxDate.toMillis(),
    minStartOfMonthUnix,
    maxStartOfMonthUnix
  };
};
//# sourceMappingURL=utils.js.map