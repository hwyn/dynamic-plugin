"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderDef = void 0;
var BuilderDef = /** @class */ (function () {
    function BuilderDef(BuilderModel, props) {
        this.BuilderModel = BuilderModel;
        Object.assign(this, props);
    }
    BuilderDef.create = function (Model, props) { return new BuilderDef(Model, props); };
    return BuilderDef;
}());
exports.BuilderDef = BuilderDef;
