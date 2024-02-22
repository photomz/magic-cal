# Magic Cal Backend

This is an ExpressJS server with boilerplate code for OpenAI APIs, deployed on Render.

**Usage:**

First, add your OPENAI_API_KEY to .env or your secrets manager.

Then, start the server:

```bash
pnpm install
pnpm start
```

You will then have access to a number of endpoints:

**Text generation endpoint:**

```bash
% curl "http://localhost:10000/link?prompt=panda+pizza+party+at+midnight"
{
  "title": "Panda Pizza Party",
  "startTime": "2024-02-22T00:00:00-08:00",
  "endTime": "2024-02-22T01:00:00-08:00",
  "description": "Midnight pizza party with pandas 🐼🍕",
  "google_calendar_link": "http://www.google.com/calendar/render?action=TEMPLATE&text=Panda+Pizza+Party&dates=20240222T080000Z%2F20240222T090000Z&details=Midnight+pizza+party+with+pandas+%F0%9F%90%BC%F0%9F%8D%95&location=&trp=false&sprop=name%3A",
  ...
}
```
