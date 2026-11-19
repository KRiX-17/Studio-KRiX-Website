import type { ArtistLiveEvent } from "@/data/live-events";

export function currentInstant(): Date {
  return new Date();
}

export function sydneyDate(now: Date): string {
  const pieces = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const bits = Object.fromEntries(pieces.map(({ type, value }) => [type, value]));
  return `${bits.year}-${bits.month}-${bits.day}`;
}

export function groupArtistEvents(
  events: readonly ArtistLiveEvent[],
  now: Date,
): { upcoming: ArtistLiveEvent[]; past: ArtistLiveEvent[] } {
  const today = sydneyDate(now);
  const upcoming: ArtistLiveEvent[] = [];
  const past: ArtistLiveEvent[] = [];
  for (const event of events) {
    // A verified finishing time keeps overnight club nights upcoming until the event ends.
    const upcomingEvent = event.endsAt
      ? new Date(event.endsAt).getTime() > now.getTime()
      : event.date >= today;
    (upcomingEvent ? upcoming : past).push(event);
  }
  return {
    upcoming: upcoming.sort((a, b) => a.date.localeCompare(b.date)),
    past: past.sort((a, b) => b.date.localeCompare(a.date)),
  };
}
