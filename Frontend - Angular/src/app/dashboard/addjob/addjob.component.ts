import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  booleanState: boolean=false;
  constructor(private sharedService: SharedService) {}
  ngOnInit() {
    this.sharedService.currentBooleanState.subscribe(state => {
      this.booleanState = state;
    });
  }
  
}
