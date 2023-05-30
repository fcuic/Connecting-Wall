import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { WallService } from '../shared/wall.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css'],
})
export class QuizStartComponent implements OnInit {
  Started: boolean = false;
  wall: any;
  userDetails : any;
  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    private router: Router,
    private wallService: WallService,
    private userService : UserService,
    @Inject(MAT_DIALOG_DATA) public receivedData: { wallID: string }
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.wallService
      .getWallDetails(this.receivedData.wallID)
      .subscribe((res) => {
        this.wall = res;
      });
  }

  OnStart() {
    this.Started = true;
  }
  onClose() {
    this.dialogRef.close();
    this.router.navigate(['home']);
  }
}
