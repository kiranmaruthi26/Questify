import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-exams',
  templateUrl: './completed-exams.component.html',
  styleUrls: ['./completed-exams.component.css']
})
export class CompletedExamsComponent implements OnInit {
  loading: boolean = true;
  errorMessage: string | null = null;
  completedExams: { title: string, description: string, completionDate: Date, score: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    // Simulate data fetching
    setTimeout(() => {
      this.completedExams = [
        { title: 'Math Exam', description: 'Algebra and Geometry', completionDate: new Date(), score: 85 },
        { title: 'Science Exam', description: 'Physics and Chemistry', completionDate: new Date(), score: 92 }
      ];
      this.loading = false;
    }, 2000);

    // Handle error scenario
    // Uncomment below line to simulate an error
    // this.errorMessage = 'Failed to load completed exams.';
  }
}
