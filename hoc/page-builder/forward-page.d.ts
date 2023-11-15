import { BuilderProps } from '@dynamic/builder';
import { Type } from '@fm/di';
export interface PageProps extends BuilderProps {
    [key: string]: any;
    loading?: boolean;
    pageClassName?: string;
}
export declare function forwardPage<T>(Model: Type<T>, { pageClassName, ...props }: PageProps): (_props: BuilderProps) => any;
export interface PageBuilderDecorator {
    (props: PageProps): <T>(type: Type<T>) => any;
}
export declare const PageBuilder: PageBuilderDecorator;
