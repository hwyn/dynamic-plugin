import { __decorate, __rest } from "tslib";
import { BasicExtension, BuilderModel, DATA_SOURCE } from '@dynamic/builder';
import { isEmpty } from 'lodash';
import { Extension } from '../../builder/builder-context';
import { forwardBuilder } from '../../hoc/forward-builder/forward-builder';
import { LoadConfig } from './load-config';
let ListExtension = class ListExtension extends BasicExtension {
    constructor() {
        super(...arguments);
        this.jsonGrid = this.json.grid;
        this.proxyFields = [];
    }
    beforeExtension() {
        this.proxyFields = this.mapFields(this.jsonFields.filter(({ listMetadata }) => !isEmpty(listMetadata)), this.cloneField.bind(this));
    }
    extension() {
        this.eachFields(this.proxyFields, this.proxyField.bind(this));
    }
    cloneField([_jsonField, builderField]) {
        const jsonField = this.cloneDeepPlain(_jsonField);
        this.pushCalculators(_jsonField, {
            action: this.bindCalculatorAction(({ actionEvent }) => this.resetElement(jsonField, builderField, actionEvent)),
            dependents: { fieldId: _jsonField.id, type: DATA_SOURCE }
        });
        return jsonField;
    }
    proxyField([jsonField, builderField]) {
        var _a;
        const { listMetadata = {} } = jsonField, otherJsonField = __rest(jsonField, ["listMetadata"]);
        const { listLayout, justify, alignItems, spacing = (_a = this.jsonGrid) === null || _a === void 0 ? void 0 : _a.spacing } = listMetadata;
        const params = { grid: { spacing, justify, alignItems }, jsonField: Object.assign(Object.assign({}, otherJsonField), { layout: listLayout }) };
        const configAction = { name: LoadConfig.actionName, params };
        builderField.element = forwardBuilder(BuilderModel, { configAction });
        if (this.isBuildField(jsonField)) {
            this.builderAttr.forEach((key) => delete builderField.field[key]);
        }
    }
    resetElement(cloneJsonField, builderField, dataSource) {
        cloneJsonField.dataSource.source = dataSource;
        this.proxyField([cloneJsonField, builderField]);
    }
};
ListExtension = __decorate([
    Extension()
], ListExtension);
export { ListExtension };
