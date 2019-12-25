import { Component, OnInit } from '@angular/core';

import { YouTubeService } from '../../services/you-tube.service';
import { Video } from '../../models/youtube/video';

@Component({
  selector: 'top-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
})
export class VideosListComponent implements OnInit {

  videos: Video[];

  constructor(
    private youtube: YouTubeService,
  ) { }

  ngOnInit() {
    this.youtube.getTopVideos().then(resp => this.videos = resp.items);
  }

}
