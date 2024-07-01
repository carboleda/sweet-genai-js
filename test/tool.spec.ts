import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import { Parameter, ParameterType, Tool, ToolFunction } from "@/decorators";
import { getToolDeclaration } from "@/misc/helpers";

@Tool()
class BugReport {
  @ToolFunction("Create a bug report")
  print(
    @Parameter({
      name: "verbose",
      description: "Print verbosely",
      type: ParameterType.STRING,
    })
    verbose: boolean
  ) {}

  @ToolFunction("Second function")
  second(
    @Parameter({ name: "name", description: "Name" }) name: string,
    @Parameter({ name: "surname", description: "Surname" }) surname: string
  ) {}
}

describe("Tool", () => {
  it("should properly generate the function declarations for Gemini", () => {
    const br = new BugReport();
    const jsonObj = getToolDeclaration(br);

    deepEqual(jsonObj, {
      name: "BugReport",
      functionDeclarations: [
        {
          name: "BugReport.print",
          description: "Create a bug report",
          parameters: {
            type: "OBJECT",
            properties: {
              verbose: {
                type: "STRING",
                description: "Print verbosely",
              },
            },
          },
        },
        {
          name: "BugReport.second",
          description: "Second function",
          parameters: {
            type: "OBJECT",
            properties: {
              surname: {
                type: "STRING",
                description: "Surname",
              },
              name: {
                type: "STRING",
                description: "Name",
              },
            },
          },
        },
      ],
    });
  });
});
