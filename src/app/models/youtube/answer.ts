import { Result } from './result';

export interface Answer {
  result: Result;
  body: string;
  headers: { [key: string]: string };
  status: number;
  statusText: string;
}
