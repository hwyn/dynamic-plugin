import { Injector } from '@fm/di';
import { FormControl, InstanceExtensions } from '@dynamic/builder';
import { Observable } from 'rxjs';
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
