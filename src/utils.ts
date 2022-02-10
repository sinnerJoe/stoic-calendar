import { isLeapYear } from "date-fns";

export function countLeapWeeksBetween(start: Date, end: Date = new Date()) {
  return Math.floor(
    new Array(end.getFullYear() - start.getFullYear())
      .fill(0)
      .map((v, yearNr) =>
        isLeapYear(new Date(start.getFullYear() + yearNr, 1, 1))
      )
      .reduce((acc, leapYear) => acc + Number(leapYear), 0) / 7
  );
}
