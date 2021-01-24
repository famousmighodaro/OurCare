import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-view-item',
  templateUrl: './day-view-item.component.html',
  styleUrls: ['./day-view-item.component.scss'],
})
export class DayViewItemComponent implements OnInit {
  @Input()
  event: any;
  constructor() { }

  ngOnInit() { }

}
