import { Injectable, OnDestroy, inject } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';

import { OverlayUtils } from './overlay.config';

@Injectable()
export class CustomOverlayService implements OnDestroy {
  private afterCloseEvent: () => void;

  private currentOverlayRef: OverlayRef;
  private subscription: Subscription;
  private overlay = inject(Overlay);

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  open(
    overlayComponent: ComponentType<any>,
    overlayData?: OverlayUtils.DataConfig
  ): void {
    /* define actions to perform after overlay closed */
    // this.afterCloseEvent = overlayData?.afterCloseEvent;

    const _overlayConfig = new OverlayConfig({
      ...OverlayUtils.DEFAULT_CONFIG(this.overlay, overlayData.origin),
      ...overlayData.config,
    });

    const overlayRef = this.overlay.create(_overlayConfig);

    /** attach depences to the hostComponent */

    // inject date into the overlay component
    // const injectorTokens = new WeakMap();
    // if (overlayComponent) {
    //   injectorTokens.set(overlayComponent, overlayRef);
    //   injectorTokens.set(OverlayUtils.OVERLAY_DATA_TOKEN, overlayData);
    // }

    const portal = new ComponentPortal(overlayComponent);

    overlayRef.attach(portal);

    this.currentOverlayRef = overlayRef;

    if (overlayData.closeOnbackDropClicked) {
      this.subscription = overlayRef
        .backdropClick()
        .subscribe(() => this.close());
    }
  }

  close(): void {
    if (this.currentOverlayRef) {
      this.currentOverlayRef.dispose();
      this.afterCloseEvent && this.afterCloseEvent();
    }
  }
}
