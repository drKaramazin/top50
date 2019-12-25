import { Component, Input, OnInit } from '@angular/core';

import { Video } from '../../models/youtube/video';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'top-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent implements OnInit {

  @Input() items: Video[];

  constructor(
    private favorites: FavoritesService,
  ) { }

  ngOnInit() {
  }

  addToFavorites(video: Video) {
    this.favorites.add(video.id);
  }

  removeFromFavorites(video: Video) {
    this.favorites.delete(video.id);
  }

}
