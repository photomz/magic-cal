import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

import {
  createGoogleCalendarUrl,
  createAppleCalendarUrl,
  createOutlookCalendarUrl,
  createYahooCalendarUrl,
} from '../utils/links.js';

import { promptFewShot } from '../utils/prompt.js';

// This endpoint generates text from a prompt.
// See documentation: https://platform.openai.com/docs/api-reference/chat/create

// The following settings are used:
const MODEL = 'gpt-3.5-turbo-0125';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function textEndpoint(req, res) {
  try {
    const { prompt, now } = req.query;
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: promptFewShot(prompt, now),
        },
      ],
      response_format: { type: 'json_object' },
    });
    // Parse output as JSON
    const output = JSON.parse(completion.choices[0].message.content);
    res.json({
      ...output,
      google_calendar_link: createGoogleCalendarUrl(output),
      apple_calendar_link: createAppleCalendarUrl(output),
      outlook_calendar_link: createOutlookCalendarUrl(output),
      yahoo_calendar_link: createYahooCalendarUrl(output),
    });
  } catch (error) {
    // Handle errors:
    console.error(error.message);
    res.status(500).send(error.message);
  }
}
