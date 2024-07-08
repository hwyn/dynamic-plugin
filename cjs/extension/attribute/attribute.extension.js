"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeExtension = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@hwy-fm/builder");
var lodash_1 = require("lodash");
var builder_context_1 = require("../../builder/builder-context");
var bind_action_1 = require("./bind.action");
var AttributeExtension = /** @class */ (function (_super) {
    tslib_1.__extends(AttributeExtension, _super);
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
        var defaultDependents = { type: builder_1.LOAD, fieldId: this.builder.id };
        var calculator = this.serializeCalculatorConfig(jsonField[key], builder_1.CALCULATOR, defaultDependents);
        var action = calculator.action, name = calculator.action.name;
        var _a = (0, lodash_1.isString)(name) ? name.replace(/([^\\.]+)[\\.]?(.*)/, '$1θ$2').split('θ') : [name], actionName = _a[0], bindAttr = _a[1];
        if (actionName === bind_action_1.Bind.actionName) {
            action.name = actionName;
            action.params = tslib_1.__assign(tslib_1.__assign({ ignoreBuilder: true }, action.params), { bindAttr: bindAttr });
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
    AttributeExtension = tslib_1.__decorate([
        (0, builder_context_1.Extension)()
    ], AttributeExtension);
    return AttributeExtension;
}(builder_1.BasicExtension));
exports.AttributeExtension = AttributeExtension;
