// exam-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  activeExams: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.fetchActiveExams();
  }

  fetchActiveExams(): void {
    this.examService.getActiveExams().subscribe(
      (response: any) => {
        console.log('API Response:', response);

        // Assuming the data is within a "result" field in the response
        if (Array.isArray(response)) {
          this.activeExams = response; // Direct array response
        } else if (response && response.result) {
          this.activeExams = response.result; // Nested structure
        } else {
          this.activeExams = [];
          this.errorMessage = 'No exams found in the response.';
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load active exams. Please try again later.';
        this.loading = false;
        console.error('Error fetching active exams:', error);
      }
    );
  }
}
