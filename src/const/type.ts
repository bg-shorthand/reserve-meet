type Event = {
  summary: string;
  location: string;
  date: string;
  time: string;
  id: string;
};

type Events = Event[];

type Calendar = {
  summary: string;
  id: string;
};

type Calendars = Calendar[];

export type { Event, Events, Calendar, Calendars };
