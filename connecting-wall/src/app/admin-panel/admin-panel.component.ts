import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../shared/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Users } from '../../models/users';
import { WallService } from '../shared/wall.service';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
/*import {FormControl} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';*/


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router:Router,private service:UserService, private wallService:WallService,private toastr:ToastrService) {
    
   }
  searchField;//za korisnike
  searchField2;//za zidove
  columns=["User Id","Full Name","User Name", "E-Mail","Actions"];//korisnici
  columns2=["WallName", "Creator FullName", "Creator UserName","Email","Date Created","Actions"];//zidovi
  dataSource:MatTableDataSource<Users>;//korisnici
  dataSource2:MatTableDataSource<any>;//zidovi
  //searchKey:string;

 // index=["id","fullName","userName","email"];
 // @ViewChild(MatPaginator) paginator: MatPaginator;
 // @ViewChild(MatSort) sort:MatSort;

  users : Users[] = [];
  walls=[];
  ngOnInit(): void {
    this.service.getAllUsers().subscribe(
      (response)=>
      {
        this.users=response;//this.users je polje
        this.dataSource=new MatTableDataSource(this.users);
        //this.dataSource.paginator=this.paginator;
        //this.dataSource.sort=this.sort;
        //console.log(response);
        //console.log(this.users[0].id); pristup idu usera
      },
      (error)=>console.log(error)
    )
     this.wallService.getAllWalls().subscribe(
       (response)=>{
         this.walls=response;
         this.dataSource2=new MatTableDataSource(this.walls);
       }
     )
  }

  applyFilter(filterValue:string){
    filterValue=filterValue.trim();//whitespace removal
    filterValue=filterValue.toLowerCase();//datasource lowercase by default
    this.dataSource.filter=filterValue;
  }
  applyFilterForWalls(filterValue:string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLocaleLowerCase();
    this.dataSource2.filter=filterValue;
  }

  clearSearchField() {
    this.searchField = '';
  }
  clearWallSearchField(){
    this.searchField2='';
  }
  
  onLogout()
  {
    localStorage.removeItem('token');//removing user token from local storage
    this.router.navigate(['/user/login']);

  }
  Delete(userId:string):void{
    if(confirm("Are you sure you want to delete this user?")){
    this.service.deleteUser(userId).subscribe(_ =>{
      this.users=this.users.filter(eachUser => eachUser.id !== userId);
      window.location.reload();
      this.toastr.warning('User deleted!','All walls created by this user are deleted!');
    });
    
  }
  }
  DeleteWall(wallId:string):void{
    if(confirm("Are you sure you want to delete this wall?")){
      this.wallService.deleteWall(wallId).subscribe(_ =>{
        this.walls=this.walls.filter(eachWall=>eachWall.wallID!==wallId);
        window.location.reload();
        this.toastr.success('Wall Deleted!','Wall Deletion Successful!');
      });
    }
  }
}
