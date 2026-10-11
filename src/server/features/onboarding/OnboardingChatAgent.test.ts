import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

vi.mock("cloudflare:workers", () => ({ DurableObject: class {} }));

import { OnboardingChatAgent } from "./OnboardingChatAgent";

describe("retained onboarding conversations", () => {
  it("does not access stored conversations on initialization", () => {
    const state = {
      get storage() {
        throw new Error("Existing storage must remain untouched");
      },
    };
    expect(() =>
      Reflect.construct(OnboardingChatAgent, [state, {}]),
    ).not.toThrow();
  });

  it("keeps the deployed class binding and does not delete its namespace", () => {
    const config = readFileSync("wrangler.jsonc", "utf8");
    expect(config).toMatch(
      /"name": "ONBOARDING_CHAT",\s*"class_name": "OnboardingChatAgent"/,
    );
    expect(config).not.toMatch(
      /"deleted_classes":\s*\["OnboardingChatAgent"\]/,
    );
    expect(readFileSync("src/server.ts", "utf8")).toContain(
      "export { OnboardingChatAgent }",
    );
  });
});
