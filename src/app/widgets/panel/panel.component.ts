import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'top-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() centered = false;
  @Input() direction = 'row';

  constructor() { }

  ngOnInit() {
  }

}
