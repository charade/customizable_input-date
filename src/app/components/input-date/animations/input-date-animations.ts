import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export enum InputDateAnimationsEnum {
  SlideInLeft = 'slideInLeft',
  SlideLeftStart = 'slideLeftStart',
  SlideOutLeft = 'slideOutLeft',
}

export namespace InputDateAnimationsEnum {
  export const slideLeft = trigger('slideLeft', [
    state(
      'slideOutLeft',
      style({
        transform: 'translateX(-4rem)',
        opacity: 0,
      })
    ),
    state(
      'slideLeftStart',
      style({
        transform: 'translateX(0)',
        opacity: 1,
      })
    ),
    state(
      'slideInLeft',
      style({
        transform: 'translateX(-8rem)',
        opacity: 0,
      })
    ),

    transition('slideLeftStart => slideOutLeft', animate('.4s ease')),
    transition('slideInLeft => slideLeftStart', animate('.4s ease')),
  ]);

  export const slideRight = trigger('slideRight', [
    state(
      'slideOutRight',
      style({
        transform: 'translateX(4rem)',
      })
    ),
    state(
      'slideInRight',
      style({
        transform: 'translateX(-4rem)',
      })
    ),
    transition('void => slideOutLeft', animate('.4s ease')),
    transition('slideInLeft => void', animate('.4s ease')),
  ]);
}
