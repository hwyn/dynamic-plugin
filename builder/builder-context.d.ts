import { BuilderContext } from '@hwy-fm/builder';
import { InjectorToken, Type } from '@hwy-fm/di';
export declare const VALIDATOR: InjectorToken;
export declare const FORWARD_MICRO: InjectorToken;
export declare const FORWARD_BUILDER: InjectorToken;
export declare const CONTROL_INTERCEPT: InjectorToken;
export declare const builderPackage: (baseName: string, parent?: BuilderContext) => {
    builderContext: BuilderContext;
    forwardUiElement: (name: string, Element: any) => any;
    forwardHocComponent: (token: InjectorToken, hot: any) => any;
    UIElement: (name: string) => <T>(Type: Type<T>) => any;
    ControlIntercept: () => import("../../di/decorators").ClassDecorator<any>;
    Convert: () => import("../../di/decorators").ClassDecorator<any>;
    Action: (name: string, options?: any) => import("../../di/decorators").ClassDecorator<any>;
    Validator: (name: string) => import("../../di/decorators").ClassDecorator<any>;
    Extension: () => import("../../di/decorators").ClassDecorator<any>;
};
export declare const builderContext: BuilderContext, forwardUiElement: (name: string, Element: any) => any, forwardHocComponent: (token: InjectorToken, hot: any) => any, UIElement: (name: string) => <T>(Type: Type<T>) => any, Validator: (name: string) => import("../../di/decorators").ClassDecorator<any>, ControlIntercept: () => import("../../di/decorators").ClassDecorator<any>, Convert: () => import("../../di/decorators").ClassDecorator<any>, Action: (name: string, options?: any) => import("../../di/decorators").ClassDecorator<any>, Extension: () => import("../../di/decorators").ClassDecorator<any>;
