import { __decorate, __metadata } from "tslib";
import { FACTORY_BUILDER, generateUUID } from '@dynamic/builder';
import { Injectable, Injector } from '@fm/di';
import { builderContext, CONTROL_INTERCEPT } from '../builder/builder-context';
import { PLUGIN_GET_CONFIG } from '../token';
let DynamicManage = class DynamicManage {
    constructor(injector) {
        this.injector = injector;
        this.builderCache = new Map();
        builderContext.forwardFormControl(this.formControl);
        builderContext.forwardGetJsonConfig(injector.get(PLUGIN_GET_CONFIG));
        builderContext.registryInjector(this.injector);
    }
    formControl(value, options, _injector) {
        return _injector.get(CONTROL_INTERCEPT).create(value, options);
    }
    getForceUpdate(detectChanges) {
        let detectChangesSt;
        return () => {
            detectChangesSt && clearTimeout(detectChangesSt);
            detectChangesSt = setTimeout(() => (detectChanges(generateUUID(2)), detectChangesSt = null));
        };
    }
    getElementProps(builderField) {
        const { id, builderuuid, instance, field = {} } = builderField;
        const { injector } = this.getBuilder(builderuuid);
        const propsExists = ['source', 'control', 'events', 'visibility'].reduce((exists, key) => {
            const value = builderField[key];
            return Object.assign(exists, typeof value !== 'undefined' ? { [key]: value } : {});
        }, {});
        return Object.assign(Object.assign({ id, injector, builderuuid, instance }, propsExists), field);
    }
    getBuilderUUID() {
        return Object.create({ uuid: generateUUID(1) });
    }
    factory(uuid, props) {
        let model = this.getBuilder(uuid);
        if (!model) {
            const builder = this.builderCache.get(props.builderuuid);
            model = this.injector.get(FACTORY_BUILDER)(Object.assign({ builder }, props));
            this.builderCache.set(uuid, model);
        }
        if (model.ready && !model.$$cache.destroyed) {
            model.$$cache.fields.forEach((field) => field.builderuuid = uuid);
        }
        return model;
    }
    getBuilder(uuid) {
        return this.builderCache.get(uuid);
    }
    deleteBuilder(uuid) {
        this.getBuilder(uuid).onDestroy();
        this.builderCache.delete(uuid);
    }
};
DynamicManage = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Injector])
], DynamicManage);
export { DynamicManage };
