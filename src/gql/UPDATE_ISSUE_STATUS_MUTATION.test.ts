import { UPDATE_ISSUE_STATUS_MUTATION } from "./UPDATE_ISSUE_STATUS_MUTATION";

describe("UPDATE_ISSUE_STATUS_MUTATION", () => {
  it("should be a defined object", () => {
    expect(UPDATE_ISSUE_STATUS_MUTATION).toBeDefined();
  });

  it("should have the correct kind", () => {
    expect(UPDATE_ISSUE_STATUS_MUTATION.kind).toBe("Document");
  });
});
