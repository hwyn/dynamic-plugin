"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = exports.Action = exports.Convert = exports.ControlIntercept = exports.Validator = exports.forwardHocComponent = exports.forwardUiElement = exports.builderContext = exports.builderPackage = exports.CONTROL_INTERCEPT = exports.FORWARD_BUILDER = exports.FORWARD_MICRO = exports.VALIDATOR = void 0;
var di_1 = require("@fm/di");
var builder_1 = require("@dynamic/builder");
exports.VALIDATOR = di_1.InjectorToken.get('VALIDATOR');
exports.FORWARD_MICRO = di_1.InjectorToken.get('FORWARD_MICRO');
exports.FORWARD_BUILDER = di_1.InjectorToken.get('FORWARD_BUILDER');
exports.CONTROL_INTERCEPT = di_1.InjectorToken.get('CONTROL_INTERCEPT');
var builderPackage = function (baseName, parent) {
    var getName = function (name) { return baseName + name; };
    var builderContext = (0, builder_1.useBuilderContext)(parent);
    var Convert = (0, di_1.makeDecorator)(getName('Convert'), undefined, function (Type, name) {
        builderContext.forwardConvert(name, Type);
    });
    var Action = (0, di_1.makeDecorator)(getName('Action'), undefined, function (Type, name, options) {
        builderContext.forwardAction(name, Type, options);
    });
    var Validator = (0, di_1.makeDecorator)(getName('Validator'), undefined, function (Type, name) {
        builderContext.forwardType(exports.VALIDATOR, name, Type, 'validator');
    });
    var ControlIntercept = (0, di_1.makeDecorator)(getName('ControlIntercept'), undefined, function (Type) {
        builderContext.forwardClass(exports.CONTROL_INTERCEPT, Type);
    });
    var Extension = (0, di_1.makeDecorator)(getName('Extension'), undefined, function (Extension) {
        builderContext.registryExtension([Extension]);
    });
    var forwardUiElement = function (name, Element) { return builderContext.forwardUiElement(name, Element); };
    var forwardHocComponent = function (token, hot) { return (builderContext.forwardFactory(token, hot), hot); };
    return { builderContext: builderContext, forwardUiElement: forwardUiElement, forwardHocComponent: forwardHocComponent, ControlIntercept: ControlIntercept, Convert: Convert, Action: Action, Validator: Validator, Extension: Extension };
};
exports.builderPackage = builderPackage;
// eslint-disable-next-line max-len
exports.builderContext = (_a = (0, exports.builderPackage)('Root'), _a.builderContext), exports.forwardUiElement = _a.forwardUiElement, exports.forwardHocComponent = _a.forwardHocComponent, exports.Validator = _a.Validator, exports.ControlIntercept = _a.ControlIntercept, exports.Convert = _a.Convert, exports.Action = _a.Action, exports.Extension = _a.Extension;
