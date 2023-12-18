import type { BuilderProps } from '@dynamic/builder';
import { BaseAction } from '@dynamic/builder';
export declare class LoadConfig extends BaseAction {
    protected execute({ id, ...pageProps }: BuilderProps, { props, Model }: any): any[];
}
