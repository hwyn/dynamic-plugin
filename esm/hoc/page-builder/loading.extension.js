import { BasicExtension } from '@dynamic/builder';
export const OPEN_LOADING = 'openLoading';
export const CLOSE_LOADING = 'closeLoading';
export class LoadingExtension extends BasicExtension {
    extension() {
        this.pushActionToMethod([{ type: OPEN_LOADING }, { type: CLOSE_LOADING }]);
    }
    destroy() {
        this.unDefineProperty(this.builder, [OPEN_LOADING, CLOSE_LOADING]);
        return super.beforeDestroy();
    }
}
