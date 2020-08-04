import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { WallService } from '../shared/wall.service';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../shared/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Users } from '../../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails;
  searchField;
  columns=["WallName", "Creator FullName", "Creator UserName","Email","Date Created","Actions"];
  dataSource:MatTableDataSource<any>;
  walls=[];//all created walls for playing

  constructor(private router:Router, private service:UserService, private wallService:WallService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails=res;
        //console.log(this.userDetails);
      },
      err=>{
        console.log(err);
      }
    );
    this.wallService.getAllWalls().subscribe(
      res=>{
        this.walls=res;
        this.dataSource=new MatTableDataSource(this.walls);
        console.log(this.walls);
      }
    )
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
  }

