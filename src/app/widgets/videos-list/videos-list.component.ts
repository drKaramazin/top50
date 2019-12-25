import { Component, OnInit } from '@angular/core';

import { YouTubeService } from '../../services/you-tube.service';
import { Result } from '../../models/youtube/result';
import { Video } from '../../models/youtube/video';

@Component({
  selector: 'top-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
})
export class VideosListComponent implements OnInit {

  items: Video[];
  nextPageToken: string;

  constructor(
    private youtube: YouTubeService,
  ) { }

  getTopVideos() {
    this.youtube.getTopVideos()
      .then(resp => this.resultHolder(resp));
  }

  ngOnInit() {
    this.getTopVideos();
  }

  next() {
    this.youtube.getTopVideos(this.nextPageToken)
      .then(resp => {
        this.items = this.items.concat(resp.items);
        this.nextPageToken = resp.nextPageToken;
      });
  }

  resultHolder(result: Result) {
    console.log(result);
    this.items = result.items;
    this.nextPageToken = result.nextPageToken;
  }

}
