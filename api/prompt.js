import moment from 'moment-timezone';
// ALWAYS .clone() to be immutable.

// ChatGPT must understand 'next Sunday' is relative to 'now' variable.
// Correct outputs in few-shot examples are programmatically infilled.
export const dates = {
  nextSunday10am: (now) => {
    const nextSun = moment(now)
      .clone()
      .add(1, 'weeks')
      .startOf('isoWeek')
      .add(6, 'days');
    return nextSun.hour(10).minute(0).second(0).millisecond(0);
  },
  tomorrowNoon: (now) => {
    const tomorrow = moment(now).clone().add(1, 'days');
    console.log(tomorrow);
    return tomorrow.hour(12).minute(0).second(0).millisecond(0);
  },
  tomorrow8pm: (now) => {
    const tomorrow = moment(now).clone().add(1, 'days');
    return tomorrow.hour(20).minute(0).second(0).millisecond(0);
  },
};

export const promptFewShot = (prompt, timezone) => {
  const now = moment(new Date()).tz(timezone); // now in client's timezone
  return `You are a world-class Calendar assistant.

It's currently ${now.format('D MMM YYYY, h:mmA')} in ${timezone}.

## Task

Translate your boss's natural language descriptions of calendar events into a JSON schema similar to the iCal spec.

## JSON Output Example
{
  title: String,
  startTime: ${now.format()},
  endTime: ${now.clone().add(1, 'hours').format()},
  location: "Conference Room 2A",
  description: "Weekly team meeting to discuss project updates.",
  guests: ["john@gmail.com", "sarah@gmail.com", "alex@gmail.com"],
  recurrence: "RRULE:FREQ=WEEKLY;BYDAY=MO;WKST=SU"
}

## Rules
- Guess the most appropriate \`startTime\` and \`endTime\` for the kind of event after now.
- Leave \`location\`, \`guests\`, and \`recurrence\` empty unless specified.
- Never invite \`guests\` unless full email given.
- \`recurrence\` strictly conforms to the full \`RRULE\` iCal spc.
- Give a short quirky \`description\`.

USER
Lunch with Tom tmw at the Galleria
ASSISTANT
{
  title: "Lunch with Tom",
  startTime: ${dates.tomorrowNoon(now).format()},
  endTime: ${dates
    .tomorrowNoon(now)
    .add(1, 'hours')
    .add(30, 'minutes')
    .format()},
  location: "The Galleria",
  description: "Lunch sesh with Tom 🌮"
}
USER
Evening standup with markuszhang8@gmail.com at 8-9:30 every weekday
ASSISTANT
{
  title: "Daily Standup with Markus Zhang",
  startTime: ${dates.tomorrow8pm(now).format()},
  endTime: ${dates
    .tomorrow8pm(now)
    .add(1, 'hours')
    .add(30, 'minutes')
    .format()},
  location: "Zoom meeting",
  description: "Standup for your daily standup 🕺",
  guests: ["markuszhang8@gmail.com"],
  recurrence: "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
}
USER
这周日早上买菜
ASSISTANT
{
  title: "买菜",
  startTime: ${dates.nextSunday10am(now).format()},
  endTime: ${dates.nextSunday10am(now).add(1, 'hours').format()},
  location: "市场",
  description: "快快去市场买菜 🌽",
}
USER
${prompt}
ASSISTANT`;
};

// console.log(
//   promptFewShot(
//     'Uber ride tmw morning.',
//     'America/Los_Angeles' // Intl.DateTimeFormat().resolvedOptions().timeZone
//   )
// );
