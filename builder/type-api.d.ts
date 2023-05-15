import { Injector } from '@fm/di';
import { FormControl as FormControlIml, InstanceExtensions, ValidationErrors } from '@dynamic/builder';
import { Observable } from 'rxjs';
type FormControl = FormControlIml & {
    touched: boolean;
    errors: ValidationErrors | null;
    invalid: boolean;
    disabled: boolean;
};
export interface ElementProps {
    id: string;
    builderuuid: {
        uuid: string;
    };
    className?: string;
    source?: any;
    injector: Injector;
    control?: FormControl;
    instance: InstanceExtensions;
    container?: HTMLElement;
    style?: {
        [key: string]: string;
    };
    events?: {
        [key: string]: (params?: any) => Observable<any>;
    };
}
export {};
