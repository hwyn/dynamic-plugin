import { BuilderProps } from '@dynamic/builder';
import { Type } from '@fm/di';
export interface ComponentBuilderDecorator {
    (props: BuilderProps): <T>(type: Type<T>) => Type<T>;
}
export declare const ComponentBuilder: ComponentBuilderDecorator;
