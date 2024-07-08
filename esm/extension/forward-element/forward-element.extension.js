import { __decorate } from "tslib";
import { BasicExtension, BuilderEngine } from '@hwy-fm/builder';
import { Extension } from '../../builder/builder-context';
import { BUILDER } from '../../constst/ui-element.consts';
import { BuilderDef } from '../../hoc/forward-builder/builder-def';
import { getComponentDef } from '../../hoc/forward-builder/forward-builder';
const ELEMENT = 'element';
let ForwardElementExtension = class ForwardElementExtension extends BasicExtension {
    constructor() {
        super(...arguments);
        this.engine = this.injector.get(BuilderEngine);
    }
    extension() { }
    afterExtension() {
        this.eachFields(this.jsonFields, this.proxyElement.bind(this));
    }
    proxyElement([, builderField]) {
        let _element = this.transform(builderField, builderField.element);
        Object.defineProperty(builderField, ELEMENT, {
            get: () => _element,
            set: (element) => _element = this.transform(builderField, element)
        });
    }
    transform(builderField, element) {
        var _a;
        const _element = element ? (_a = getComponentDef(element)) !== null && _a !== void 0 ? _a : element : element;
        if (!(_element instanceof BuilderDef))
            return _element;
        const { field } = builderField;
        for (const key in _element) {
            if (!Object.hasOwn(field, key))
                field[key] = _element[key];
        }
        return this.engine.getUiComponent(BUILDER);
    }
    destroy() {
        this.eachFields(this.jsonFields, ([, builderField]) => this.defineProperty(builderField, ELEMENT, null));
    }
};
ForwardElementExtension = __decorate([
    Extension()
], ForwardElementExtension);
export { ForwardElementExtension };
