export interface MicroProps {
    instance: any;
    [key: string]: any;
}
export declare const forwardLoadingMicro: (microName: string) => import("../forward-builder/builder-def").BuilderDef<any> | ((_props: import("@dynamic/builder").BuilderProps) => any);
