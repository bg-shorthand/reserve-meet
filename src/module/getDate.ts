import addPrefix0 from './addPrefix0';

const getDate = {
  today(target?: string) {
    const today = target ? new Date(target) : new Date();
    const year = today.getFullYear();
    const month = addPrefix0(today.getMonth() + 1);
    const date = addPrefix0(today.getDate());

    return [
      `${year}-${month}-${date}T00:00:00+09:00`,
      `${year}-${month}-${addPrefix0(+date + 1)}T00:00:00+09:00`,
    ];
  },
  thisWeek(target?: string) {
    let start = '';
    let end = '';

    const today = target ? new Date(target) : new Date();
    const todayMilliseconds = today.getTime();
    const day = today.getDay();

    const getstart = (day: number) => {
      const start = new Date(todayMilliseconds - 1000 * 60 * 60 * 24 * day);

      const year = start.getFullYear();
      const month = addPrefix0(start.getMonth() + 1);
      const date = addPrefix0(start.getDate());

      return `${year}-${month}-${date}T00:00:00+09:00`;
    };

    switch (day) {
      case 0:
        start = getstart(0);
        break;
      case 1:
        start = getstart(1);
        break;
      case 2:
        start = getstart(2);
        break;
      case 3:
        start = getstart(3);
        break;
      case 4:
        start = getstart(4);
        break;
      case 5:
        start = getstart(5);
        break;
      case 6:
        start = getstart(6);
        break;
      default:
        break;
    }

    end = new Date(new Date(start.slice(0, 10)).getTime() + 1000 * 60 * 60 * 24 * 7).toISOString();

    return [start, end];
  },
  sundayToSaturday(target?: string) {
    const sun = this.thisWeek(target)[0];

    const plusDay = (pre: Date, num: number) => {
      return new Date(pre.getTime() + 1000 * 60 * 60 * 24 * num + 1000 * 60 * 60 * 9).toISOString();
    };

    const mon = plusDay(new Date(sun), 1);
    const tue = plusDay(new Date(sun), 2);
    const wed = plusDay(new Date(sun), 3);
    const tur = plusDay(new Date(sun), 4);
    const fri = plusDay(new Date(sun), 5);
    const sat = plusDay(new Date(sun), 6);

    return [sun, mon, tue, wed, tur, fri, sat];
  },
  changeDateToDay(target: Date) {
    const day = target.getDay();

    switch (day) {
      case 0:
        return 'SUN';
      case 1:
        return 'MON';
      case 2:
        return 'TUE';
      case 3:
        return 'WED';
      case 4:
        return 'TUR';
      case 5:
        return 'FRI';
      case 6:
        return 'SAT';
      default:
        return '';
    }
  },
  thisMonth(target?: string) {
    let start = '';
    let end = '';

    const today = target ? new Date(target) : new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    start = `${year}-${addPrefix0(month)}-${1}T00:00:00+09:00`;
    end = `${year}-${month === 12 ? 1 : addPrefix0(month + 1)}-${1}T00:00:00+09:00`;

    return [start, end];
  },
};

export default getDate;
