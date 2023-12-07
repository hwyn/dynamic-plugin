import type { BuilderField, BuilderModelExtensions, BuilderProps } from '@dynamic/builder';
import { Injector } from '@fm/di';
import { ElementProps } from '../builder/type-api';
type BuilderUUID = {
    uuid: string;
};
export declare class DynamicManage {
    private injector;
    private builderCache;
    constructor(injector: Injector);
    private formControl;
    getForceUpdate(detectChanges: (uuid: string) => any): () => void;
    getElementProps<T extends ElementProps>(builderField: BuilderField): T;
    getBuilderUUID(): BuilderUUID;
    private addFieldUUID;
    factory(uuid: BuilderUUID, props: BuilderProps): BuilderModelExtensions;
    getBuilder(uuid: BuilderUUID): BuilderModelExtensions;
    deleteBuilder(uuid: BuilderUUID): void;
}
export {};
