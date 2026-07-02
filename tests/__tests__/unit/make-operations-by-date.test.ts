import { describe, expect, test } from "vitest";

import { makeOperationsByDate } from "../../../main/core/make-operations-by-date.js";
import type { Operation } from "../../../main/core/types/Operation.js";

const makeOperation = ({
  at,
  operationID,
}: {
  at: string;
  operationID: string;
}): Operation => ({
  account: { accountID: "account-1", name: "Account 1" },
  accountID: "account-1",
  amount: 100,
  amountPerUnit: 100,
  at,
  atTimezone: "UTC",
  category: {
    categoryID: "category-1",
    group: { groupID: "group-1", name: "Group 1" },
    name: "Category 1",
  },
  categoryID: "category-1",
  comments: "",
  confirmed: true,
  createdAt: at,
  deleted: false,
  operationID,
  tags: {},
  type: "Expense",
  unitCount: 1,
  updatedAt: null,
  userID: "user-1",
});

describe("grouping operations by date", () => {
  test("keeps already-descending dates in the same order", () => {
    // given
    const operations = [
      makeOperation({ at: "2026-07-05T10:00:00.000Z", operationID: "3" }),
      makeOperation({ at: "2026-07-03T10:00:00.000Z", operationID: "2" }),
      makeOperation({ at: "2026-07-01T10:00:00.000Z", operationID: "1" }),
    ];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result.map(([date]) => date)).toEqual([
      "2026-07-05",
      "2026-07-03",
      "2026-07-01",
    ]);
  });

  test("inserts a new date between two existing dates in chronological order", () => {
    // given
    const operations = [
      makeOperation({ at: "2026-07-05T10:00:00.000Z", operationID: "1" }),
      makeOperation({ at: "2026-07-01T10:00:00.000Z", operationID: "2" }),
      // simulates a newly created operation pushed to the end of the flat list
      makeOperation({ at: "2026-07-03T10:00:00.000Z", operationID: "3" }),
    ];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result.map(([date]) => date)).toEqual([
      "2026-07-05",
      "2026-07-03",
      "2026-07-01",
    ]);
  });

  test("inserts a new date before the earliest existing date", () => {
    // given
    const operations = [
      makeOperation({ at: "2026-07-05T10:00:00.000Z", operationID: "1" }),
      makeOperation({ at: "2026-07-03T10:00:00.000Z", operationID: "2" }),
      makeOperation({ at: "2026-07-01T10:00:00.000Z", operationID: "3" }),
    ];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result.map(([date]) => date)).toEqual([
      "2026-07-05",
      "2026-07-03",
      "2026-07-01",
    ]);
  });

  test("inserts a new date after the latest existing date", () => {
    // given
    const operations = [
      makeOperation({ at: "2026-07-03T10:00:00.000Z", operationID: "1" }),
      makeOperation({ at: "2026-07-01T10:00:00.000Z", operationID: "2" }),
      // simulates a newly created operation on a date newer than all others
      makeOperation({ at: "2026-07-05T10:00:00.000Z", operationID: "3" }),
    ];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result.map(([date]) => date)).toEqual([
      "2026-07-05",
      "2026-07-03",
      "2026-07-01",
    ]);
  });

  test("sorts dates correctly across a month/year boundary", () => {
    // given
    const operations = [
      makeOperation({ at: "2026-01-01T10:00:00.000Z", operationID: "1" }),
      makeOperation({ at: "2025-12-31T10:00:00.000Z", operationID: "2" }),
    ];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result.map(([date]) => date)).toEqual(["2026-01-01", "2025-12-31"]);
  });

  test("groups multiple operations on the same date and sorts them descending by time", () => {
    // given
    const operations = [
      makeOperation({ at: "2026-07-01T08:00:00.000Z", operationID: "1" }),
      makeOperation({ at: "2026-07-01T20:00:00.000Z", operationID: "2" }),
      makeOperation({ at: "2026-07-01T14:00:00.000Z", operationID: "3" }),
    ];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result).toHaveLength(1);
    expect(result[0]?.[1].map((operation) => operation.operationID)).toEqual([
      "2",
      "3",
      "1",
    ]);
  });

  test("returns an empty array for an empty operation list", () => {
    // given
    const operations: Operation[] = [];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result).toEqual([]);
  });

  test("returns a single group for a single operation", () => {
    // given
    const operations = [
      makeOperation({ at: "2026-07-01T10:00:00.000Z", operationID: "1" }),
    ];

    // when
    const result = makeOperationsByDate({ operations });

    // then
    expect(result).toEqual([["2026-07-01", [operations[0]]]]);
  });
});
