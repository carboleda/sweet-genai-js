import "reflect-metadata";
import { ParameterType, parameterMetadataKey } from "./Parameter";

export const toolFunctionMetadataKey = Symbol("toolFunction");

export function ToolFunction(description?: string) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const existingFunctions: any[] =
      Reflect.getOwnMetadata(
        toolFunctionMetadataKey,
        target,
        target.prototype
      ) || [];
    const existingParameters: any =
      Reflect.getOwnMetadata(parameterMetadataKey, target, methodName) || {};

    existingFunctions.push({
      name: `${methodName}`,
      description,
      fn: target[methodName],
      parameters: {
        type: ParameterType.OBJECT,
        properties: existingParameters,
      },
    });
    // console.log('ToolFunction', target, methodName, existingFunctions);
    Reflect.defineMetadata(
      toolFunctionMetadataKey,
      existingFunctions,
      target,
      target.prototype
    );
  };
}
