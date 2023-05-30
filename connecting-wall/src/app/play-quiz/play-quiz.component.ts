import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css'],
})
export class PlayQuizComponent implements OnInit {
  @Input() wall:any = '';

  constructor() {}

  ngOnInit(): void {
  }
}
