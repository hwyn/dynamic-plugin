import { Type } from '@fm/di';
import { BuilderProps } from '@dynamic/builder';
export interface PageProps extends BuilderProps {
    [key: string]: any;
    pageClassName?: string;
}
export declare function forwardPage<T>(Model: Type<T>, { pageClassName, ...props }: PageProps): (_props: BuilderProps) => any;
export interface PageBuilderDecorator {
    (props: PageProps): <T>(type: Type<T>) => any;
}
export declare const PageBuilder: PageBuilderDecorator;
