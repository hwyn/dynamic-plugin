import { BuilderContext } from '@dynamic/builder';
import { InjectorToken, Type } from '@fm/di';
export declare const VALIDATOR: InjectorToken;
export declare const FORWARD_MICRO: InjectorToken;
export declare const FORWARD_BUILDER: InjectorToken;
export declare const CONTROL_INTERCEPT: InjectorToken;
export declare const builderPackage: (baseName: string, parent?: BuilderContext) => {
    builderContext: BuilderContext;
    forwardUiElement: (name: string, Element: any) => any;
    forwardHocComponent: (token: InjectorToken, hot: any) => any;
    UIElement: (name: string) => <T>(Type: Type<T>) => any;
    ControlIntercept: () => import("../../di/decorators").ClassDecorator;
    Convert: () => import("../../di/decorators").ClassDecorator;
    Action: (name: string, options?: any) => import("../../di/decorators").ClassDecorator;
    Validator: (name: string) => import("../../di/decorators").ClassDecorator;
    Extension: () => import("../../di/decorators").ClassDecorator;
};
export declare const builderContext: BuilderContext, forwardUiElement: (name: string, Element: any) => any, forwardHocComponent: (token: InjectorToken, hot: any) => any, UIElement: (name: string) => <T>(Type: Type<T>) => any, Validator: (name: string) => import("../../di/decorators").ClassDecorator, ControlIntercept: () => import("../../di/decorators").ClassDecorator, Convert: () => import("../../di/decorators").ClassDecorator, Action: (name: string, options?: any) => import("../../di/decorators").ClassDecorator, Extension: () => import("../../di/decorators").ClassDecorator;
