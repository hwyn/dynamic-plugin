import { __decorate, __metadata } from "tslib";
import { FACTORY_BUILDER, generateUUID } from '@hwy-fm/builder';
import { Injectable, Injector } from '@hwy-fm/di';
import { omitBy } from 'lodash';
import { builderContext, CONTROL_INTERCEPT } from '../builder/builder-context';
import { PLUGIN_GET_CONFIG } from '../token';
let DynamicManage = class DynamicManage {
    constructor(injector) {
        this.builderCache = new Map();
        this.injector = Injector.create([], injector);
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
        const isNotEvent = ['onCheckVisibility'];
        const isExists = ['source', 'control', 'visibility'];
        const events = omitBy(builderField.events, (_item, key) => isNotEvent.includes(key));
        const propsExists = omitBy(builderField, (item, key) => !isExists.includes(key) && typeof item !== 'undefined');
        return Object.assign(Object.assign(Object.assign({ id, injector, builderuuid, instance }, propsExists), { events }), field);
    }
    getBuilderUUID() {
        return Object.create({ uuid: generateUUID(1) });
    }
    addFieldUUID(uuid) {
        const builder = this.getBuilder(uuid);
        if (builder.$$cache.destroyed)
            return;
        const ld = builder.listenerDetect.subscribe(() => {
            builder.$$cache.fields.forEach((field) => field.builderuuid = uuid);
            ld.unsubscribe();
        });
        if (builder.ready)
            builder.detectChanges();
    }
    factory(uuid, props) {
        let model = this.getBuilder(uuid);
        if (!model) {
            const builder = this.builderCache.get(props.builderuuid);
            model = this.injector.get(FACTORY_BUILDER)(Object.assign({ builder }, props));
            this.builderCache.set(uuid, model);
            this.addFieldUUID(uuid);
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
