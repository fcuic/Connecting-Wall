import { Component, OnInit, Inject} from '@angular/core';
import { WallService } from '../shared/wall.service';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Term } from '../../models/term.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {CountdownModule, CountdownConfig} from 'ngx-countdown';
import {Howl} from 'howler';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
//#region WallData
  wallID:string;
  wallDetails:any;
  wallName:string;
  terms:Array<Term>;
  sortedTerms:Array<Term>;
  termA1={} as Term;
  termA2={} as Term;
  termA3={} as Term;
  termA4={} as Term;
  termB1={} as Term;
  termB2={} as Term;
  termB3={} as Term;
  termB4={} as Term;
  termC1={} as Term;
  termC2={} as Term;
  termC3={} as Term;
  termC4={} as Term;
  termD1={} as Term;
  termD2={} as Term;
  termD3={} as Term;
  termD4={} as Term;
  //#endregion
//#region Score and countdown
  score:number=0;
  //#endregion
  //#region on Click event
 isClickedtile1=false;
 isClickedtile2=false;
 isClickedtile3=false;
 isClickedtile4=false;
 isClickedtile5=false;
 isClickedtile6=false;
 isClickedtile7=false;
 isClickedtile8=false;
 isClickedtile9=false;
 isClickedtile10=false;
 isClickedtile11=false;
 isClickedtile12=false;
 isClickedtile13=false;
 isClickedtile14=false;
 isClickedtile15=false;
 isClickedtile16=false;
 //#endregion
 //#region sound variables/effects
  successSound=new Howl({
    src:['../../assets/soundEffects/success.mp3'],
    volume: 1
  });
  chosenSound=new Howl({
    src:['../../assets/soundEffects/match.wav'],
    volume: 0.2
  });
  wrongSound=new Howl({
    src:['../../assets/soundEffects/wrong.mp3'],
    volume: 0.5
  });
 //#endregion
 //#region Quiz Variables
 numOfClickedTerms=0;
 firstGroup=[];
 matchedProperly=false; //varijabla za sakrivanje matchanih pojmova
 numOfPairedGroupTerms=0;
 numOfLives=3;
 firstLifeWasted=false;//for displaying hearts
 secondLifeWasted=false;
 thirdLifeWasted=false;
 showLives=false; //should be activated when 2 groups are paired
 gameOver=false; //game over za html
 guessedConnection1=null; //strings for guessing connections
 guessedConnection2=null;
 guessedConnection3=null;
 guessedConnection4=null;
 //variables that check how user finished grouping
 successfullyGroupedTheTerms=false;
 wastedLives=false;
 ranOutOfTime=false;
 goToConnectionGuessing=false;
 firstConnectionGuessed=false; //variables which check whether user guessed connections
 secondConnectionGuessed=false;
 thirdConnectionGuessed=false;
 fourthConnectionGuessed=false;
 //#endregion


  constructor(private service:WallService,private userService:UserService,private toastr:ToastrService, public dialogRef:MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public receivedData:any,private dialog:MatDialog) 
  {
    this.wallID=this.receivedData.wallID;
  }

  ngOnInit(): void {
    //#region DataGetting
    this.service.getWallById(this.wallID).subscribe(
      res=>
      {
        this.wallDetails=res;
        this.wallName=this.wallDetails.wallName;
        this.termA1.termName=this.wallDetails.groupATerms[0].termName;
        this.termA1.connectionName=this.wallDetails.groupAConnections[0].connectionName;
        this.termA2.termName=this.wallDetails.groupATerms[1].termName;
        this.termA2.connectionName=this.wallDetails.groupAConnections[0].connectionName;
        this.termA3.termName=this.wallDetails.groupATerms[2].termName;
        this.termA3.connectionName=this.wallDetails.groupAConnections[0].connectionName;
        this.termA4.termName=this.wallDetails.groupATerms[3].termName;
        this.termA4.connectionName=this.wallDetails.groupAConnections[0].connectionName;
        this.termB1.termName=this.wallDetails.groupBTerms[0].termName;
        this.termB1.connectionName=this.wallDetails.groupBConnections[0].connectionName;
        this.termB2.termName=this.wallDetails.groupBTerms[1].termName;
        this.termB2.connectionName=this.wallDetails.groupBConnections[0].connectionName;
        this.termB3.termName=this.wallDetails.groupBTerms[2].termName;
        this.termB3.connectionName=this.wallDetails.groupBConnections[0].connectionName;
        this.termB4.termName=this.wallDetails.groupBTerms[3].termName;
        this.termB4.connectionName=this.wallDetails.groupBConnections[0].connectionName;
        this.termC1.termName=this.wallDetails.groupCTerms[0].termName;
        this.termC1.connectionName=this.wallDetails.groupCConnections[0].connectionName;
        this.termC2.termName=this.wallDetails.groupCTerms[1].termName;
        this.termC2.connectionName=this.wallDetails.groupCConnections[0].connectionName;
        this.termC3.termName=this.wallDetails.groupCTerms[2].termName;
        this.termC3.connectionName=this.wallDetails.groupCConnections[0].connectionName;
        this.termC4.termName=this.wallDetails.groupCTerms[3].termName;
        this.termC4.connectionName=this.wallDetails.groupCConnections[0].connectionName;
        this.termD1.termName=this.wallDetails.groupDTerms[0].termName;
        this.termD1.connectionName=this.wallDetails.groupDConnections[0].connectionName;
        this.termD2.termName=this.wallDetails.groupDTerms[1].termName;
        this.termD2.connectionName=this.wallDetails.groupDConnections[0].connectionName;
        this.termD3.termName=this.wallDetails.groupDTerms[2].termName;
        this.termD3.connectionName=this.wallDetails.groupDConnections[0].connectionName;
        this.termD4.termName=this.wallDetails.groupDTerms[3].termName;
        this.termD4.connectionName=this.wallDetails.groupDConnections[0].connectionName;
        this.terms = [ 
          this.termA1,this.termA2,this.termA3,this.termA4, //array that is displayed
          this.termB1,this.termB2,this.termB3,this.termB4,
          this.termC1,this.termC2,this.termC3,this.termC4,
          this.termD1,this.termD2,this.termD3,this.termD4
        ];
        this.sortedTerms=[
          this.termA1,this.termA2,this.termA3,this.termA4,//for displaying when matching is done!
          this.termB1,this.termB2,this.termB3,this.termB4,
          this.termC1,this.termC2,this.termC3,this.termC4,
          this.termD1,this.termD2,this.termD3,this.termD4
        ];
        console.log(this.sortedTerms);
        console.log(this.Shuffle(this.terms));
      },
      err=>
      {
        console.log(err);
      } 
    );
    //#endregion
    //#region Variable to check whather the group is done
    numOfPairedGroupTerms:Number;
    //#endregion
  }
  Shuffle(Array)//Fisher-Yates shuffle, u dokumentu opisat kako funkcionira
  {
   var currentIndex=Array.length;
   var tempValue,randomIndex;
   while(currentIndex!=0)
   {
      randomIndex=Math.floor(Math.random()*currentIndex);
      currentIndex--;
      tempValue=Array[currentIndex];
      Array[currentIndex]=Array[randomIndex];
      Array[randomIndex]=tempValue;
   }
   return Array;
  }
  timesUp(event) //istek vremena
  {
    if(event.action=="done")
    {
      console.log("Time expired!");
      this.gameOver=true;
      this.ranOutOfTime=true;
    }
  }
  checkForTermMatch(array)
  {
   const allEqual=array=>array.every(v=>v===array[0]);//checks if all array elements are equal - function allEqual(array)
    if(array.length==4 && allEqual(array)==true)
    {
      var Connection=array[0];
      console.log("Konekcija :"+Connection);
      console.log("Matched properly!");
      this.score++;
      this.numOfPairedGroupTerms++;
      console.log(this.numOfPairedGroupTerms);
      this.numOfClickedTerms=0;
      this.successSound.play();
      this.hideElement(Connection);
      this.AllIsUnclicked();
      if(this.numOfPairedGroupTerms==2)
      {
        this.showLives=true; //pokazi zivote
      }

      if(this.numOfPairedGroupTerms==3)
      {
        this.score=4;
        this.gameOver=true; //idi na pogađanje konekcija
        this.successfullyGroupedTheTerms=true;
      }
    }
    else if(array.length==4 && allEqual(array)==false)
    {
      console.log("Not matched properly!");
      this.wrongSound.play();
      this.AllIsUnclicked();
      this.numOfClickedTerms=0;
      if(this.numOfPairedGroupTerms>=2)
      {
        this.numOfLives--;
        console.log("Lives:"+this.numOfLives);
        if(this.numOfLives==2)
        {
          this.firstLifeWasted=true;
        }
        else if(this.numOfLives==1)
        {
          this.secondLifeWasted=true;
        }
        else if(this.numOfLives==0)
        {
          this.thirdLifeWasted=true;
          console.log("Game Over");//ovdje funkcija za game over
          this.gameOver=true;
          this.wastedLives=true;
        }
      }
    }
  }
  hideElement(connectionName)
  {
   var elms=document.querySelectorAll("[id='"+connectionName+"']");//sick
   console.log(elms);
   for(var i=0;i<elms.length;i++)
   {
    elms[i].className="tile NotClickable";
   }

  }
  AllIsUnclicked()//kad zezne, postavlja sve clickove u false!!
  {
    this.isClickedtile1=false;
    this.isClickedtile2=false;
    this.isClickedtile3=false;
    this.isClickedtile4=false;
    this.isClickedtile5=false;
    this.isClickedtile6=false;
    this.isClickedtile7=false;
    this.isClickedtile8=false;
    this.isClickedtile9=false;
    this.isClickedtile10=false;
    this.isClickedtile11=false;
    this.isClickedtile12=false;
    this.isClickedtile13=false;
    this.isClickedtile14=false;
    this.isClickedtile15=false;
    this.isClickedtile16=false;
  }

  PushInCheckArray(event,isClicked)
  {
    var con=this.getTermConnection(event);
    if(isClicked==true)
    {
    if(con=="")
    {
      this.toastr.warning("Please Unselect and Select the term again","Could not get ID of clicked Term!");
    }
    this.numOfClickedTerms++;
    this.firstGroup.push(con);
    console.log(this.firstGroup);
    console.log(this.numOfClickedTerms);
      if(this.firstGroup.length==4)
      {
        this.checkForTermMatch(this.firstGroup);
        this.firstGroup=[];
        console.log(this.firstGroup);
      }
    }
    else if(isClicked==false)
    {
      this.numOfClickedTerms--;
      this.firstGroup.splice(this.numOfClickedTerms,1);
      console.log(this.firstGroup);
      console.log(this.numOfClickedTerms);
    }
  }
  
  getTermConnection(event)
  {
    var conn;
    conn=event.target.id;
    return conn;
  }
  getParagraphText(event)
  {
    var conn;
    conn=event.target.firstElementChild.innerHTML;
    console.log(conn);
  }
  //functions for getting connections written in input
  getConnection1()
  {
    var conn=(<HTMLInputElement>document.getElementById("conn1")).value;
    this.guessedConnection1=conn;
    if(this.guessedConnection1==this.termA1.connectionName)
    {
      this.score++;
      this.successSound.play();
    }
    else
    {
      this.wrongSound.play();
    }
    this.firstConnectionGuessed=true;
    console.log(this.guessedConnection1);
  }
  getConnection2()
  {
    var conn=(<HTMLInputElement>document.getElementById("conn2")).value;
    this.guessedConnection2=conn;
    if(this.guessedConnection2==this.termB1.connectionName)
    {
      this.score++;
      this.successSound.play();
    }
    else
    {
      this.wrongSound.play();
    }
    
    this.secondConnectionGuessed=true;
    console.log(this.guessedConnection2);
  }
  getConnection3()
  {
    var conn=(<HTMLInputElement>document.getElementById("conn3")).value;
    this.guessedConnection3=conn;
    if(this.guessedConnection3==this.termC1.connectionName)
    {
      this.score++;
      this.successSound.play();
    }
    else
    {
      this.wrongSound.play();
    }
    this.thirdConnectionGuessed=true;
    console.log(this.guessedConnection3);
  }
  getConnection4()
  {
    var conn=(<HTMLInputElement>document.getElementById("conn4")).value;
    this.guessedConnection4=conn;
    if(this.guessedConnection4==this.termD1.connectionName)
    {
      this.score++;
      this.successSound.play();
    }
    else
    {
      this.wrongSound.play();
    }
    this.fourthConnectionGuessed=true;
    console.log(this.guessedConnection4);
  }
}
