import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNoImageFound]'
})
export class NoImageFoundDirective {
  @Input() appNoImageFound: string = 'assets/default-image.png'; // default fallback

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    const imgElement = this.el.nativeElement;
    imgElement.src = this.appNoImageFound;
  }
}