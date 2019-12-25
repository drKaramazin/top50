import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchResult } from '../../models/search-result';
import { Video } from '../../models/youtube/video';
import { YouTubeService } from '../../services/you-tube.service';

@Component({
  selector: 'top-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.scss']
})
export class VideoPanelComponent implements OnInit {

  @Output() onSearch = new EventEmitter<SearchResult>();
  @Output() onClearSearch = new EventEmitter();

  isShowFavorites = false;

  items: Video[] = [];

  constructor(
    private youtube: YouTubeService,
  ) { }

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
    this.youtube.getFavorites().then(resp => this.items = resp.items);
  }

  hideFavorites() {
    this.isShowFavorites = false;
  }

  removeFromFavorites(id: string) {
    console.log(id, this.items);
    this.items = this.items.reduce((accum, video) => {
      if (video.id !== id) {
        accum.push(video);
      }
      return accum;
    }, []);
    console.log(this.items);
  }

}
