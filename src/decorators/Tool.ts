import { toolFunctionMetadataKey } from "./ToolFunction";

export interface ToolDeclaration {
  metadata: any;
}
export function Tool() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements ToolDeclaration {
      metadata = {
        name: constructor.name,
        functionDeclarations: Reflect.getMetadata(
          toolFunctionMetadataKey,
          constructor.prototype
        ),
      };
    };
  };
}
