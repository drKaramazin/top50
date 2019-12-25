import { PageInfo } from './page-info';
import { Video } from './video';

export interface Result {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: Array<Video>;
}
