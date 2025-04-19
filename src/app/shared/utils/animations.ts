import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('150ms', style({ opacity: 0 })),
  ]),
]);

export const pageTransition = trigger('pageTransition', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0 })),
  ]),
]);

export const slideDown = trigger('slideDown', [
  transition(':enter', [
    style({opacity: 0, maxHeight: '0'}),
    animate('300ms ease-in', style({opacity: 1, maxHeight: '1000px'})),
  ]),
]);

export const pageTurn = trigger('pageTurn', [
  transition('* => *', [
    animate('1s ease-in-out', keyframes([
      style({ transform: 'rotateY(0deg)', offset: 0 }),
      style({ transform: 'rotateY(-120deg)', offset: 0.5 }),
      style({ transform: 'rotateY(0deg)', offset: 1.0 })
    ]))
  ])
]);
