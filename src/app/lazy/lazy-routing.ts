// app/projects/projects.routing.ts
// Projects Routing as a Module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LazyParentComponent } from './lazy-parent.component';
import { LazyChildComponent } from './lazy-child.component';

// Routes
const routes: Routes = [
  {
    path: '',
    component: LazyParentComponent,
    children: [
      { path: 'child',component: LazyChildComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LazyRoutingModule { }

export const rc = [
  LazyParentComponent,
  LazyChildComponent
];
