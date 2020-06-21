import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'my-lazy-parent',
  templateUrl: './lazy-parent.component.html'
})
export class LazyParentComponent implements OnInit  {
  
  constructor() {}

    msg1 = 'This is message from lazy parent';
    msg2 = 'This is message from btn click in lazy parent';
     
    ngOnInit(){
    }
}