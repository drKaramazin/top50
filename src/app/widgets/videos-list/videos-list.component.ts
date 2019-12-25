import { Component, OnInit } from '@angular/core';

import { YouTubeService } from '../../services/you-tube.service';
import { Result } from '../../models/youtube/result';

@Component({
  selector: 'top-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
})
export class VideosListComponent implements OnInit {

  result: Result;

  q = 'Christmas';

  constructor(
    private youtube: YouTubeService,
  ) { }

  ngOnInit() {
    this.youtube.searchVideos(this.q).then(resp => {
      this.result = resp;
      console.log(resp);
    });
  }

  next() {
    this.youtube.searchVideos(this.q, this.result.nextPageToken).then(resp => {
      this.result = resp;
      console.log(resp);
    });
  }

  search(query: string) {
    console.log(query);
  }

  clearSearch() {
    console.log('Clear');
  }

}
