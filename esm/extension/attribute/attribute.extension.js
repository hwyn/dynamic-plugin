import { __decorate } from "tslib";
import { BasicExtension, CALCULATOR, LOAD } from '@hwy-fm/builder';
import { isString } from 'lodash';
import { Extension } from '../../builder/builder-context';
import { Bind } from './bind.action';
let AttributeExtension = class AttributeExtension extends BasicExtension {
    constructor() {
        super(...arguments);
        this.inherent = ['layout'];
    }
    extension() {
        this.eachFields(this.jsonFields, ([jsonField, builderField]) => {
            Object.keys(builderField.field).forEach((key) => {
                if (/^#(.+)/ig.test(key))
                    this.addCalculator(key, jsonField, builderField);
            });
        });
    }
    addCalculator(key, jsonField, builderField) {
        const defaultDependents = { type: LOAD, fieldId: this.builder.id };
        const calculator = this.serializeCalculatorConfig(jsonField[key], CALCULATOR, defaultDependents);
        const { action, action: { name } } = calculator;
        const [actionName, bindAttr] = isString(name) ? name.replace(/([^\\.]+)[\\.]?(.*)/, '$1θ$2').split('θ') : [name];
        if (actionName === Bind.actionName) {
            action.name = actionName;
            action.params = Object.assign(Object.assign({ ignoreBuilder: true }, action.params), { bindAttr });
        }
        action.after = this.bindCalculatorAction(this.updateAttr.bind(this, key));
        this.pushCalculators(jsonField, calculator);
        delete builderField.field[key];
    }
    updateAttr(key, { builderField, actionEvent, instance }) {
        const _key = key.replace(/^#([\w\d]+)/ig, '$1');
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
    }
};
AttributeExtension = __decorate([
    Extension()
], AttributeExtension);
export { AttributeExtension };
