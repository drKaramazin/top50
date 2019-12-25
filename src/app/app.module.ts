import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { appInitializer } from './app-initializer';

import { AuthService } from './services/auth.service';
import { YouTubeService } from './services/you-tube.service';
import { UtilService } from './services/util.service';
import { FavoritesService } from './services/favorites.service';

import { AppComponent } from './app.component';
import { VideosListComponent } from './widgets/videos-list/videos-list.component';
import { VideosComponent } from './pages/videos/videos.component';

import { SearchDirective } from './directives/search.directive';
import { PanelComponent } from './widgets/panel/panel.component';
import { QueryComponent } from './widgets/query/query.component';
import { SearchInFavoritesPipe } from './pipes/search-in-favorites.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VideosListComponent,
    VideosComponent,
    SearchDirective,
    PanelComponent,
    QueryComponent,
    SearchInFavoritesPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [ AuthService ],
      multi: true
    },
    AuthService,
    YouTubeService,
    UtilService,
    FavoritesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
