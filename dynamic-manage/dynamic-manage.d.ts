import { Injector } from '@fm/di';
import type { BuilderField, BuilderProps } from '@dynamic/builder';
import { BuilderModel } from '@dynamic/builder';
import { ElementProps } from '../builder/type-api';
type BuilderUUID = {
    uuid: string;
};
export declare class DynamicManage {
    private injector;
    private builderCache;
    constructor(injector: Injector);
    private formControl;
    private getJsonConfig;
    getForceUpdate(detectChanges: (uuid: string) => any): () => void;
    getElementProps<T extends ElementProps>(builderField: BuilderField): T;
    getBuilderUUID(): BuilderUUID;
    factory(uuid: BuilderUUID, props: BuilderProps): BuilderModel;
    getBuilder(uuid: BuilderUUID): BuilderModel;
    deleteBuilder(uuid: BuilderUUID): void;
}
export {};
