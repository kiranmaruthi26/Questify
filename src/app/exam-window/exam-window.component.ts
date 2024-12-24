import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-window',
  templateUrl: './exam-window.component.html',
  styleUrls: ['./exam-window.component.css']
})
export class ExamWindowComponent implements OnInit, OnDestroy {
  @ViewChild('webcam') webcamElement!: ElementRef;
  @ViewChild('examContainer') examContainer!: ElementRef;

  questions: any[] = [];
  userResponses: { [key: string]: any } = {};
  isSubmitting: boolean = false;
  timer: number = 50; // Example: 10 minutes in seconds
  timerInterval: any;
  webcamStarted: boolean = false;
  timeLeft: string = '';
  isFullScreen: boolean = true;
  examId: string = '';
  score: number = 0; // Property to store the calculated score

  constructor(private route: ActivatedRoute, private examService: ExamService) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('sys_id') || '';
    this.startWebcam();
    this.monitorFullScreen();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
    this.stopWebcam();
  }

  startWebcam(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.webcamElement.nativeElement.srcObject = stream;
        this.webcamElement.nativeElement.play();
        this.webcamStarted = true;
        this.enterFullScreen();
        this.loadQuestions();
        this.startTimer();
      })
      .catch((error) => {
        console.error('Webcam access denied', error);
        alert('Webcam is required to start the exam. Please allow webcam access.');
      });
  }

  stopWebcam(): void {
    const stream = this.webcamElement.nativeElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => track.stop());
    }
  }

  enterFullScreen(): void {
    const container = this.examContainer.nativeElement;
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    }
  }

  monitorFullScreen(): void {
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
    });
  }

  loadQuestions(): void {
    this.examService.fetchQuestions(this.examId).subscribe({
      next: (response) => {
        this.questions = response.result.questions; // Assuming questions include correct answers
      },
      error: (error) => {
        console.error('Error fetching questions', error);
      }
    });
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateFormattedTime();
      } else {
        this.autoSubmit();
      }
    }, 1000);
  }

  autoSubmit(): void {
    clearInterval(this.timerInterval);
    this.evaluateScore(); // Calculate score before auto-submission
    this.submitExam(true);
  }

  submitExam(autoSubmit = false): void {
    this.isSubmitting = true;

    // Evaluate the score before manual submission
    this.evaluateScore();
    console.log(this.score);

    const payload = {
      responses: Object.entries(this.userResponses).map(([questionId, response]) => ({
        questionId,
        response
      })),
      score: this.score // Include the calculated score in the payload
    };

    console.log(payload);

    this.examService.submitResponses(payload).subscribe({
      next: () => {
        if (autoSubmit) {
          alert(`Time is up! Exam auto-submitted. Your score: ${this.score}`);
        } else {
          alert(`Exam submitted successfully! Your score: ${this.score}`);
        }
        this.isSubmitting = false;
        this.stopWebcam();
      },
      error: (error) => {
        console.error('Error submitting exam', error);
        alert('Failed to submit exam.');
        this.isSubmitting = false;
      }
    });
  }

  evaluateScore(): void {
    this.score = 0; // Reset score before evaluation
    this.questions.forEach((question) => {
      console.log(question.id);
      console.log(this.userResponses[question.id]);
      const userAnswer = this.userResponses[question.id];
      if (userAnswer && userAnswer == question.answer) {
        this.score += question.points || 1; // Increment score by question points or default to 1
      }
    });
  }

  updateFormattedTime(): void {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
