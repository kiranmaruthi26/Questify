// exam-list.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  activeExams: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  ngOnInit(): void {
    this.fetchActiveExams();
  }

  fetchActiveExams(): void {
    // Simulate an API call with dummy data
    setTimeout(() => {
      this.activeExams = [
        {
          id: 1,
          title: 'Math Exam',
          description: 'This is a math exam for Grade 10 students.',
          startDate: new Date('2024-12-25')
        },
        {
          id: 2,
          title: 'Science Exam',
          description: 'This exam covers physics, chemistry, and biology.',
          startDate: new Date('2024-12-30')
        },
        {
          id: 3,
          title: 'History Exam',
          description: 'A comprehensive test on world history.',
          startDate: new Date('2025-01-05')
        }
      ];
      this.loading = false;
    }, 2000); // Simulate a 2-second delay
  }
}
