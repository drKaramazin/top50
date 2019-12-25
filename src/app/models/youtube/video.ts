import { VideoSnippet } from './video-snippet';

export interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
}
