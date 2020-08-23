import { Injectable } from '@angular/core';
import {FormBuilder,Validators, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from '../../models/users';//model for users
import { Observable, of } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import {tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) {
   }

   //userList:Users[];
   //adresa API-a
   readonly BaseURI = 'http://localhost:57392/api';

   formModel=this.fb.group({
     UserName : ['',Validators.required],
     Email : ['',[Validators.required,Validators.email]],
     FullName : ['',Validators.required],
     Password : ['',[Validators.required, Validators.minLength(6)]],
     ConfirmedPassword : ['',Validators.required]},
     {validator : this.comparePasswords});

   comparePasswords(fb :FormGroup){
     let confirmPswrdCtrl=fb.get('ConfirmedPassword');
     if(confirmPswrdCtrl.errors==null || 'passwordMismatch' in confirmPswrdCtrl.errors){
       if(fb.get('Password').value!=confirmPswrdCtrl.value)
       {
       confirmPswrdCtrl.setErrors({passwordMismatch:true});
       }
      else
      {
       confirmPswrdCtrl.setErrors(null);
      }
   }
}
//HTTP Post
register(){
 var body={
  UserName:this.formModel.value.UserName,
  Email : this.formModel.value.Email,
  FullName : this.formModel.value.FullName,
  Password : this.formModel.value.Password,
 };
 return this.http.post(this.BaseURI+'/ApplicationUser/Register', body);
}

//
login(formData)
{
  return this.http.post(this.BaseURI+'/ApplicationUser/Login', formData);
}

getUserProfile()
{
  var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')})
  return this.http.get(this.BaseURI+'/UserProfile', {headers:tokenHeader});
}

roleMatch(allowedRoles): boolean
{
  var isMatch=false;
  var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var userRole=payload.role;
  allowedRoles.forEach(element => {
    if(userRole==element)
    {
      isMatch=true;
      return false;

    }
  });
  return isMatch;
}
getAllUsers()
{
  return this.http.get<Users[]>(this.BaseURI+'/UserProfile/GetAllUsers');
}
deleteUser(id:string):Observable<Users>{
  return this.http.delete<Users>(this.BaseURI+'/UserProfile/DeleteUserProfile/'+id).pipe(
    tap(_ => console.log('id of deleted user:'+id)),
    catchError(error=>of(null))
    );
  }

}
