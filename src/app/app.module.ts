import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { appInitializer } from './app-initializer';

import { AuthService } from './services/auth.service';
import { YouTubeService } from './services/you-tube.service';

import { AppComponent } from './app.component';
import { VideosListComponent } from './widgets/videos-list/videos-list.component';
import { VideosComponent } from './pages/videos/videos.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    VideosListComponent,
    VideosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
