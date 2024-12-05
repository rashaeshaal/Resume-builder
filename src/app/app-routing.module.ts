import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeListComponent } from './components/resume-list/resume-list.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { ResumeDetailComponent } from './components/resume-detail/resume-detail.component';
import { ResumeEditComponent } from './resume-edit/resume-edit.component';
const routes: Routes = [
  { path: 'resumes', component: ResumeListComponent },
  { path: 'create-resume', component: ResumeFormComponent },
  { path: 'resumes/:id', component: ResumeDetailComponent }, 
  { path: '', redirectTo: '/resumes', pathMatch: 'full' },
  { path: 'edit/:id', component: ResumeEditComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
