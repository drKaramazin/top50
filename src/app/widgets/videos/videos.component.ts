import { Component, OnInit } from '@angular/core';

import { YouTubeService } from '../../services/you-tube.service';
import { FavoritesService } from '../../services/favorites.service';
import { Result } from '../../models/youtube/result';
import { Video } from '../../models/youtube/video';
import { BehaviorSubject } from 'rxjs';
import { SearchResult } from '../../models/search-result';

@Component({
  selector: 'top-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {

  items: Video[];
  nextPageToken: string;

  query = new BehaviorSubject<string>(null);
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private youtube: YouTubeService,
    private favorites: FavoritesService,
  ) { }

  resultHolder(result: Result) {
    this.items = result.items;
    this.nextPageToken = result.nextPageToken;
    this.loading.next(false);
  }

  getTopVideos() {
    this.loading.next(true);
    this.youtube.getTop()
      .then(resp => this.resultHolder(resp));
  }

  ngOnInit() {
    this.getTopVideos();
  }

  nextHolder(result: Result) {
    this.items = this.items.concat(result.items);
    this.nextPageToken = result.nextPageToken;
    this.loading.next(false);
  }

  next() {
    if (!this.loading.value) {
      this.loading.next(true);

      const promise: Promise<Result> = this.query.value ? this.youtube.search(this.query.value, this.nextPageToken)
        : this.youtube.getTop(this.nextPageToken);

      promise.then(resp => this.nextHolder(resp));
    }
  }

  search(resp: SearchResult) {
    this.query.next(resp.query);
    this.resultHolder(resp.result);
  }

  clearSearch() {
    this.query.next(null);
    this.getTopVideos();
  }

}
