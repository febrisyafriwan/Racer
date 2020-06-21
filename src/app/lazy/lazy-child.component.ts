import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'my-lazy-child',
  templateUrl: './lazy-child.component.html'
})
export class LazyChildComponent implements OnInit  {
  
  constructor() {}

    msg1 = 'This is message from lazy child';
    msg2 = 'This is message from btn click from lazy child';
     
    ngOnInit(){
        // send message to subscribers via observable subject

    }


}