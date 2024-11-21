import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private baseUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) {}

  getQuestions(amount: number = 10, category: string = '', difficulty: string = ''): Observable<any> {
    let url = `${this.baseUrl}?amount=${amount}`;
    if (category && category !== 'any') {
      url += `&category=${category}`;
    }
    if (difficulty && difficulty !== 'any') {
      url += `&difficulty=${difficulty}`;
    }
    return this.http.get(url);
  }
}
