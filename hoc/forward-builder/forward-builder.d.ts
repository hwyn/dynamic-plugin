import { BuilderModel, BuilderProps } from '@hwy-fm/builder';
import { Type, TypeClass } from '@hwy-fm/di';
import { BuilderDef } from './builder-def';
export type forwardBuilderTemplate = <T extends BuilderModel, M extends BuilderProps>(Model: Type<T>, props: M) => (_props: BuilderProps) => any;
export declare const forwardBuilder: <T extends BuilderModel, M extends BuilderProps>(Model: Type<T>, props: M) => BuilderDef<any> | ((_props: BuilderProps) => any);
export declare const setComponentDef: <T>(Model: Type<T>, props: BuilderProps) => Type<T>;
export declare const getComponentDef: <T>(Model: TypeClass<T>) => any;
