import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchResult } from '../../models/search-result';

@Component({
  selector: 'top-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.scss']
})
export class VideoPanelComponent implements OnInit {

  @Output() onSearch = new EventEmitter<SearchResult>();
  @Output() onClearSearch = new EventEmitter();

  isShowFavorites = false;

  constructor() { }

  ngOnInit() {
  }

  search(resp: SearchResult) {
    this.onSearch.emit(resp);
  }

  clearSearch() {
    this.onClearSearch.emit();
  }

  showFavorites() {
    this.isShowFavorites = true;
  }

  hideFavorites() {
    this.isShowFavorites = false;
  }

}
