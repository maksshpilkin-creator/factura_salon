import 'dotenv/config';
import Firecrawl from '@mendable/firecrawl-js';

const apiKey = process.env.FIRECRAWL_API_KEY;
if (!apiKey) {
  throw new Error('FIRECRAWL_API_KEY is not set');
}

const app = new Firecrawl({ apiKey });

async function run() {
  const result = await app.scrape('https://firecrawl.dev', {
    formats: ['markdown'], // можно 'html', 'screenshot' и т.д.
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);