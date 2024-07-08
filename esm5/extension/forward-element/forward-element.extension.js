import { __decorate, __extends } from "tslib";
import { BasicExtension, BuilderEngine } from '@hwy-fm/builder';
import { Extension } from '../../builder/builder-context';
import { BUILDER } from '../../constst/ui-element.consts';
import { BuilderDef } from '../../hoc/forward-builder/builder-def';
import { getComponentDef } from '../../hoc/forward-builder/forward-builder';
var ELEMENT = 'element';
var ForwardElementExtension = /** @class */ (function (_super) {
    __extends(ForwardElementExtension, _super);
    function ForwardElementExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.engine = _this.injector.get(BuilderEngine);
        return _this;
    }
    ForwardElementExtension.prototype.extension = function () { };
    ForwardElementExtension.prototype.afterExtension = function () {
        this.eachFields(this.jsonFields, this.proxyElement.bind(this));
    };
    ForwardElementExtension.prototype.proxyElement = function (_a) {
        var _this = this;
        var builderField = _a[1];
        var _element = this.transform(builderField, builderField.element);
        Object.defineProperty(builderField, ELEMENT, {
            get: function () { return _element; },
            set: function (element) { return _element = _this.transform(builderField, element); }
        });
    };
    ForwardElementExtension.prototype.transform = function (builderField, element) {
        var _a;
        var _element = element ? (_a = getComponentDef(element)) !== null && _a !== void 0 ? _a : element : element;
        if (!(_element instanceof BuilderDef))
            return _element;
        var field = builderField.field;
        for (var key in _element) {
            if (!Object.hasOwn(field, key))
                field[key] = _element[key];
        }
        return this.engine.getUiComponent(BUILDER);
    };
    ForwardElementExtension.prototype.destroy = function () {
        var _this = this;
        this.eachFields(this.jsonFields, function (_a) {
            var builderField = _a[1];
            return _this.defineProperty(builderField, ELEMENT, null);
        });
    };
    ForwardElementExtension = __decorate([
        Extension()
    ], ForwardElementExtension);
    return ForwardElementExtension;
}(BasicExtension));
export { ForwardElementExtension };
