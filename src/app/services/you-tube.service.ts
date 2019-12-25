import { Injectable } from '@angular/core';

import { Result } from '../models/youtube/result';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor() { }

  getTopVideos(): Promise<Result> {
    return new Promise((resolve, reject) => {
      gapi.client.youtube.videos.list({
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        maxResults: '50',
      }).then((resp) => resolve(resp.result), (reason) => reject(reason));
    });
  }

}
