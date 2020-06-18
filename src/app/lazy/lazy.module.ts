// Angular Module Decorator
import { NgModule } from '@angular/core';

// Shared Module : Forms, common, Http
// import { SharedModule} from '../shared/shared.module';
// Other required things
// import 'rxjs/Rx';
// Routing Module and Components
import { LazyRoutingModule, rc } from './lazy-routing';

// Services, Pipes, Other
//import { ProjectsService } from './projects.service';


@NgModule({
  imports: [// SharedModule, 
  LazyRoutingModule ],
  declarations: [rc],
  providers: [ 
  ]
})

export class LazyModule { }
