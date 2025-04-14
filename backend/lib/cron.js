import cron from "cron";
import http from "http";

const job = new cron.CronJob("*/14 * * * * *", function () {
  const timestamp = new Date().toISOString();
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    console.error(`[${timestamp}] API_URL is not defined in the environment variables.`);
    return;
  }

  console.log(`[${timestamp}] Sending GET request to ${apiUrl}`);

  http
    .get(apiUrl, (res) => {
      if (res.statusCode === 200) 
        console.log(`[${timestamp}] GET request sent successfully`);
      else 
        console.log(`[${timestamp}] GET request failed`, res.statusCode);
    })
    .on("error", (e) => console.error(`[${timestamp}] Error while sending request`, e));
});

export default job;
