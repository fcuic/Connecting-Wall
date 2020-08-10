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
  wallID:string;
  wallDetails:any;
  //#region date updated conversion to C# format
  CurrentDate:Date;



  constructor(public service:WallService,private userService:UserService,private toastr:ToastrService, private http:HttpClient) { }

  ngOnInit(): void 
  {
    this.CurrentDate=new Date()
   /*this.service.getWallById(this.service.formModel.value.wallID).subscribe(
    res=>{
      this.WallDetails=res;
      //console.log(this.WallDetails.groupATerms[0].termName);
      //console.log(this.WallDetails.groupBTerms[0].termName);
      console.log(this.WallDetails);
    }
  );*/
  this.GetWallData();
  console.log(this.CurrentDate.toJSON());
  }

  /*public dateToString(date:Date)
  {
    let day=date.getDate();
    let month=date.getMonth();
    let year=date.getFullYear();
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let seconds=date.getSeconds();
    let miliseconds=date.getMilliseconds();

    let dateStringInCFormat=year+'-0'+month+'-0'+day+'T'+hours+':'+minutes+':'+seconds+"."+miliseconds;
    return dateStringInCFormat;
  }*/
  GetWallData()
  {
    
  this.wallID=this.service.formModel.value.wallID;
  if(this.wallID==null){
    this.toastr.warning('Could not get wall ID','Please close and open this window again');
  }
  console.log(this.wallID);
  this.service.getWallById(this.wallID).subscribe(//zato sto vraca observable bez subscribea
    res=>{
      this.wallDetails=res;
      console.log(this.wallDetails);
      /*console.log(this.wallDetails.userID);
      console.log(this.wallDetails.groupAConnections[0].connectionId);
      console.log(this.wallDetails.groupBConnections[0].connectionId);
      console.log(this.wallDetails.groupCConnections[0].connectionId);
      console.log(this.wallDetails.groupDConnections[0].connectionId);*/
    });
  }
  
  UpdateWall()
  {
    var body={
      wallID:this.service.formModel.value.wallID,
      userID:this.wallDetails.userID,
      wallName:this.service.formModel.value.wallName,
      dateCreated:this.wallDetails.dateCreated,
      dateUpdated:this.CurrentDate.toJSON(),
     groupATerms:[
        {
          termID:this.wallDetails.groupATerms[0].termID,
          termName: this.service.formModel.get("GroupATerms").get("GroupATerm1").value
        },
        {
          termID:this.wallDetails.groupATerms[1].termID,
          termName: this.service.formModel.get("GroupATerms").get("GroupATerm2").value
        },
        {
          termID:this.wallDetails.groupATerms[2].termID,
          termName: this.service.formModel.get("GroupATerms").get("GroupATerm3").value
        },
        {
          termID:this.wallDetails.groupATerms[3].termID,
          termName: this.service.formModel.get("GroupATerms").get("GroupATerm4").value
        }]
      ,
      groupBTerms:[
        {
          termID:this.wallDetails.groupBTerms[0].termID,
          termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm1").value
        },
        {
          termID:this.wallDetails.groupBTerms[1].termID,
          termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm2").value
        },
        {
          termID:this.wallDetails.groupBTerms[2].termID,
          termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm3").value
        },
        {
          termID:this.wallDetails.groupBTerms[3].termID,
          termName: this.service.formModel.get("GroupBTerms").get("GroupBTerm4").value
        }]
      ,
      groupCTerms:[
        {
          termID:this.wallDetails.groupCTerms[0].termID,
          termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm1").value
        },
        {
          termID:this.wallDetails.groupCTerms[1].termID,
          termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm2").value
        },
        {
          termID:this.wallDetails.groupCTerms[2].termID,
          termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm3").value
        },
        {
          termID:this.wallDetails.groupCTerms[3].termID,
          termName: this.service.formModel.get("GroupCTerms").get("GroupCTerm4").value
        }]
      ,
      groupDTerms:[
        {
          termID:this.wallDetails.groupDTerms[0].termID,
          termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm1").value
        },
        {
          termID:this.wallDetails.groupDTerms[1].termID,
          termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm2").value
        },
        {
          termID:this.wallDetails.groupDTerms[2].termID,
          termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm3").value
        },
        {
          termID:this.wallDetails.groupDTerms[3].termID,
          termName: this.service.formModel.get("GroupDTerms").get("GroupDTerm4").value
        }]
      ,
      groupAConnections:[
        {
          connectionId:this.wallDetails.groupAConnections[0].connectionId,
          connectionName:this.service.formModel.value.GroupAConnections
        }
      ]
      ,
      groupBConnections:[
        {
          connectionId:this.wallDetails.groupBConnections[0].connectionId,
          connectionName:this.service.formModel.value.GroupBConnections
        }
      ]
      ,
      groupCConnections:[
        {
          connectionId:this.wallDetails.groupCConnections[0].connectionId,
          connectionName:this.service.formModel.value.GroupCConnections
        }
      ]
      ,
      groupDConnections:[
        {
          connectionId:this.wallDetails.groupDConnections[0].connectionId,
          connectionName:this.service.formModel.value.GroupDConnections
        }
      ]
  }
    //console.log(body.wallID);
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
