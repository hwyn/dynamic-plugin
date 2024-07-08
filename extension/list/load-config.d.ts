import { BaseAction } from '@hwy-fm/builder';
export declare class LoadConfig extends BaseAction {
    protected execute({ grid, jsonField }: any, source?: any[]): {
        grid: any;
        fields: any[];
    };
}
