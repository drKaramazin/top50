import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';

import { UtilService } from '../services/util.service';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[topSearch]',
})
export class SearchDirective implements OnDestroy {

  willBeClosed = new Subject();
  input$ = new Subject();

  private isSearch = false;

  private searchGUID: string;

  @Input() delay = 300;
  @Input() minCharCount = 3;

  @Output() onLessThanMin = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() onMoreThanMin = new EventEmitter();

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
    this.input$.next();

    interval(this.delay)
      .pipe(take(1), takeUntil(this.willBeClosed), takeUntil(this.input$))
      .subscribe(() => {
        if (this.element.nativeElement.value.length >= this.minCharCount) {
          this.isSearch = true;
          this.onMoreThanMin.emit();
          this.searchBehavior(this.onSearchPromise, this.onSearch);
        } else {
          if (this.isSearch) {
            this.isSearch = false;
            this.searchBehavior(this.onLessThanMinPromise, this.onLessThanMin);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.willBeClosed.next();
    this.willBeClosed.complete();

    this.input$.complete();
  }

}
