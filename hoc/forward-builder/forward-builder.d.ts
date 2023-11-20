import { BuilderModel, BuilderProps } from '@dynamic/builder';
import { Type } from '@fm/di';
export type forwardBuilderTemplate = <T extends BuilderModel, M extends BuilderProps>(Model: Type<T>, props: M) => (_props: BuilderProps) => any;
export declare const forwardBuilder: <T extends BuilderModel, M extends BuilderProps>(Model: Type<T>, props: M) => (_props: BuilderProps) => any;
export declare const setComponentDef: <T>(Model: Type<T>, props: BuilderProps) => Type<T>;
export declare const getComponentDef: <T>(Model: Type<T>) => any;
