import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, MinLengthValidator } from '@angular/forms';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import {tap, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  constructor(private fb:FormBuilder,private http:HttpClient, private Service:UserService) { }

  readonly BaseURI = 'http://localhost:57392/api';
  private header=new HttpHeaders({'content-type': 'application/json'});
 

  formModel= this.fb.group({
    $key:new FormControl(null),//za modify, primarni ključ zida
    wallName:['',[Validators.required,Validators.minLength(3)]],
    GroupATerms:this.fb.group({
      GroupATerm1:['', Validators.required],
      GroupATerm2:['', Validators.required],
      GroupATerm3:['', Validators.required],
      GroupATerm4:['', Validators.required]
    }),
    GroupAConnections:['',[Validators.required,Validators.minLength(3)]],
    GroupBTerms:this.fb.group({
      GroupBTerm1:['', Validators.required],
      GroupBTerm2:['', Validators.required],
      GroupBTerm3:['', Validators.required],
      GroupBTerm4:['', Validators.required]
    }),
    GroupBConnections:['',[Validators.required,Validators.minLength(3)]],
    GroupCTerms:this.fb.group({
      GroupCTerm1:['', Validators.required],
      GroupCTerm2:['', Validators.required],
      GroupCTerm3:['', Validators.required],
      GroupCTerm4:['', Validators.required]
    }),
    GroupCConnections:['',[Validators.required,Validators.minLength(3)]],
    GroupDTerms:this.fb.group({
      GroupDTerm1:['', Validators.required],
      GroupDTerm2:['', Validators.required],
      GroupDTerm3:['', Validators.required],
      GroupDTerm4:['', Validators.required]
    }),
    GroupDConnections:['',[Validators.required,Validators.minLength(3)]]
  })

  getAllWalls()//getting all the wall in home component
  {
    return this.http.get<any>(this.BaseURI+'/Wall');
  }
  deleteWall(id:string):Observable<any>{
    return this.http.delete<any>(this.BaseURI+'/Wall/'+id).pipe(
      tap(_ => console.log('id of deleted wall:'+id)),
      catchError(Error=>of(null))
    );
  }
  getQuizByUserId(id:any){
    return this.http.get<any>(this.BaseURI+'/Wall/GetWallsByUserId/'+id).pipe(
      catchError(Error=>of(null))
    );
  }
}
