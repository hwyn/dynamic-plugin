import { BuilderModel, BuilderProps } from '@hwy-fm/builder';
import { Type } from '@hwy-fm/di';
export declare class BuilderDef<M extends BuilderModel> {
    BuilderModel: Type<M>;
    static create: (Model: Type, props: BuilderProps) => BuilderDef<any>;
    constructor(BuilderModel: Type<M>, props: BuilderProps);
}
