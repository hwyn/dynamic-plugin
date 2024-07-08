import { __assign, __decorate, __extends } from "tslib";
import { BasicExtension, CALCULATOR, LOAD } from '@hwy-fm/builder';
import { isString } from 'lodash';
import { Extension } from '../../builder/builder-context';
import { Bind } from './bind.action';
var AttributeExtension = /** @class */ (function (_super) {
    __extends(AttributeExtension, _super);
    function AttributeExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inherent = ['layout'];
        return _this;
    }
    AttributeExtension.prototype.extension = function () {
        var _this = this;
        this.eachFields(this.jsonFields, function (_a) {
            var jsonField = _a[0], builderField = _a[1];
            Object.keys(builderField.field).forEach(function (key) {
                if (/^#(.+)/ig.test(key))
                    _this.addCalculator(key, jsonField, builderField);
            });
        });
    };
    AttributeExtension.prototype.addCalculator = function (key, jsonField, builderField) {
        var defaultDependents = { type: LOAD, fieldId: this.builder.id };
        var calculator = this.serializeCalculatorConfig(jsonField[key], CALCULATOR, defaultDependents);
        var action = calculator.action, name = calculator.action.name;
        var _a = isString(name) ? name.replace(/([^\\.]+)[\\.]?(.*)/, '$1θ$2').split('θ') : [name], actionName = _a[0], bindAttr = _a[1];
        if (actionName === Bind.actionName) {
            action.name = actionName;
            action.params = __assign(__assign({ ignoreBuilder: true }, action.params), { bindAttr: bindAttr });
        }
        action.after = this.bindCalculatorAction(this.updateAttr.bind(this, key));
        this.pushCalculators(jsonField, calculator);
        delete builderField.field[key];
    };
    AttributeExtension.prototype.updateAttr = function (key, _a) {
        var builderField = _a.builderField, actionEvent = _a.actionEvent, instance = _a.instance;
        var _key = key.replace(/^#([\w\d]+)/ig, '$1');
        if (this.inherent.includes(_key)) {
            if (actionEvent !== builderField[key]) {
                this.defineProperty(builderField, _key, actionEvent);
                this.builder.detectChanges();
            }
        }
        else if (actionEvent !== builderField.field[_key]) {
            builderField.field[_key] = actionEvent;
            instance.detectChanges();
        }
    };
    AttributeExtension = __decorate([
        Extension()
    ], AttributeExtension);
    return AttributeExtension;
}(BasicExtension));
export { AttributeExtension };
