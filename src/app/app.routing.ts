import { RouterModule, Routes } from '@angular/router';

import { CloudComponent } from "./Cloud/cloud.component";
import { ItemComponent } from "./Cloud/item.component";
import { CourseComponent } from "./Cloud/course.component";
import { InputComponent } from "./Cloud/input.component";

const APP_ROUTES: Routes = [
  {path: '', component: CloudComponent, pathMatch: 'full'},
  {path: 'cloud/:name', component: CloudComponent},
  {path: 'item', component: ItemComponent},
  {path: 'course', component: CourseComponent},
  {path: 'input', component: InputComponent},
  {path: ':name', component: CloudComponent}
];

// export the router module with these routes added to it
export const routing = RouterModule.forRoot(APP_ROUTES);