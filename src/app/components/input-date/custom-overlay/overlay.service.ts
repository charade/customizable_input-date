import { Injectable, Injector, OnDestroy, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
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
    this.currentOverlayRef.detach();
  }

  open<T = {}>(
    overlayContent: ComponentType<any>,
    overlayData?: OverlayUtils.DataConfig<T>
  ): void {
    const overlayConfig = {
      ...OverlayUtils.DEFAULT_CONFIG(this.overlay, overlayData.origin),
      ...overlayData.config,
      scrollStrategy: OverlayUtils.getScrollStrategy(this.overlay).value(
        overlayData.scrollStrategy
      ),
    };

    const overlayRef = this.overlay.create(overlayConfig);

    const injector = Injector.create({
      providers: [
        {
          provide: OverlayUtils.OVERLAY_DATA_TOKEN,
          useValue: overlayData.data,
        },
        {
          provide: OverlayRef,
          useValue: overlayRef,
        },
      ],
    });

    const portal = new ComponentPortal(
      overlayContent as ComponentType<any>,
      overlayData.viewContainerRef,
      injector
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
      this.currentOverlayRef.detach();
      this.afterCloseEvent && this.afterCloseEvent();
    }
  }
}
