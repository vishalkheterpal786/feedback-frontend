import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FeedbackService } from '../feedback.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss'],
})
export class AddFeedbackComponent {
  feedbackForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      contactType: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  submitForm() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.feedbackForm.invalid) return;

    this.feedbackService.submitFeedback(this.feedbackForm.value).subscribe({
      next: () => {
        this.successMessage = 'Feedback submitted successfully!';
        this.feedbackForm.reset();
        this.submitted = false;
      },
      error: () => {
        this.errorMessage = 'Failed to submit feedback. Try again.';
      },
    });
  }
}
