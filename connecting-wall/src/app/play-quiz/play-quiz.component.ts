import { Component, OnInit, Inject,EventEmitter,Output } from '@angular/core';
import { WallService } from '../shared/wall.service';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import {Router} from '@angular/router';
@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  wallID:string;
  wallsUser:string;
  wallName:string;
  WallDetails:any;
  constructor(private service:WallService,private userService:UserService,private toastr:ToastrService, public dialogRef:MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public receivedData:any,private router:Router,private dialog:MatDialog) 
  {
    this.wallID=receivedData.wallID;
  }

  ngOnInit(): void {
    this.service.getWallById(this.wallID).subscribe(
       res=>{
        this.WallDetails=res;
        this.wallsUser=this.WallDetails.user.userName;
        this.wallName=this.WallDetails.wallName;
        console.log(this.wallsUser);
       },
       err=>
       {
         console.log(err);
       } 
    );
  }
  onClose()
  {
    this.dialogRef.close();
    this.router.navigate(['home']);
  }
}
