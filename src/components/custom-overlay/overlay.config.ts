import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { ElementRef, InjectionToken } from '@angular/core';

export namespace OverlayUtils {
  export const OVERLAY_DATA_TOKEN = new InjectionToken<DataConfig>(
    'data_token'
  );

  export interface DataConfig<T = {}> {
    config?: OverlayConfig;
    customData?: T;
    afterCloseEvent?: () => void;
    closeOnbackDropClicked?: boolean;
    origin?: ElementRef<any>;
  }

  export const DEFAULT_CONFIG = (
    overlay: Overlay,
    origin: ElementRef<any>
  ): OverlayConfig => ({
    width: '10rem',
    height: '6rem',
    hasBackdrop: false,
    scrollStrategy: overlay.scrollStrategies.noop(),
    positionStrategy: origin
      ? overlay
          .position()
          .flexibleConnectedTo(origin)
          .withPositions([
            {
              originX: 'center',
              originY: 'bottom',
              overlayX: 'center',
              overlayY: 'top',
            },
          ])
      : overlay.position().global().centerHorizontally().centerVertically(),
  });
}
