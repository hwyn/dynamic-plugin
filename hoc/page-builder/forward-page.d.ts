import { BuilderProps } from '@hwy-fm/builder';
import { Type } from '@hwy-fm/di';
export interface PageProps extends BuilderProps {
    [key: string]: any;
    loading?: boolean;
    pageClassName?: string;
}
export declare function forwardPage<T>(Model: Type<T>, { pageClassName, ...props }: PageProps): Type<T>;
export interface PageBuilderDecorator {
    (props: PageProps): ClassDecorator;
}
export declare const PageBuilder: PageBuilderDecorator;
