import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  comparisonAsOf,
  comparisonColumns,
  comparisonDisclaimer,
  comparisonRows,
} from "../src/lib/comparison-data.ts";

/**
 * The comparison table is comparative advertising (prowl LEGAL-004): every row
 * must line up with the column headers, every cell must be a concrete statement,
 * competitors must be named accurately, and the disclaimer must date the claims
 * and disown any affiliation.
 */
describe("comparison-data", () => {
  it("has Prowl in the first column and named competitors after it", () => {
    assert.equal(comparisonColumns[0], "Prowl");
    assert.deepEqual(comparisonColumns.slice(1), ["Maestro", "Playwright", "XCUITest"]);
  });

  it("gives every row exactly one non-empty cell per column", () => {
    assert.ok(comparisonRows.length > 0);
    for (const row of comparisonRows) {
      assert.ok(row.label.trim().length > 0, "row label is set");
      assert.equal(row.cells.length, comparisonColumns.length, `${row.label} cell count`);
      for (const cell of row.cells) {
        assert.ok(cell.trim().length > 0, `${row.label} has an empty cell`);
      }
    }
  });

  it("uses factual capability wording rather than disparaging language", () => {
    const banned = /\b(worse|inferior|broken|slow|clunky|bloated|outdated|only\s+prowl)\b/i;
    for (const row of comparisonRows) {
      for (const cell of row.cells) {
        assert.doesNotMatch(cell, banned, `${row.label}: "${cell}"`);
      }
    }
  });

  it("keeps the experimental caveat on Prowl's mobile claim", () => {
    const mobile = comparisonRows.find((row) => row.label === "Native mobile apps");
    assert.ok(mobile, "mobile row exists");
    assert.match(mobile.cells[0], /experimental/i);
  });

  it("dates the claims and names every competitor in the disclaimer", () => {
    assert.ok(comparisonDisclaimer.includes(comparisonAsOf));
    for (const competitor of comparisonColumns.slice(1)) {
      assert.ok(comparisonDisclaimer.includes(competitor), `disclaimer names ${competitor}`);
    }
    assert.match(comparisonDisclaimer, /not affiliated/i);
    assert.match(comparisonDisclaimer, /trademarks/i);
  });
});
