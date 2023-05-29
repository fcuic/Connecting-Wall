import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { WallService } from '../shared/wall.service';
import { ToastrService } from 'ngx-toastr';
import { WallInsertRequestModel } from '../shared/WallInsertRequestModel';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnInit {
  userDetails : any;
  readonly BaseURI = 'http://localhost:57392/api';

  constructor(
    private router: Router,
    private service: UserService,
    public wallService: WallService,
    private toastr: ToastrService,
    private fb: FormBuilder,
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
    this.service.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogout() {
    localStorage.removeItem('token'); //removing user token from local storage
    this.router.navigate(['/user/login']);
  }

  CreateQuiz() {
    var request: WallInsertRequestModel = {
      wallName: this.formModel.value.wallName,
      userId: this.userDetails.id,
      groupAConnectionName: this.formModel.value.GroupAConnectionName,
      groupATerms: [
        this.wallService.formModel.get('GroupATerms').get('GroupATerm1').value,
        this.wallService.formModel.get('GroupATerms').get('GroupATerm2').value,
        this.wallService.formModel.get('GroupATerms').get('GroupATerm3').value,
        this.wallService.formModel.get('GroupATerms').get('GroupATerm4').value,
      ],
      groupBConnectionName: this.formModel.value.GroupBConnectionName,
      groupBTerms: [
        this.wallService.formModel.get('GroupBTerms').get('GroupBTerm1').value,
        this.wallService.formModel.get('GroupBTerms').get('GroupBTerm2').value,
        this.wallService.formModel.get('GroupBTerms').get('GroupBTerm3').value,
        this.wallService.formModel.get('GroupBTerms').get('GroupBTerm4').value,
      ],
      groupCConnectionName: this.formModel.value.GroupCConnectionName,
      groupCTerms: [
        this.wallService.formModel.get('GroupCTerms').get('GroupCTerm1').value,
        this.wallService.formModel.get('GroupCTerms').get('GroupCTerm2').value,
        this.wallService.formModel.get('GroupCTerms').get('GroupCTerm3').value,
        this.wallService.formModel.get('GroupCTerms').get('GroupCTerm4').value,
      ],
      groupDConnectionName: this.formModel.value.GroupDConnectionName,
      groupDTerms: [
        this.wallService.formModel.get('GroupDTerms').get('GroupDTerm1').value,
        this.wallService.formModel.get('GroupDTerms').get('GroupDTerm2').value,
        this.wallService.formModel.get('GroupDTerms').get('GroupDTerm3').value,
        this.wallService.formModel.get('GroupDTerms').get('GroupDTerm4').value,
      ]
    };

    return this.wallService.insertWall(request).subscribe((result) => {
      this.toastr.success(
        'New Connecting Wall Created!',
        'Wall Creation Successful! Go to My Quizzes to edit it if necessary!'
      );
      console.log('result', result);
    });
    this.wallService.formModel.reset();
  }

  onSubmit() {
    // this.CreateQuiz().subscribe((result) => {
    //   this.toastr.success(
    //     'New Connecting Wall Created!',
    //     'Wall Creation Successful! Go to My Quizzes to edit it if necessary!'
    //   );
    //   console.log('result', result);
    // });
    // this.wallService.formModel.reset();
  }
}
