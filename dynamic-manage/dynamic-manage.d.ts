import { Injector } from '@fm/di';
import type { BuilderField, BuilderModelExtensions, BuilderProps } from '@dynamic/builder';
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
    factory(uuid: BuilderUUID, props: BuilderProps): BuilderModelExtensions;
    getBuilder(uuid: BuilderUUID): BuilderModelExtensions;
    deleteBuilder(uuid: BuilderUUID): void;
}
export {};
