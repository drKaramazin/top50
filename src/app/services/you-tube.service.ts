import { Injectable } from '@angular/core';

import { Result } from '../models/youtube/result';
import { FavoritesService } from './favorites.service';
import { Options } from '../models/youtube/options';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor(
    private favorites: FavoritesService,
  ) { }

  list(options: Options): Promise<Result> {
    return new Promise((resolve, reject) => {
      gapi.client.youtube.videos.list(options)
        .then((resp) => resolve(resp.result), (reason) => reject(reason));
    });
  }

  getTop(pageToken?: string): Promise<Result> {
    const options: {[key: string]: string} = {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: '50',
    };

    if (pageToken) {
      options.pageToken = pageToken;
    }

    return this.list(options);
  }

  getFavorites(): Promise<Result> {
    const options: Options = {
      part: 'snippet',
      id: this.favorites.getData(),
    };

    return this.list(options);
  }

  search(query: string, pageToken?: string): Promise<Result> {
    const options: Options = {
      part: 'snippet',
      maxResults: '50',
      q: query,
      type: 'video',
    };

    if (pageToken) {
      options.pageToken = pageToken;
    }

    return new Promise<Result>((resolve, reject) => {
      gapi.client.youtube.search.list(options)
        .then((resp) => resolve(resp.result), (reason) => reject(reason));
    });
  }

}
