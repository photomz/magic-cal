export function createGoogleCalendarUrl(options) {
  const {
    title: eventTitle,
    startTime,
    endTime,
    description = '',
    location = '',
    timezone,
    recurrence: recurrenceRule,
    guests = [],
  } = options;

  // Base URL for adding events to Google Calendar
  const baseUrl = 'http://www.google.com/calendar/render';

  // Format dates to 'YYYYMMDDTHHMMSSZ' format
  const formatDateTime = (date) => {
    return new Date(date).toISOString().replace(/-|:|\.\d{3}/g, '');
  };

  // Construct query parameters
  const queryParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle,
    dates: `${formatDateTime(startTime)}/${formatDateTime(endTime)}`,
    details: description,
    location: location,
    trp: 'false',
    sprop: '',
    sprop: 'name:',
  });

  // Encode and join guests to a comma-separated string
  const formattedGuests = guests.map(encodeURIComponent).join(',');

  // Add guests if provided
  if (guests.length > 0) {
    queryParams.append('add', formattedGuests);
  }

  // Add timezone and recurrence rule if provided
  if (timezone) {
    queryParams.append('ctz', timezone);
  }

  if (recurrenceRule) {
    // Correctly format the recurrence rule without double-encoding
    const formattedRecurrenceRule = `RRULE:${recurrenceRule}`;
    queryParams.append('recur', formattedRecurrenceRule);
  }

  // Return the full URL
  return `${baseUrl}?${queryParams.toString()}`;
}

export function createOutlookCalendarUrl(options) {
  const {
    title: eventTitle,
    startTime,
    endTime,
    description = '',
    location = '',
    timezone,
    recurrence: recurrenceRule,
    guests = [],
  } = options;

  // Base URL for adding events to Outlook Calendar
  const baseUrl = 'https://outlook.office.com/calendar/0/deeplink/compose';

  // Format dates to 'YYYY-MM-DDTHH:MM:SS' format
  const formatDateTime = (date) => {
    return new Date(date)
      .toISOString()
      .replace(/-|:|\.\d{3}/g, ':')
      .split('.')[0];
  };

  // Construct query parameters
  const queryParams = new URLSearchParams({
    subject: eventTitle,
    startdt: formatDateTime(startTime),
    enddt: formatDateTime(endTime),
    body: description,
    location: location,
    allday: false, // Assuming it's not an all-day event
  });

  // Encode and join guests to a semicolon-separated string
  const formattedGuests = guests.map(encodeURIComponent).join(';');

  // Add guests if provided
  if (guests.length > 0) {
    queryParams.append('to', formattedGuests);
  }

  // Add timezone and recurrence rule if provided
  if (timezone) {
    queryParams.append('timezone', timezone);
  }

  if (recurrenceRule) {
    // Assuming recurrenceRule is in a format compatible with Outlook, no need to modify
    queryParams.append('rru', recurrenceRule);
  }

  // Return the full URL
  return `${baseUrl}?${queryParams.toString()}`;
}

export function createYahooCalendarUrl(options) {
  const {
    title: eventTitle,
    startTime,
    endTime,
    description = '',
    location = '',
    timezone,
    recurrence: recurrenceRule,
    guests = [],
  } = options;

  // Base URL for adding events to Yahoo Calendar
  const baseUrl = 'https://calendar.yahoo.com/?v=60&view=d&type=20';

  // Format dates to 'YYYYMMDDTHHMMSSZ' format
  const formatDateTime = (date) => {
    return new Date(date)
      .toISOString()
      .replace(/-|:|\.\d{3}/g, '')
      .replace(/(\d{8})T(\d{6})/, '$1T$2Z');
  };

  // Construct query parameters
  const queryParams = new URLSearchParams({
    title: eventTitle,
    st: formatDateTime(startTime),
    et: formatDateTime(endTime),
    desc: description,
    in_loc: location,
  });

  // Add guests if provided
  if (guests.length > 0) {
    queryParams.append('in_vit', guests.join(','));
  }

  // Add timezone and recurrence rule if provided
  if (timezone) {
    queryParams.append('tz', timezone);
  }

  if (recurrenceRule) {
    // Assuming recurrenceRule is in a format compatible with Yahoo Calendar, no need to modify
    queryParams.append('recur', recurrenceRule);
  }

  // Return the full URL
  return `${baseUrl}&${queryParams.toString()}`;
}

export function createAppleCalendarUrl(options) {
  const {
    title: eventTitle,
    startTime,
    endTime,
    description = '',
    location = '',
    timezone,
    recurrence: recurrenceRule,
    attendees = [],
  } = options;

  // Base URL for adding events to Apple Calendar
  const baseUrl = 'https://www.icloud.com/calendar/0/#';

  // Format dates to 'YYYY-MM-DDTHH:MM:SSZ' format
  const formatDateTime = (date) => {
    return new Date(date)
      .toISOString()
      .replace(/-|:|\.\d{3}/g, '')
      .replace(/(\d{8})T(\d{6})/, '$1T$2Z');
  };

  // Construct query parameters
  const queryParams = new URLSearchParams({
    v: '1',
    title: eventTitle,
    description: description,
    location: location,
    startDate: formatDateTime(startTime),
    endDate: formatDateTime(endTime),
  });

  // Add attendees if provided
  if (attendees.length > 0) {
    queryParams.append('addAttendees', attendees.join(','));
  }

  // Add timezone and recurrence rule if provided
  if (timezone) {
    queryParams.append('ctz', timezone);
  }

  if (recurrenceRule) {
    // Assuming recurrenceRule is in a format compatible with Apple Calendar, no need to modify
    queryParams.append('rrule', recurrenceRule);
  }

  // Return the full URL
  return `${baseUrl}&${queryParams.toString()}`;
}