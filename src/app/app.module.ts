import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { appInitializer } from './app-initializer';

import { AuthService } from './services/auth.service';
import { YouTubeService } from './services/you-tube.service';
import { UtilService } from './services/util.service';

import { AppComponent } from './app.component';
import { VideosListComponent } from './widgets/videos-list/videos-list.component';
import { VideosComponent } from './pages/videos/videos.component';

import { SearchDirective } from './directives/search.directive';
import { PanelComponent } from './widgets/panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosListComponent,
    VideosComponent,
    SearchDirective,
    PanelComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
