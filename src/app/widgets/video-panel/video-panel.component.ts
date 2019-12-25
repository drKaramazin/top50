import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchResult } from '../../models/search-result';
import { Video } from '../../models/youtube/video';
import { YouTubeService } from '../../services/you-tube.service';
import { BehaviorSubject } from 'rxjs';

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

  loading = new BehaviorSubject<boolean>(false);

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
    if (!this.loading.value) {
      this.isShowFavorites = true;
      this.loading.next(true);
      this.youtube.getFavorites().then(resp => {
        this.items = resp.items;
        this.loading.next(false);
      });
    }
  }

  hideFavorites() {
    if (!this.loading.value) {
      this.isShowFavorites = false;
    }
  }

  removeFromFavorites(id: string) {
    this.items = this.items.reduce((accum, video) => {
      if (video.id !== id) {
        accum.push(video);
      }
      return accum;
    }, []);
  }

}
