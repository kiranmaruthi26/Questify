import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamWindowComponent } from './exam-window/exam-window.component';
import { CompletedExamsComponent } from './completed-exams/completed-exams.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'exam-list', component: ExamListComponent, canActivate: [AuthGuard] },
  { path: 'exam-window/:sys_id', component: ExamWindowComponent, canActivate: [AuthGuard] },
  { path: 'results', component: CompletedExamsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
