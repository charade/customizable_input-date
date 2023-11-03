import { Injectable, OnDestroy, TemplateRef, inject } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';
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
    this.currentOverlayRef.detach();
  }

  open(
    overlayContent: TemplateRef<any>,
    overlayData?: OverlayUtils.DataConfig
  ): void {

    const overlayConfig = {
      ...OverlayUtils.DEFAULT_CONFIG(this.overlay, overlayData.origin),
      ...overlayData.config,
      scrollStrategy: OverlayUtils.getScrollStrategy(this.overlay).value(
        overlayData.scrollStrategy
      ),
    };

    const overlayRef = this.overlay.create(overlayConfig);

    const portal = new TemplatePortal(
      overlayContent as TemplateRef<any>,
      overlayData.viewContainerRef
    );

    overlayRef.attach(portal);

    this.currentOverlayRef = overlayRef;

    this.subscription = overlayRef
      .backdropClick()
      .subscribe(() => this.close());
  }

  close(): void {
    if (this.currentOverlayRef) {
      this.currentOverlayRef.dispose();
      this.afterCloseEvent && this.afterCloseEvent();
    }
  }
}
