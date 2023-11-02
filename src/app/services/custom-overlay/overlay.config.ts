import {
  ConnectedPosition,
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { ElementRef, InjectionToken, ViewContainerRef } from '@angular/core';
import { CustomMap } from 'src/app/utils/struct-utils';

export enum ScrollStrategyEnum {
  Noop = 1,
  Block,
  Reposition,
  Close,
}
export namespace OverlayUtils {
  export const OVERLAY_DATA_TOKEN = new InjectionToken<DataConfig>(
    'data_token'
  );

  export const getScrollStrategy = (overlay: Overlay) =>
    new CustomMap<ScrollStrategyEnum, ScrollStrategy>(
      [
        [ScrollStrategyEnum.Block, overlay.scrollStrategies.block()],
        [ScrollStrategyEnum.Noop, overlay.scrollStrategies.noop()],
        [ScrollStrategyEnum.Reposition, overlay.scrollStrategies.reposition()],
        [ScrollStrategyEnum.Close, overlay.scrollStrategies.close()],
      ],
      overlay.scrollStrategies.noop()
    );
  export interface DataConfig<T = {}> {
    config?: OverlayConfig;
    customData?: T;
    afterCloseEvent?: () => void;
    origin?: ElementRef<any>;
    scrollStrategy?: ScrollStrategyEnum;
    viewContainerRef?: ViewContainerRef;
  }

  export const DEFAULT_CONFIG = (
    overlay: Overlay,
    origin: ElementRef<any>
  ): OverlayConfig => ({
    width: '10rem',
    height: '10rem',
    hasBackdrop: false,
    scrollStrategy: overlay.scrollStrategies.reposition(),
    positionStrategy: origin
      ? overlay
          .position()
          .flexibleConnectedTo(origin)
          .withPositions([
            {
              originX: 'end',
              originY: 'top',
              overlayX: 'start',
              overlayY: 'top',
              offsetY: 15,
              offsetX: -15,
            },
          ])
      : overlay.position().global().centerHorizontally().centerVertically(),
  });
}
