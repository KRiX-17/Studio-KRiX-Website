import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/components/json-ld";

describe("JSON-LD serialisation", () => {
  it("escapes characters that could terminate the script element", () => {
    const serialised = serializeJsonLd({ value: "</script><script>alert(1)</script>" });

    expect(serialised).not.toContain("<");
    expect(JSON.parse(serialised)).toEqual({
      value: "</script><script>alert(1)</script>",
    });
  });
});
