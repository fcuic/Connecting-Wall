import { Component, OnInit, Inject,EventEmitter,Output } from '@angular/core';
import { WallService } from '../shared/wall.service';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  wallID:string;
  constructor(private service:WallService,private userService:UserService,private toastr:ToastrService, public dialogRef:MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public receivedData:any) 
  {
    this.wallID=receivedData.wallID;
  }

  ngOnInit(): void {
    console.log(this.wallID);
    //this.service.getWallById(this.wallID)
  }

}
