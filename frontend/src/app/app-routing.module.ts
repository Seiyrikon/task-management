import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTableComponent } from './components/main-content/task-table/task-table.component';
import { TaskFormComponent } from './components/main-content/task-form/task-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: 'tasks', component: TaskTableComponent},
  {path: 'add-task', component: TaskFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }