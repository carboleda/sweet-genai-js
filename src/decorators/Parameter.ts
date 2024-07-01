import "reflect-metadata";
export const parameterMetadataKey = Symbol("parameter");

export enum ParameterType {
  ARRAY = "ARRAY",
  INTEGER = "INTEGER",
  NUMBER = "NUMBER",
  OBJECT = "OBJECT",
  STRING = "STRING",
}

interface ParameterProps {
  name: string;
  description?: string;
  type?: ParameterType;
}

export function Parameter({
  name,
  description = "",
  type = ParameterType.STRING,
}: ParameterProps) {
  return function (
    target: any,
    methodName: string | symbol,
    parameterIndex: number
  ) {
    const existingParameters: any =
      Reflect.getOwnMetadata(parameterMetadataKey, target, methodName) || {};

    existingParameters[name] = {
      index: parameterIndex,
      type: type,
      description,
    };
    Reflect.defineMetadata(
      parameterMetadataKey,
      existingParameters,
      target,
      methodName
    );
    // console.log('existingParameters', methodName, existingParameters);
  };
}
