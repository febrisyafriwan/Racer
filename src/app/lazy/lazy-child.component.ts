import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'my-lazy-child',
  templateUrl: './lazy-child.component.html'
})
export class LazyChildComponent implements OnInit  {
  
  constructor(private ds: DataService) {}

    msg1 = 'This is message from lazy child';
    msg2 = 'This is message from btn click from lazy child';
     
    ngOnInit(){
        // send message to subscribers via observable subject
        this.ds.sendData(this.msg1);
    }

    sendData(){
      this.ds.sendData(this.msg2);
    }
 
    ngOnDestroy(){
        // clear message
        this.ds.clearData();
    }

    clearData(){
      // clear message
        this.ds.clearData();
    }
}