import { Additional, BuilderFieldExtensions } from '@hwy-fm/builder';
export interface RenderPropsModel {
    fields?: BuilderFieldExtensions[];
    className?: string;
    additional?: Additional;
    events?: {
        [key: string]: any;
    };
    style?: {
        [key: string]: string;
    };
}
export interface RenderElementProps {
    field: BuilderFieldExtensions;
}
