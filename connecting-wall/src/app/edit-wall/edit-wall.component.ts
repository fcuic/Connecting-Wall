import { Component, OnInit, Inject } from '@angular/core';
import { WallService} from '../shared/wall.service';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Wall } from 'src/models/wall';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-wall',
  templateUrl: './edit-wall.component.html',
  styleUrls: ['./edit-wall.component.css']
})
export class EditWallComponent implements OnInit {

  readonly BaseURI = 'http://localhost:57392/api';
  private header=new HttpHeaders({'content-type': 'application/json'});
  wall : Wall;
  userDetails : any;
  CurrentDate:Date;

  constructor(
    private UserService: UserService,
    public WallService:WallService,
    private toastr:ToastrService, 
    private http:HttpClient,
    public dialogRef:MatDialogRef<EditWallComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public receivedData: { wallID: string }) { }

  ngOnInit(): void 
  {
    this.formModel.reset();
    this.UserService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.WallService
      .getWallDetails(this.receivedData.wallID)
      .subscribe((res) => {
        this.wall = res;
      });
    this.CurrentDate=new Date()
  }

  formModel = this.fb.group({
    wallID: new FormControl(null),
    wallName: ['', [Validators.required, Validators.minLength(3)]],
    GroupATerms: this.fb.group({
      GroupATerm1: ['', Validators.required],
      GroupATerm2: ['', Validators.required],
      GroupATerm3: ['', Validators.required],
      GroupATerm4: ['', Validators.required],
    }),
    GroupAConnectionName: ['', [Validators.required, Validators.minLength(3)]],
    GroupBTerms: this.fb.group({
      GroupBTerm1: ['', Validators.required],
      GroupBTerm2: ['', Validators.required],
      GroupBTerm3: ['', Validators.required],
      GroupBTerm4: ['', Validators.required],
    }),
    GroupBConnectionName: ['', [Validators.required, Validators.minLength(3)]],
    GroupCTerms: this.fb.group({
      GroupCTerm1: ['', Validators.required],
      GroupCTerm2: ['', Validators.required],
      GroupCTerm3: ['', Validators.required],
      GroupCTerm4: ['', Validators.required],
    }),
    GroupCConnectionName: ['', [Validators.required, Validators.minLength(3)]],
    GroupDTerms: this.fb.group({
      GroupDTerm1: ['', Validators.required],
      GroupDTerm2: ['', Validators.required],
      GroupDTerm3: ['', Validators.required],
      GroupDTerm4: ['', Validators.required],
    }),
    GroupDConnectionName: ['', [Validators.required, Validators.minLength(3)]],
  });
  
  UpdateWall()
  {
    var body={
      wallID:this.formModel.value.wallID,
      wallName:this.formModel.value.wallName,
      dateUpdated:this.CurrentDate.toJSON(),
      groupAConnectionName: this.formModel.value.GroupAConnectionName,
      groupATerms: [
        this.formModel.get('GroupATerms').get('GroupATerm1').value,
        this.formModel.get('GroupATerms').get('GroupATerm2').value,
        this.formModel.get('GroupATerms').get('GroupATerm3').value,
        this.formModel.get('GroupATerms').get('GroupATerm4').value,
      ],
      groupBConnectionName: this.formModel.value.GroupBConnectionName,
      groupBTerms: [
        this.formModel.get('GroupBTerms').get('GroupBTerm1').value,
        this.formModel.get('GroupBTerms').get('GroupBTerm2').value,
        this.formModel.get('GroupBTerms').get('GroupBTerm3').value,
        this.formModel.get('GroupBTerms').get('GroupBTerm4').value,
      ],
      groupCConnectionName: this.formModel.value.GroupCConnectionName,
      groupCTerms: [
        this.formModel.get('GroupCTerms').get('GroupCTerm1').value,
        this.formModel.get('GroupCTerms').get('GroupCTerm2').value,
        this.formModel.get('GroupCTerms').get('GroupCTerm3').value,
        this.formModel.get('GroupCTerms').get('GroupCTerm4').value,
      ],
      groupDConnectionName: this.formModel.value.GroupDConnectionName,
      groupDTerms: [
        this.formModel.get('GroupDTerms').get('GroupDTerm1').value,
        this.formModel.get('GroupDTerms').get('GroupDTerm2').value,
        this.formModel.get('GroupDTerms').get('GroupDTerm3').value,
        this.formModel.get('GroupDTerms').get('GroupDTerm4').value,
      ]
  }
    return this.http.put(this.BaseURI+'/Wall/'+body.wallID,body,{headers:this.header});
    
  }
  onSubmit()
  {
    this.UpdateWall().subscribe(
      (res)=>
      {
        window.location.reload();
        this.toastr.success('Existing Connecting Wall Updated!','Update Successful!');
        console.log(res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  onClose()
  {
   this.dialogRef.close();//dialog ref klase matdialog ref za zatvaranje prozora!
  }
}
