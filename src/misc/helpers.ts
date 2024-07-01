import { ToolDeclaration } from "@/decorators";

export function getToolDeclaration<T>(
  tool: T,
  plain: boolean = true
): any | undefined {
  const _tool = tool as ToolDeclaration;
  const metadata = { ..._tool.metadata };

  if (!plain) {
    metadata.functionDeclarations = metadata.functionDeclarations.map(
      (functionDeclaration: { name: string }) => {
        functionDeclaration.name = `${_tool.metadata.name}.${functionDeclaration.name}`;
        return functionDeclaration;
      }
    );
    return metadata;
  }

  metadata.functionDeclarations = metadata.functionDeclarations.map(
    (functionDeclaration: { name: string; fn: any; parameters: any }) => {
      functionDeclaration.name = `${_tool.metadata.name}.${functionDeclaration.name}`;
      functionDeclaration.parameters.properties = Object.keys(
        functionDeclaration.parameters.properties
      ).reduce((props: any, key: any) => {
        const prop = functionDeclaration.parameters.properties[key];
        delete prop.index;
        return { ...props, [key]: prop };
      }, {});

      delete functionDeclaration.fn;

      return functionDeclaration;
    }
  );

  return metadata;
}
