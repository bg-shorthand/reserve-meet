interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

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

export type { DefaultProps, Event, Events, Calendar, Calendars };
