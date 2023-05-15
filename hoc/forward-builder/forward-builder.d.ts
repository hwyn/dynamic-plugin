import { Type } from '@fm/di';
import { BuilderModel, BuilderProps } from '@dynamic/builder';
export type forwardBuilderTemplate = <T extends BuilderModel, M extends BuilderProps>(Model: Type<T>, props: M) => (_props: BuilderProps) => any;
export interface ComponentBuilderDecorator {
    (props: BuilderProps): <T>(type: Type<T>) => any;
}
export declare const forwardBuilder: <T extends BuilderModel, M extends BuilderProps>(Model: Type<T>, props: M) => (_props: BuilderProps) => any;
export declare const ComponentBuilder: ComponentBuilderDecorator;
