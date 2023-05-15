import { Additional, BuilderFieldExtensions } from '@dynamic/builder';
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
