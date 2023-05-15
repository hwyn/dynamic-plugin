export interface MicroProps {
    instance: any;
    [key: string]: any;
}
export declare const forwardLoadingMicro: (microName: string) => (_props: import("@dynamic/builder").BuilderProps) => any;
