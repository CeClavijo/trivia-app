import { Component } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage {
  categories = [
    { id: '', name: 'Any Category' },
    { id: '9', name: 'General Knowledge' },
    { id: '10', name: 'Entertainment: Books' },
    { id: '11', name: 'Entertainment: Film' },
    { id: '12', name: 'Entertainment: Music' },
    { id: '13', name: 'Entertainment: Musicals & Theatres' },
    { id: '14', name: 'Entertainment: Television' },
    { id: '15', name: 'Entertainment: Video Games' },
    { id: '16', name: 'Entertainment: Board Games' },
    { id: '17', name: 'Science & Nature' },
    { id: '18', name: 'Science: Computers' },
    { id: '19', name: 'Science: Mathematics' },
    { id: '20', name: 'Mythology' },
    { id: '21', name: 'Sports' },
    { id: '22', name: 'Geography' },
    { id: '23', name: 'History' },
    { id: '24', name: 'Politics' },
    { id: '25', name: 'Art' },
    { id: '26', name: 'Celebrities' },
    { id: '27', name: 'Animals' },
    { id: '28', name: 'Vehicles' },
    { id: '29', name: 'Entertainment: Comics' },
    { id: '30', name: 'Science: Gadgets' },
    { id: '31', name: 'Entertainment: Japanese Anime & Manga' },
    { id: '32', name: 'Entertainment: Cartoon & Animations' },
  ];
  difficulties = ['Any Difficulty', 'Easy', 'Medium', 'Hard'];

  selectedCategory = '';
  selectedDifficulty = '';
  questions: any[] = [];
  currentQuestionIndex = 0;
  isAnswered = false;
  isPlaying = false;
  shuffledAnswers: string[] = [];
  correctAnswers = 0; // Track correct answers
  totalQuestions = 0; // Track total number of questions
  isGameOver = false; // Flag to indicate game is over

  constructor(private triviaService: TriviaService) {}

  startGame() {
    this.correctAnswers = 0; // Reset score
    this.isGameOver = false;
    this.triviaService
      .getQuestions(10, this.selectedCategory, this.selectedDifficulty)
      .subscribe((data) => {
        this.questions = data.results;
        this.totalQuestions = this.questions.length; // Total questions count
        this.currentQuestionIndex = 0;
        this.isPlaying = true;
        this.shuffleAnswers();
      });
  }

  shuffleAnswers() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (!currentQuestion) return;
    const allAnswers = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ];
    this.shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
  }

  selectAnswer(answer: string) {
    if (this.isAnswered) return; // Prevent multiple selections
    this.isAnswered = true;
    const currentQuestion = this.questions[this.currentQuestionIndex];
    currentQuestion.selectedAnswer = answer;
    currentQuestion.isCorrect = answer === currentQuestion.correct_answer;
    if (currentQuestion.isCorrect) {
      this.correctAnswers++; // Increment score for correct answer
    }
  }

  getButtonColor(answer: string): string {
    if (!this.isAnswered) return 'light';
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) return 'success';
    if (answer === currentQuestion.selectedAnswer) return 'danger';
    return 'light';
  }

  continue() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.shuffleAnswers();
    } else {
      this.isGameOver = true; // End game after last question
      this.isPlaying = false;
    }
  }

  returnToMenu() {
    this.isPlaying = false;
    this.questions = [];
    this.correctAnswers = 0;
    this.totalQuestions = 0;
    this.isGameOver = false;
  }
}
