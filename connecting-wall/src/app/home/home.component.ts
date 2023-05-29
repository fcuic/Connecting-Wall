import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WallService } from '../shared/wall.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../shared/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuizStartComponent } from '../quiz-start/quiz-start.component';
import { Wall } from 'src/models/wall';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userDetails;
  searchField;
  columns = [
    'WallName',
    'Creator FullName',
    'Creator UserName',
    'Email',
    'Date Created',
    'Actions',
  ];
  dataSource: MatTableDataSource<any>;
  response: any;
  walls : Wall[];

  constructor(
    private router: Router,
    private service: UserService,
    private wallService: WallService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) quizPaginator: MatPaginator;
  @ViewChild(MatSort) quizSort: MatSort;

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.wallService.getAllWalls().subscribe(
      (res) => {
        this.walls = res;
        this.dataSource = new MatTableDataSource(this.walls);
        this.dataSource.paginator = this.quizPaginator;
        this.dataSource.sort = this.quizSort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); //whitespace removal
    filterValue = filterValue.toLowerCase(); //datasource lowercase by default
    this.dataSource.filter = filterValue;
  }
  clearSearchField() {
    this.searchField = '';
  }

  onLogout() {
    localStorage.removeItem('token'); //removing user token from local storage
    this.router.navigate(['/user/login']);
  }

  openPlayWindow(wall: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.width = '1000px';
    dialogConfig.height = '800px';
    dialogConfig.data = {
      wallID: wall.wallID,
    };
    this.dialog.open(QuizStartComponent, dialogConfig);
  }
}
