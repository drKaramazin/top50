import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  readonly KEY = 'favorites';
  readonly SEPARATOR = ',';

  getData(): string {
    return localStorage.getItem(this.KEY);
  }

  getDataAsArray(): string[] {
    return this.getData() ? this.getData().split(this.SEPARATOR) : [];
  }

  save(ids: string[]) {
    localStorage.setItem(this.KEY, ids.join(this.SEPARATOR));
  }

  add(id: string) {
    if (this.search(id) < 0) {
      this.save(this.getData() ? [this.getData(), id] : [id]);
    }
  }

  search(id: string): number {
    return this.getDataAsArray().findIndex(val => val === id);
  }

  delete(id: string) {
    const index = this.search(id);
    if (index >= 0) {
      const ids = this.getDataAsArray();
      ids.splice(index, 1);
      this.save(ids);
    }
  }

}
