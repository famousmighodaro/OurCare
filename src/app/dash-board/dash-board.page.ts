import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.page.html',
  styleUrls: ['./dash-board.page.scss'],
})
export class DashBoardPage implements OnInit {

  constructor() { }

  titlen(percent: number) : string {
    if(percent >= 100){
      return "Congratulations!"
    }else if(percent >= 50){
      return "Half"
    }else if(percent > 0){
      return "Just began"
    }else {
      return "Not started"
    }
  }
  ngOnInit() {
  }

}
