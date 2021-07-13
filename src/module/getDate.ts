const getDate = {
  today(target?: string) {
    const today = target ? new Date(target) : new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return [
      `${year}-${month < 10 ? '0' + month : month}-${date}T00:00:00Z`,
      `${year}-${month < 10 ? '0' + month : month}-${date + 1}T00:00:00Z`,
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
      const month = start.getMonth() + 1;
      const date = start.getDate();

      return `${year}-${month < 10 ? '0' + month : month}-${date}T00:00:00Z`;
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
  thisMonth(target?: string) {
    let start = '';
    let end = '';

    const today = target ? new Date(target) : new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    start = `${year}-${month < 10 ? '0' + month : month}-${1}T00:00:00Z`;
    end = `${year}-${
      month === 12 ? 1 : month + 1 < 10 ? '0' + (month + 1) : month + 1
    }-${1}T00:00:00Z`;

    return [start, end];
  },
};

export default getDate;
