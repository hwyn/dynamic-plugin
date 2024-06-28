import { BuilderProps } from '@dynamic/builder';
export interface ComponentBuilderDecorator {
    (props: BuilderProps): ClassDecorator;
}
export declare const ComponentBuilder: ComponentBuilderDecorator;
