import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("release publishing", () => {
  it("targets the fork's current-version branch without publishing", () => {
    const script = fileURLToPath(
      new URL("../../scripts/publish-release.mjs", import.meta.url),
    );
    const command = execFileSync(process.execPath, [script, "--dry-run"], {
      encoding: "utf8",
    });

    expect(command).toContain("--repo andreslfdz/openseo");
    expect(command).toContain("--target openseo-rename");
    expect(command).toMatch(/^gh release create v\d+\.\d+\.\d+ /);
  });
});
