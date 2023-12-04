export class BuilderDef {
    constructor(BuilderModel, props) {
        this.BuilderModel = BuilderModel;
        Object.assign(this, props);
    }
}
BuilderDef.create = (Model, props) => new BuilderDef(Model, props);
