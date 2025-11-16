import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/Feedback';
import { FeedbackListItem } from '../models/FeedbackListItem';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.baseUrl}/feedback`, feedback);
  }

  getFeedbackList(): Observable<FeedbackListItem[]> {
    return this.http.get<FeedbackListItem[]>(`${this.baseUrl}/feedback`);
  }
}
