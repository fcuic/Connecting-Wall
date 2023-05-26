import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { WallService } from '../shared/wall.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnInit {
  userDetails;
  readonly BaseURI = 'http://localhost:57392/api';
  private header = new HttpHeaders({ 'content-type': 'application/json' });

  constructor(
    private router: Router,
    private service: UserService,
    public wallService: WallService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.wallService.formModel.reset();
    this.service.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res;
        // console.log(this.userDetails);//provjera podataka za logiranog korisnika
        // console.log(this.wallService.formModel.value);//provjera inicijalnog form modela, prazno
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
    var body = {
      wallName: this.wallService.formModel.value.wallName,
      userID: this.userDetails.id, //id trenutno logiranog usera
      groupATerms: [
        {
          termName: this.wallService.formModel
            .get('GroupATerms')
            .get('GroupATerm1').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupATerms')
            .get('GroupATerm2').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupATerms')
            .get('GroupATerm3').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupATerms')
            .get('GroupATerm4').value,
        },
      ],
      groupBTerms: [
        {
          termName: this.wallService.formModel
            .get('GroupBTerms')
            .get('GroupBTerm1').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupBTerms')
            .get('GroupBTerm2').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupBTerms')
            .get('GroupBTerm3').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupBTerms')
            .get('GroupBTerm4').value,
        },
      ],
      groupCTerms: [
        {
          termName: this.wallService.formModel
            .get('GroupCTerms')
            .get('GroupCTerm1').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupCTerms')
            .get('GroupCTerm2').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupCTerms')
            .get('GroupCTerm3').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupCTerms')
            .get('GroupCTerm4').value,
        },
      ],
      groupDTerms: [
        {
          termName: this.wallService.formModel
            .get('GroupDTerms')
            .get('GroupDTerm1').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupDTerms')
            .get('GroupDTerm2').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupDTerms')
            .get('GroupDTerm3').value,
        },
        {
          termName: this.wallService.formModel
            .get('GroupDTerms')
            .get('GroupDTerm4').value,
        },
      ],
      groupAConnections: [
        { connectionName: this.wallService.formModel.value.GroupAConnections },
      ],
      groupBConnections: [
        { connectionName: this.wallService.formModel.value.GroupBConnections },
      ],
      groupCConnections: [
        { connectionName: this.wallService.formModel.value.GroupCConnections },
      ],
      groupDConnections: [
        { connectionName: this.wallService.formModel.value.GroupDConnections },
      ],
    };
    return this.http.post(this.BaseURI + '/Wall', body, {
      headers: this.header,
    });
  }

  onSubmit() {
    this.CreateQuiz().subscribe((result) => {
      this.toastr.success(
        'New Connecting Wall Created!',
        'Wall Creation Successful! Go to My Quizzes to edit it if necessary!'
      );
      console.log('result', result);
    });
    //console.log(data);
    //console.log(this.wallService.formModel.get('GroupATerms').get('GroupATerm1').value);
    this.wallService.formModel.reset();

    /*this.wallService.CreateQuiz().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.wallService.formModel.reset();
          this.toastr.success('New Wall Created!', 'Wall creation successful.');
        }
        else
        {
          res.errors.forEach(element => {
            switch(element.code){
              case 'DuplicateWallName':
                //username taken
                this.toastr.error('Wall name is already taken!','Creation failed.');
                break;
                default:
                this.toastr.error(element.description,'Creation failed.')
                //Registration Failed
                break;
            }
          });
        }
      },
      err=>{//error
        console.log(err);
      }
    )}*/
    //getanje nested valuea 1. nacin:
    // console.log(this.wallService.formModel.get(['GroupATerms','GroupATerm1']).value);
    //getanje nested valuea 2. nacin:
    //console.log(this.wallService.formModel.get('GroupATerms').get('GroupATerm2').value);
    //console.log(this.wallService.formModel.value);//TESTANJE postanog zida

    //
  }
}
