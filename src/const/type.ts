interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

type Event = {
  id: string;
  summary: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  creatorEmail: string;
};

type Events = Event[];

type Calendar = {
  summary: string;
  id: string;
};

type Calendars = Calendar[];

type newEvent = {
  calendarId: string;
  summary: string;
  description: string;
  floor: string;
  room: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  attendees: { email: string }[];
};

export type { DefaultProps, Event, Events, Calendar, Calendars, newEvent };
