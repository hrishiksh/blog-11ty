---
title: Schedule Cloudflare Worker using Cron Triggers
description: You can use cron triggers to schedule Cloudflare Worker. Define your cron triggers with specific notation and Cloudflare will handle the rest. You can see the logs and upcoming jobs in your workers log tab.
date: 2023-07-01
related:
  - read-notion-database-api
  - fetch-google-fonts-api
  - convert-svg-png-browser
---

Cloudflare Workers are an excellent way to run serverless functions at the edge of the network. They run on a custom V8 engine, which gives them exceptional cold start times. (For more information, see ["Eliminating Cold Starts with Cloudflare Workers"](https://blog.cloudflare.com/eliminating-cold-starts-with-cloudflare-workers).) In addition to being responsive to standard HTTP requests, Cloudflare Workers can be scheduled using cron triggers.

## Define Cron Triggers in Cloudflare worker

Open your `wrangler.toml` file in your Cloudflare Worker project. If you are new to Cloudflare Worker development, you can read this blog on [how to set up a Cloudflare project using Miniflare](https://hrishikeshpathak.com/blog/cloudflare-worker-local-setup-miniflare-wrangler/).

Cloudflare cron trigger expressions contain 5 fields. This is the pattern you should follow to define a cron trigger.

```
*     *     *     *     *
-     -     -     -     -
|     |     |     |     |
|     |     |     |     +----- day of the week (1 - 7) (“MON”, “fri”)
|     |     |     +------- Months 1-12, or (“JAN”, “aug”)
|     |     +--------- day of the month (1 - 31)
|     +----------- hour (0 - 23)
+------------- min (0 - 59)
```

For example, if you want your function to run every day at 2:30 AM, you would use the following cron expression:

```
30 2 * * *
```

For more examples like this, visit the [Cloudflare Worker documentation page](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/).

Once you have decided on your cron trigger expression, add these expressions as an array in the `wrangler.toml` file.

```toml:wrangler.toml

[triggers]
crons = ["0 3 * * *","0 14 * * *"]
```

After deploying this worker, it will execute at 3 and 14 hours GMT.

## Scheduled Cloudflare Worker

The syntax of a scheduled Cloudflare Worker is different. The Worker script listens for the `scheduled` event and then handles the event accordingly.

```js
addEventListener("scheduled", (event) => {
  event.waitUntil(handleCron(event));
});

async function handleCron(event){
	console.log("Scheduled worker executed")
}
```

You can now perform any background tasks, such as updating your database or fetching from an API, within the `handleCron` function.

## Testing Cron Triggers Locally using Wrangler

First, install the Wrangler package from NPM in your Cloudflare project.

```bash
npm i wrangler
```

Now run the `npx wrangler dev -test-scheduled` command to run your scheduled worker. This command creates a `/__scheduled` route, which can be used to test the worker using an HTTP request.

## Viewing Logs and Upcoming Jobs

Once you have scheduled your Cloudflare Worker using a cron trigger, you can view the logs in the Workers **log** tab. This will allow you to see any errors or other information related to the execution of your function. You can find the upcoming job inside the **triggers** tab.

**Important:** Scheduled Workers are triggered in GMT time. Please adjust the time according to your timezone.