import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { WallService } from '../shared/wall.service';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../shared/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Users } from '../../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { EditWallComponent } from '../edit-wall/edit-wall.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent implements OnInit {

  constructor(private router:Router,private service:WallService,private userService:UserService,private http:HttpClient,private dialog:MatDialog, private toastr:ToastrService) 
  {
    
  }
  readonly BaseURI = 'http://localhost:57392/api';
  WallDetails:any;
  userDetails;//for user id!
  userID:any;
  searchField;
  columns=["WallName", "Creator FullName", "Creator UserName","Email","Date Created","Actions"];
  dataSource:MatTableDataSource<any>;

  walls=[];

 
  ngOnInit(): void {
    this.userService.getUserProfile().pipe(
      switchMap(res => {
        this.userDetails = res;
        this.userID = this.userDetails.id;
        return this.service.getQuizByUserId(this.userID)
      })
   ).subscribe(res => {
       this.walls = res;
       this.dataSource=new MatTableDataSource(this.walls);
       console.log(res);
    });

  }

  applyFilter(filterValue:string){
    filterValue=filterValue.trim();//whitespace removal
    filterValue=filterValue.toLowerCase();//datasource lowercase by default
    this.dataSource.filter=filterValue;
  }

  clearSearchField() {
    this.searchField = '';
  }
  
  onLogout()
  {
    localStorage.removeItem('token');//removing user token from local storage
    this.router.navigate(['/user/login']);
  }
  DeleteWall(wallId:string):void{
    if(confirm("Are you sure you want to delete this wall?")){
      this.service.deleteWall(wallId).subscribe(_ =>{
        this.walls=this.walls.filter(eachWall=>eachWall.wallID!==wallId);
        this.toastr.success('Wall Deleted!','Wall Deletion Successful!');
      });
    }
  }
  editWall(wallID:string)//editing created walls!
  {
    //this.router.navigate(['/edit',wallID]);
    this.WallDetails=this.service.getWallById(wallID).subscribe(//zato sto vraca observable bez subscribea
      res=>{
        this.WallDetails=res;
        //console.log(this.WallDetails.groupATerms[0].termName);
        //console.log(this.WallDetails.groupBTerms[0].termName);
        this.service.populateForm(this.WallDetails);
      }
    );

    //console.log(this.service.getWallById(wallID));
    //console.log(this.WallDetails);
    //console.log(this.WallDetails.wallName);
    //this.service.populateForm(this.service.getWallById(wallID));
    //populateForm(this.walls.id)
    const dialogConfig=new MatDialogConfig();
   // dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.width="1000px";
    dialogConfig.height="800px";
    this.dialog.open(EditWallComponent,dialogConfig);
  }

  
}

