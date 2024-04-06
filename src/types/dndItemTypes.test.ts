import {dndItemTypes} from "./dndItemTypes";

describe("dndItemTypes", () => {
  test("Export BLOCK type correctly", () => {
    expect(dndItemTypes.BLOCK).toEqual("block");
  });
});