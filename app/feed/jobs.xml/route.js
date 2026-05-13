import { jobs } from "../../data/jobs";
import {
  buildRss,
  staggeredDate,
  rssResponse,
} from "../../data/feedBuilder";

const SITE_URL = "https://www.safecompanion.in";

export function GET() {
  const items = jobs.map((j) => ({
    title: j.title,
    link: `${SITE_URL}/join/${j.slug}`,
    description: j.intro,
    content: `${j.intro}\n\nRole: ${j.role}\nEarnings: ${j.earnings}\nMonthly Income: ${j.monthly}`,
    pubDate: staggeredDate(`job-${j.slug}`, 30),
    category: j.role,
  }));

  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const xml = buildRss({
    title: "Safe Companion India — Job Openings",
    description:
      "Open positions: gigolo job, playboy job, callboy job, male escort job — 100% free registration, transparent earnings, 40+ Indian cities.",
    selfPath: "/feed/jobs.xml",
    items,
    category: "Jobs",
  });

  return rssResponse(xml);
}
