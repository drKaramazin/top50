import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Video } from './models/youtube/video';
import { YouTubeService } from './services/you-tube.service';

@Component({
  selector: 'top-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'top50';

  constructor(
    public auth: AuthService,
    private youtube: YouTubeService,
  ) {}

  ngOnInit(): void {
    this.auth.isAuthorized.subscribe(status => console.log(status));
  }

}
