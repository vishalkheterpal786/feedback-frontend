import { RouterModule, Routes } from '@angular/router';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { ShowFeedbackComponent } from './show-feedback/show-feedback.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add-feedback', pathMatch: 'full' },
  { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'show-feedback', component: ShowFeedbackComponent },
  { path: '**', redirectTo: 'add-feedback' },
];
