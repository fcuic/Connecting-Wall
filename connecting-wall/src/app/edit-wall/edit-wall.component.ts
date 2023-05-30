import { Component, OnInit, Inject } from '@angular/core';
import { WallService } from '../shared/wall.service';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Wall } from 'src/models/wall';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-wall',
  templateUrl: './edit-wall.component.html',
  styleUrls: ['./edit-wall.component.css'],
})
export class EditWallComponent implements OnInit {
  readonly BaseURI = 'http://localhost:57392/api';
  private header = new HttpHeaders({ 'content-type': 'application/json' });
  wall: Wall;
  userDetails: any;

  constructor(
    private UserService: UserService,
    public WallService: WallService,
    private toastr: ToastrService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditWallComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public receivedData: { wallID: string }
  ) {}

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

  ngOnInit(): void {
    this.formModel.reset();
    this.UserService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.WallService.getWallDetails(this.receivedData.wallID).subscribe(
      (res) => {
        this.wall = res;
        console.log(this.wall);
        this.populateForm(this.wall);
      }
    );
  }

  populateForm(wall: Wall) {
    let groupA = wall.groupConnections.find(
      (conn) => conn.connectionGroup === 'A'
    );
    let groupB = wall.groupConnections.find(
      (conn) => conn.connectionGroup === 'B'
    );
    let groupC = wall.groupConnections.find(
      (conn) => conn.connectionGroup === 'C'
    );
    let groupD = wall.groupConnections.find(
      (conn) => conn.connectionGroup === 'D'
    );

    this.formModel.patchValue({
      wallID: wall.wallID,
      wallName: wall.wallName,
      GroupATerms: {
        GroupATerm1: groupA.terms[0].termName,
        GroupATerm2: groupA.terms[1].termName,
        GroupATerm3: groupA.terms[2].termName,
        GroupATerm4: groupA.terms[3].termName,
      },
      GroupBTerms: {
        GroupBTerm1: groupB.terms[0].termName,
        GroupBTerm2: groupB.terms[1].termName,
        GroupBTerm3: groupB.terms[2].termName,
        GroupBTerm4: groupB.terms[3].termName,
      },
      GroupCTerms: {
        GroupCTerm1: groupC.terms[0].termName,
        GroupCTerm2: groupC.terms[0].termName,
        GroupCTerm3: groupC.terms[0].termName,
        GroupCTerm4: groupC.terms[0].termName,
      },
      GroupDTerms: {
        GroupDTerm1: groupD.terms[0].termName,
        GroupDTerm2: groupD.terms[1].termName,
        GroupDTerm3: groupD.terms[2].termName,
        GroupDTerm4: groupD.terms[3].termName,
      },
      GroupAConnectionName: groupA.connectionName,
      GroupBConnectionName: groupB.connectionName,
      GroupCConnectionName: groupC.connectionName,
      GroupDConnectionName: groupD.connectionName,
    });
  }

  UpdateWall() {
    var request = {
      wallID: this.formModel.value.wallID,
      wallName: this.formModel.value.wallName,
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
      ],
    };
    this.WallService.updateWall(request).subscribe(
      (res) => {
        window.location.reload();
        this.toastr.success(
          'Existing Connecting Wall Updated!',
          'Update Successful!'
        );
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onClose() {
    this.dialogRef.close(); //dialog ref klase matdialog ref za zatvaranje prozora!
  }
}
