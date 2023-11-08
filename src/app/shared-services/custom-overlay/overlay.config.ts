import {
  ConnectedPosition,
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import {
  ElementRef,
  InjectionToken,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { Dayjs } from 'dayjs';
import { Language } from 'src/app/utils/languages';
import { CustomMap } from 'src/app/utils/struct-utils';

export enum ScrollStrategyEnum {
  Noop = 1,
  Block,
  Reposition,
  Close,
}
export namespace OverlayUtils {
  export function OVERLAY_DATA_TOKEN<T>() {
    return new InjectionToken<T>('data_token');
  }

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
    origin?: Element;
    scrollStrategy?: ScrollStrategyEnum;
    viewContainerRef?: ViewContainerRef;
    data?: T;
  }

  export const DEFAULT_CONFIG = (
    overlay: Overlay,
    origin: Element
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
              originX: 'center',
              originY: 'bottom',
              overlayX: 'center',
              overlayY: 'top',
              offsetY: 3,
            },
          ])
      : overlay.position().global().centerHorizontally().centerVertically(),
  });
}
