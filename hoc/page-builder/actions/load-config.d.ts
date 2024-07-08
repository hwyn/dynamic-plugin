import type { BuilderProps } from '@hwy-fm/builder';
import { BaseAction } from '@hwy-fm/builder';
export declare class LoadConfig extends BaseAction {
    protected execute({ id, ...pageProps }: BuilderProps, { props, Model }: any): any[];
}
