import { Pipe, PipeTransform } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Pipe({
  name: 'searchInFavorites',
  pure: false,
})
export class SearchInFavoritesPipe implements PipeTransform {

  constructor(
    private favorites: FavoritesService,
  ) { }

  transform(id: string): boolean {
    return this.favorites.search(id) >= 0;
  }

}
