import { __decorate, __rest } from "tslib";
import { BasicExtension, BuilderModel } from '@dynamic/builder';
import { isEmpty } from 'lodash';
import { Extension } from '../../builder/builder-context';
import { forwardBuilder } from '../../hoc/forward-builder/forward-builder';
import { LoadConfig } from './load-config';
let ListExtension = class ListExtension extends BasicExtension {
    constructor() {
        super(...arguments);
        this.jsonGrid = this.json.grid;
    }
    extension() {
        this.eachFields(this.jsonFields.filter(({ listMetadata }) => !isEmpty(listMetadata)), this.proxyField.bind(this));
    }
    proxyField([jsonField, builderField]) {
        var _a;
        const _b = this.cloneDeepPlain(jsonField), { listMetadata = {} } = _b, otherJsonField = __rest(_b, ["listMetadata"]);
        const { listLayout, justify, alignItems, spacing = (_a = this.jsonGrid) === null || _a === void 0 ? void 0 : _a.spacing } = listMetadata;
        const params = { grid: { spacing, justify, alignItems }, jsonField: Object.assign(Object.assign({}, otherJsonField), { layout: listLayout }) };
        const configAction = { name: LoadConfig.actionName, params };
        builderField.element = forwardBuilder(BuilderModel, { configAction });
        if (this.isBuildField(jsonField)) {
            this.builderAttr.forEach((key) => delete builderField.field[key]);
        }
    }
};
ListExtension = __decorate([
    Extension()
], ListExtension);
export { ListExtension };
