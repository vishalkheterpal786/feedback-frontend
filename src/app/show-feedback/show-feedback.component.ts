import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackListItem } from '../models/FeedbacklistItem';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.scss'],
})
export class ShowFeedbackComponent implements OnInit {
  feedbackList: FeedbackListItem[] = [];
  filteredList: FeedbackListItem[] = [];
  sortAscending: boolean = true;
  filterType: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.feedbackService.getFeedbackList().subscribe({
      next: (data: FeedbackListItem[]) => {
        // Sort initially by date ascending
        this.feedbackList = data.sort(
          (a, b) =>
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        );
        this.applyFilterAndSort();
      },
      error: (err) => console.error(err),
    });
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
    this.applyFilterAndSort();
  }

  applyFilterAndSort(): void {
    // Filter by contact type if selected
    this.filteredList = this.feedbackList
      .filter((f) =>
        this.filterType ? f.contactType === this.filterType : true
      )
      .sort((a, b) => {
        const diff =
          new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
        return this.sortAscending ? diff : -diff;
      });
  }
}
