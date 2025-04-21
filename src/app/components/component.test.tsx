/**
 * RENDER HOOK EXAMPLE
 */
import { useMutation } from "urql";
import { act, renderHook } from "@testing-library/react";

// Mock the useMutation hook
jest.mock("urql", () => ({
  useMutation: jest.fn(),
}));

// Define the GraphQL mutation
const TEST_MUTATION = `
  mutation UpdateData($id: ID!, $value: String!) {
    updateData(id: $id, value: $value) {
      id
      value
    }
  }
`;

// Test the component or hook using useMutation
describe("Component/Hook using useMutation", () => {
  it("should call the mutation and handle the result", async () => {
    // Mock the mutation result
    const mockExecuteMutation = jest.fn().mockResolvedValue({
      data: {
        updateData: {
          id: "1",
          value: "New Value",
        },
      },
    });

    // Mock useMutation to return the mock execution function
    (useMutation as jest.Mock).mockReturnValue([
      {
        data: {},
        fetching: false,
        error: undefined,
      },
      mockExecuteMutation,
    ]);

    // Render the component or hook
    const { result } = renderHook(() => {
      const [state, executeMutation] = useMutation(TEST_MUTATION);
      return { state, executeMutation };
    });

    // Call the mutation
    await act(async () => {
      await result.current.executeMutation({ id: "1", value: "New Value" });
    });

    // Assertions
    expect(mockExecuteMutation).toHaveBeenCalledTimes(1);
    expect(mockExecuteMutation).toHaveBeenCalledWith({
      id: "1",
      value: "New Value",
    });
    expect(result.current.state.data).toEqual({});
  });
});
