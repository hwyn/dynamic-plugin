import { BaseAction, BasicExtension } from '@hwy-fm/builder';
import { Observable } from 'rxjs';
export declare class AttributeExtension extends BasicExtension {
    private inherent;
    protected extension(): void | Observable<any>;
    private addCalculator;
    updateAttr(key: string, { builderField, actionEvent, instance }: BaseAction): void;
}
