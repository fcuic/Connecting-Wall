import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {

  Started:boolean=false;
  constructor(public dialogRef:MatDialogRef<HomeComponent>,private router:Router) { }

  ngOnInit(): void {
  }

  OnStart()
  {
    this.Started=true;
    console.log("prva");
  }
  StartTimer(){
    console.log("druga");
  }
  onClose()
  {
    this.dialogRef.close();
    this.router.navigate(['home']);
  }

}
