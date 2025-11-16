import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackListItem } from '../models/FeedbackListItem';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

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
    this.feedbackService
      .getFeedbackList()
      .pipe(
        map((data) =>
          [...data].sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeA - timeB;
          })
        )
      )
      .subscribe({
        next: (sorted) => {
          this.feedbackList = sorted;
          this.applyFilterAndSort();
        },
        error: (err) => console.error('Failed to load feedback:', err),
      });
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
    this.applyFilterAndSort();
  }

  applyFilterAndSort(): void {
    this.filteredList = this.feedbackList
      .filter((f) => {
        if (!this.filterType) return true;
        return f.contactType.toLowerCase() === this.filterType.toLowerCase();
      })
      .map((f) => ({
        ...f,
        _time: f.createdAt ? new Date(f.createdAt).getTime() : 0,
      }))
      .sort((a, b) => {
        const diff = a._time - b._time;
        return this.sortAscending ? diff : -diff;
      })
      // Remove helper field
      .map(({ _time, ...rest }) => rest);
  }
}
