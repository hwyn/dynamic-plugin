"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicManage = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var di_1 = require("@fm/di");
var lodash_1 = require("lodash");
var builder_context_1 = require("../builder/builder-context");
var token_1 = require("../token");
var DynamicManage = /** @class */ (function () {
    function DynamicManage(injector) {
        this.injector = injector;
        this.builderCache = new Map();
        builder_context_1.builderContext.forwardFormControl(this.formControl);
        builder_context_1.builderContext.forwardGetJsonConfig(injector.get(token_1.PLUGIN_GET_CONFIG));
        builder_context_1.builderContext.registryInjector(this.injector);
    }
    DynamicManage.prototype.formControl = function (value, options, _injector) {
        return _injector.get(builder_context_1.CONTROL_INTERCEPT).create(value, options);
    };
    DynamicManage.prototype.getForceUpdate = function (detectChanges) {
        var detectChangesSt;
        return function () {
            detectChangesSt && clearTimeout(detectChangesSt);
            detectChangesSt = setTimeout(function () { return (detectChanges((0, builder_1.generateUUID)(2)), detectChangesSt = null); });
        };
    };
    DynamicManage.prototype.getElementProps = function (builderField) {
        var id = builderField.id, builderuuid = builderField.builderuuid, instance = builderField.instance, _a = builderField.field, field = _a === void 0 ? {} : _a;
        var injector = this.getBuilder(builderuuid).injector;
        var isNotEvent = ['onCheckVisibility'];
        var isExists = ['source', 'control', 'visibility'];
        var events = (0, lodash_1.omitBy)(builderField.events, function (_item, key) { return isNotEvent.includes(key); });
        var propsExists = (0, lodash_1.omitBy)(builderField, function (item, key) { return !isExists.includes(key) && typeof item !== 'undefined'; });
        return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ id: id, injector: injector, builderuuid: builderuuid, instance: instance }, propsExists), { events: events }), field);
    };
    DynamicManage.prototype.getBuilderUUID = function () {
        return Object.create({ uuid: (0, builder_1.generateUUID)(1) });
    };
    DynamicManage.prototype.addFieldUUID = function (uuid) {
        var builder = this.getBuilder(uuid);
        if (builder.$$cache.destroyed)
            return;
        var ld = builder.listenerDetect.subscribe(function () {
            builder.$$cache.fields.forEach(function (field) { return field.builderuuid = uuid; });
            ld.unsubscribe();
        });
        if (builder.ready)
            builder.detectChanges();
    };
    DynamicManage.prototype.factory = function (uuid, props) {
        var model = this.getBuilder(uuid);
        if (!model) {
            var builder = this.builderCache.get(props.builderuuid);
            model = this.injector.get(builder_1.FACTORY_BUILDER)(tslib_1.__assign({ builder: builder }, props));
            this.builderCache.set(uuid, model);
            this.addFieldUUID(uuid);
        }
        return model;
    };
    DynamicManage.prototype.getBuilder = function (uuid) {
        return this.builderCache.get(uuid);
    };
    DynamicManage.prototype.deleteBuilder = function (uuid) {
        this.getBuilder(uuid).onDestroy();
        this.builderCache.delete(uuid);
    };
    DynamicManage = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector])
    ], DynamicManage);
    return DynamicManage;
}());
exports.DynamicManage = DynamicManage;
