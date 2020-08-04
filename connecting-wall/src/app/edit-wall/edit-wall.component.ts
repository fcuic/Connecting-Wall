import { Component, OnInit } from '@angular/core';
import{WallService} from '../shared/wall.service';

@Component({
  selector: 'app-edit-wall',
  templateUrl: './edit-wall.component.html',
  styleUrls: ['./edit-wall.component.css']
})
export class EditWallComponent implements OnInit {

  constructor(public service:WallService) { }

  ngOnInit(): void {
  }

}
