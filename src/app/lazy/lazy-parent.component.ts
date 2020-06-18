import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'my-lazy-parent',
  templateUrl: './lazy-parent.component.html'
})
export class LazyParentComponent implements OnInit  {
  
  constructor(private ds: DataService) {}

    msg1 = 'This is message from lazy parent';
    msg2 = 'This is message from btn click in lazy parent';
     
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