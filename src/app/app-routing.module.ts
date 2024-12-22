import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { CompletedExamsComponent } from './completed-exams/completed-exams.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'exam-list', component:ExamListComponent},
  {path:'results', component:CompletedExamsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
