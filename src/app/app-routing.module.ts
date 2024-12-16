import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ToDoComponent } from './to-do/to-do.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'to-do',
    component: ToDoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
