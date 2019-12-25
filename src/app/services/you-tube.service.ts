import { Injectable } from '@angular/core';

import { Result } from '../models/youtube/result';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor() { }

  getTopVideos(pageToken?: string): Promise<Result> {
    const options: {[key: string]: string} = {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: '50',
    };

    if (pageToken) {
      options.pageToken = pageToken;
    }

    return new Promise((resolve, reject) => {
      gapi.client.youtube.videos.list(options)
        .then((resp) => resolve(resp.result), (reason) => reject(reason));
    });
  }

  searchVideos(query: string, pageToken?: string): Promise<Result> {
    const options: {[key: string]: string} = {
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
