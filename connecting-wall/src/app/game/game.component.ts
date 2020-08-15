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
    volume: 1
  });
  wrongSound=new Howl({
    src:['../../assets/soundEffects/wrong.mp3'],
    volume: 0.5
  });
 //#endregion


  constructor(private service:WallService,private userService:UserService,private toastr:ToastrService, public dialogRef:MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public receivedData:any,private dialog:MatDialog) 
  {
    this.wallID=this.receivedData.wallID;
  }

  ngOnInit(): void {
    //#region DataGetting
    console.log(this.wallID);
    this.service.getWallById(this.wallID).subscribe(
      res=>
      {
        this.wallDetails=res;
        this.wallName=this.wallDetails.wallName;
        console.log(this.wallDetails);
        console.log(this.wallDetails.groupATerms[0].termName)
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
        this.terms = [ this.termA1,this.termA2,this.termA3,this.termA4,
                      this.termB1,this.termB2,this.termB3,this.termB4,
                      this.termC1,this.termC2,this.termC3,this.termC4,
                      this.termD1,this.termD2,this.termD3,this.termD4
        ];
        console.log(this.Shuffle(this.terms));
        
      },
      err=>
      {
        console.log(err);
      } 
    );
    //#endregion
    //#region Audio testing
    //example of sound effect
    /*var sound = new Howl({
      src: ['../../assets/soundEffects/match.wav']
    });
    sound.volume(1);
    sound.play();*/
    
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
    }
  }
  

}
