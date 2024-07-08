import { BuilderProps } from '@hwy-fm/builder';
export interface ComponentBuilderDecorator {
    (props: BuilderProps): ClassDecorator;
}
export declare const ComponentBuilder: ComponentBuilderDecorator;
