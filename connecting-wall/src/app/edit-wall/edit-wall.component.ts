import { Component, OnInit } from '@angular/core';
import{WallService} from '../shared/wall.service';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MyQuizzesComponent } from '../my-quizzes/my-quizzes.component';

@Component({
  selector: 'app-edit-wall',
  templateUrl: './edit-wall.component.html',
  styleUrls: ['./edit-wall.component.css']
})
export class EditWallComponent implements OnInit {

  readonly BaseURI = 'http://localhost:57392/api';
  private header=new HttpHeaders({'content-type': 'application/json'});


  constructor(public service:WallService,private userService:UserService,private toastr:ToastrService, private http:HttpClient) { }

  ngOnInit(): void 
  {
   /* this.service.()
      .subscribe(
        res=>{
          this.userDetails=res;
          console.log(this.userDetails);
        },
        err=>{
          console.log(err);
        }
      )*/
  }
  UpdateWall()
  {
    var body={
      wallID:this.service.formModel.value.wallID,
      wallName:this.service.formModel.value.wallName,
     groupATerms:[
        {termName: this.service.formModel.get("GroupATerms").get("GroupATerm1").value},
        {termName: this.service.formModel.get("GroupATerms").get("GroupATerm2").value},
        {termName: this.service.formModel.get("GroupATerms").get("GroupATerm3").value},
        {termName: this.service.formModel.get("GroupATerms").get("GroupATerm4").value}]
      ,
      groupBTerms:[
        {termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm1").value},
        {termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm2").value},
        {termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm3").value},
        {termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm4").value}]
      ,
      groupCTerms:[
        {termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm1").value},
        {termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm2").value},
        {termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm3").value},
        {termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm4").value}]
      ,
      groupDTerms:[
        {termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm1").value},
        {termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm2").value},
        {termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm3").value},
        {termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm4").value}]
      ,
      groupAConnections:[
        {connectionName:this.service.formModel.value.GroupAConnections}
      ]
      ,
      groupBConnections:[
        {connectionName:this.service.formModel.value.GroupBConnections}
      ]
      ,
      groupCConnections:[
        {connectionName:this.service.formModel.value.GroupCConnections}
      ]
      ,
      groupDConnections:[
        {connectionName:this.service.formModel.value.GroupDConnections}
      ]
  }
    console.log(body);
    return this.http.put(this.BaseURI+'/Wall/'+body.wallID,body,{headers:this.header});
    
  }
  onSubmit()
  {
    this.UpdateWall().subscribe(
      (res)=>
      {
        this.toastr.success('Existing Connecting Wall Updated!','Update Successful!');
        console.log(res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
