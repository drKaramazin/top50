import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { YouTubeService } from '../../services/you-tube.service';
import { SearchResult } from '../../models/search-result';

@Component({
  selector: 'top-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  @Output() onSearch = new EventEmitter<SearchResult>();
  @Output() onClear = new EventEmitter();

  form: FormGroup;

  isClearBtnShowed = false;

  constructor(
    private youtube: YouTubeService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      query: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    });
  }

  search(query: string) {
    this.youtube.search(query).then(resp => this.onSearch.emit({ result: resp, query: this.form.controls.query.value }));
  }

  showClearButton() {
    this.isClearBtnShowed = true;
  }

  clearSearch() {
    this.isClearBtnShowed = false;
    this.onClear.emit();
  }

  clearQuery() {
    this.form.controls.query.patchValue('');
    this.clearSearch();
  }

}
