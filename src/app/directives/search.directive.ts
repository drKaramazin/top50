import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { UtilService } from '../services/util.service';

@Directive({
  selector: '[topSearch]',
})
export class SearchDirective {

  private searchByNameTimer: any;

  private isSearch = false;

  private searchGUID: string;

  @Input() delay = 300;
  @Input() minCharCount = 3;

  @Output() onLessThanMin = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();

  @Input() onLessThanMinPromise: () => Promise<any>;
  @Input() onSearchPromise: (text: string) => Promise<any>;

  constructor(private element: ElementRef) {}

  searchBehavior(promiseMethod: (text: string) => Promise<any>, eventEmitter: EventEmitter<any>) {
    const currentGUID = UtilService.guid();
    this.searchGUID = currentGUID;

    if (promiseMethod) {
      promiseMethod(this.element.nativeElement.value).then((resp) => {
        if (currentGUID === this.searchGUID) {
          eventEmitter.emit(resp);
        }
      });
    } else {
      eventEmitter.emit(this.element.nativeElement.value);
    }
  }

  @HostListener('input') onInput() {
    if (this.searchByNameTimer) {
      clearTimeout(this.searchByNameTimer);
    }
    this.searchByNameTimer = setTimeout(() => {

      if (this.element.nativeElement.value.length >= this.minCharCount) {
        this.isSearch = true;
        this.searchBehavior(this.onSearchPromise, this.onSearch);
      } else {
        if (this.isSearch) {
          this.isSearch = false;
          this.searchBehavior(this.onLessThanMinPromise, this.onLessThanMin);
        }
      }

    }, this.delay);
  }

}
