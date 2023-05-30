import { Component, OnInit, Inject, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Howl } from 'howler';
import { GroupConnection, Term } from 'src/models/wall';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  //#region WallData
  @Input() wall:any = '';
  @Input() user:any = '';

  wallID: string;
  wallDetails: any;
  wallName: string;
  terms: Array<Term>;
  sortedTerms: Array<Term>;
  termA1 = {} as Term;
  termA2 = {} as Term;
  termA3 = {} as Term;
  termA4 = {} as Term;
  termB1 = {} as Term;
  termB2 = {} as Term;
  termB3 = {} as Term;
  termB4 = {} as Term;
  termC1 = {} as Term;
  termC2 = {} as Term;
  termC3 = {} as Term;
  termC4 = {} as Term;
  termD1 = {} as Term;
  termD2 = {} as Term;
  termD3 = {} as Term;
  termD4 = {} as Term;

  //#endregion

  //#region Score and countdown

  score: number = 0;

  //#endregion
  
  //#region on Click event

  isClickedtile1 = false;
  isClickedtile2 = false;
  isClickedtile3 = false;
  isClickedtile4 = false;
  isClickedtile5 = false;
  isClickedtile6 = false;
  isClickedtile7 = false;
  isClickedtile8 = false;
  isClickedtile9 = false;
  isClickedtile10 = false;
  isClickedtile11 = false;
  isClickedtile12 = false;
  isClickedtile13 = false;
  isClickedtile14 = false;
  isClickedtile15 = false;
  isClickedtile16 = false;

  //#endregion
  
  //#region sound variables/effects

  successSound = new Howl({
    src: ['../../assets/soundEffects/success.mp3'],
    volume: 1,
  });
  chosenSound = new Howl({
    src: ['../../assets/soundEffects/match.wav'],
    volume: 0.2,
  });
  wrongSound = new Howl({
    src: ['../../assets/soundEffects/wrong.mp3'],
    volume: 0.5,
  });

  //#endregion
  
  //#region Quiz Variables

  numOfClickedTerms = 0;
  group = [];
  matchedProperly = false; //varijabla za sakrivanje matchanih pojmova
  numOfPairedGroupTerms : number = 0;
  numOfLives = 3;
  firstLifeWasted = false; //for displaying hearts
  secondLifeWasted = false;
  thirdLifeWasted = false;
  showLives = false; //should be activated when 2 groups are paired
  gameOver = false; //game over za html
  guessedConnection1 = null; //strings for guessing connections
  guessedConnection2 = null;
  guessedConnection3 = null;
  guessedConnection4 = null;
  //variables that check how user finished grouping
  successfullyGroupedTheTerms = false;
  wastedLives = false;
  ranOutOfTime = false;
  goToConnectionGuessing = false;
  firstConnectionGuessed = false; //variables which check whether user guessed connections
  secondConnectionGuessed = false;
  thirdConnectionGuessed = false;
  fourthConnectionGuessed = false;

  //#endregion

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {
    this.wallID = this.receivedData.wallID;
  }

  ngOnInit(): void {
    //#region DataGetting
    let groupConnections : Array<GroupConnection> = this.wall.groupConnections;
    let terms2d = groupConnections.map(x => x.terms);
    this.sortedTerms = [].concat(...terms2d);
    this.terms = this.Shuffle([].concat(...terms2d))
    console.log(this.terms);
    //#endregion
  }

  Shuffle(
    Array //Fisher-Yates shuffle, u dokumentu opisat kako funkcionira
  ) {
    var currentIndex = Array.length;
    var tempValue, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      tempValue = Array[currentIndex];
      Array[currentIndex] = Array[randomIndex];
      Array[randomIndex] = tempValue;
    }
    return Array;
  }

  timesUp(
    event //istek vremena
  ) {
    if (event.action == 'done') {
      console.log('Time expired!');
      this.gameOver = true;
      this.ranOutOfTime = true;
    }
  }

  checkForTermMatch(array) {
    const allEqual = (array) => array.every((v) => v === array[0]); //checks if all array elements are equal - function allEqual(array)
    if (array.length == 4 && allEqual(array) == true) {
      var Connection = array[0];
      this.score++;
      this.numOfPairedGroupTerms++;
      console.log(this.numOfPairedGroupTerms);
      this.numOfClickedTerms = 0;
      this.successSound.play();
      this.hideElements(Connection);
      this.AllIsUnclicked();
      if (this.numOfPairedGroupTerms == 2) {
        this.showLives = true; //pokazi zivote
      }

      if (this.numOfPairedGroupTerms == 3) {
        this.score = 4;
        this.gameOver = true; //idi na pogađanje konekcija
        this.successfullyGroupedTheTerms = true;
      }
    } else if (array.length == 4 && allEqual(array) == false) {
      console.log('Not matched properly!');
      this.wrongSound.play();
      this.AllIsUnclicked();
      this.numOfClickedTerms = 0;
      if (this.numOfPairedGroupTerms >= 2) {
        this.numOfLives--;
        console.log('Lives:' + this.numOfLives);
        if (this.numOfLives == 2) {
          this.firstLifeWasted = true;
        } else if (this.numOfLives == 1) {
          this.secondLifeWasted = true;
        } else if (this.numOfLives == 0) {
          this.thirdLifeWasted = true;
          console.log('Game Over'); //ovdje funkcija za game over
          this.gameOver = true;
          this.wastedLives = true;
        }
      }
    }
  }

  hideElements(connectionName) {
    var elms = document.querySelectorAll("[id='" + connectionName + "']"); //sick
    console.log(elms);
    for (var i = 0; i < elms.length; i++) {
      elms[i].className = 'tile NotClickable';
    }
  }

  AllIsUnclicked() { //kad zezne, postavlja sve clickove u false!!
    this.isClickedtile1 = false;
    this.isClickedtile2 = false;
    this.isClickedtile3 = false;
    this.isClickedtile4 = false;
    this.isClickedtile5 = false;
    this.isClickedtile6 = false;
    this.isClickedtile7 = false;
    this.isClickedtile8 = false;
    this.isClickedtile9 = false;
    this.isClickedtile10 = false;
    this.isClickedtile11 = false;
    this.isClickedtile12 = false;
    this.isClickedtile13 = false;
    this.isClickedtile14 = false;
    this.isClickedtile15 = false;
    this.isClickedtile16 = false;
  }

  PushInCheckArray(term, isClicked) {
    if (isClicked == true) {
      this.numOfClickedTerms++;
      this.group.push(term);
      if (this.group.length == 4) {
        this.checkForTermMatch(this.group);
        this.group = [];
      }
    } 
    else if (isClicked == false) {
      this.numOfClickedTerms--;
      this.group.splice(this.numOfClickedTerms, 1);
    }
  }

  getTermConnection(event) {
    var conn;
    conn = event.target.id;
    return conn;
  }

  getParagraphText(event) {
    var conn;
    conn = event.target.firstElementChild.innerHTML;
    console.log(conn);
  }

  //functions for getting connections written in input
  getConnection1() {
    var conn = (<HTMLInputElement>document.getElementById('conn1')).value;
    this.guessedConnection1 = conn;
    if (this.guessedConnection1 == this.termA1.groupConnectionId) {
      this.score++;
      this.successSound.play();
    } else {
      this.wrongSound.play();
    }
    this.firstConnectionGuessed = true;
    console.log(this.guessedConnection1);
  }

  getConnection2() {
    var conn = (<HTMLInputElement>document.getElementById('conn2')).value;
    this.guessedConnection2 = conn;
    if (this.guessedConnection2 == this.termB1.groupConnectionId) {
      this.score++;
      this.successSound.play();
    } else {
      this.wrongSound.play();
    }

    this.secondConnectionGuessed = true;
    console.log(this.guessedConnection2);
  }

  getConnection3() {
    var conn = (<HTMLInputElement>document.getElementById('conn3')).value;
    this.guessedConnection3 = conn;
    if (this.guessedConnection3 == this.termC1.groupConnectionId) {
      this.score++;
      this.successSound.play();
    } else {
      this.wrongSound.play();
    }
    this.thirdConnectionGuessed = true;
    console.log(this.guessedConnection3);
  }

  getConnection4() {
    var conn = (<HTMLInputElement>document.getElementById('conn4')).value;
    this.guessedConnection4 = conn;
    if (this.guessedConnection4 == this.termD1.groupConnectionId) {
      this.score++;
      this.successSound.play();
    } else {
      this.wrongSound.play();
    }
    this.fourthConnectionGuessed = true;
    console.log(this.guessedConnection4);
  }

  checkIfUserGuessedAllConnections() {
    if (
      this.guessedConnection1 != null &&
      this.guessedConnection2 != null &&
      this.guessedConnection3 != null &&
      this.guessedConnection4 != null
    ) {
      return true;
    } else {
      return false;
    }
  }

}
