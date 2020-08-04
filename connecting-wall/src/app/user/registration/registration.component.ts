import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ],
})
export class RegistrationComponent implements OnInit {

  constructor(public service : UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }
  //za registration submit usera
  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New user registered!', 'Registration successful.');
        }
        else{
          res.errors.forEach(element => {
            switch(element.code){
              case 'DuplicateUserName':
                //username taken
                this.toastr.error('Username is already taken!','Registration failed.');
                break;
                default:
                this.toastr.error(element.description,'Registration failed.')
                //Registration Failed
                break;
            }
          });
        }
      }, //result function
      err=>{//error
        console.log(err);
      }
    );
  }
}
