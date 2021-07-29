const createEventsFromAsyncRes = (items: gapi.client.calendar.Event[]) => {
  const newEvents = items.map(
    ({ id, summary, location, start, end, creator, description, attendees }) => ({
      id: id || '',
      summary: summary || '',
      location: location || '',
      date: start?.dateTime?.slice(0, 10) || '',
      startTime: start?.dateTime?.slice(11, 16) || '',
      endTime: end?.dateTime?.slice(11, 16) || '',
      creatorEmail: creator?.email || '',
      description: description || '',
      attendees,
    }),
  );

  return newEvents;
};

export default createEventsFromAsyncRes;
