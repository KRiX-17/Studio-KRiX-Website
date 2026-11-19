import { describe, expect, it } from "vitest";
import { artistLiveEvents } from "@/data/live-events";
import { groupArtistEvents, sydneyDate } from "@/lib/artist-events";

describe("Sydney live-event chronology", () => {
  it("uses the Australia/Sydney date rather than UTC", () => {
    expect(sydneyDate(new Date("2026-11-20T13:30:00Z"))).toBe("2026-11-21");
  });
  it("keeps an overnight show upcoming until its finishing time", () => {
    const grouped = groupArtistEvents(
      artistLiveEvents,
      new Date("2026-11-20T14:30:00Z"),
    );
    expect(grouped.upcoming.some((e) => e.id === "monde-soniq-one-year-2026")).toBe(true);
  });
  it("archives an overnight show after its finishing time", () => {
    const grouped = groupArtistEvents(
      artistLiveEvents,
      new Date("2026-11-20T17:01:00Z"),
    );
    expect(grouped.past.some((e) => e.id === "monde-soniq-one-year-2026")).toBe(true);
  });
  it("sorts previous appearances latest first", () => {
    const grouped = groupArtistEvents(
      artistLiveEvents,
      new Date("2027-01-01T00:00:00Z"),
    );
    expect(grouped.upcoming).toHaveLength(0);
    expect(grouped.past[0]?.id).toBe("monde-soniq-one-year-2026");
  });
});
