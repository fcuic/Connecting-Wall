import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, MinLengthValidator } from '@angular/forms';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import {tap, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {Wall} from '../../models/wall';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  constructor(private fb:FormBuilder,private http:HttpClient, private Service:UserService) { }

  readonly BaseURI = 'http://localhost:57392/api';
  private header=new HttpHeaders({'content-type': 'application/json'});
  
  formModel= this.fb.group({
    wallID:new FormControl(null),//za modify, primarni ključ zida
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
  getWallById(id:any)
  {
    return this.http.get<any>(this.BaseURI+'/Wall/'+id).pipe(
      catchError(Error=>of(null))
    );
  }
  populateForm(Object:Wall)
  {
    this.formModel.patchValue({
      wallID:Object.wallID,
      wallName:Object.wallName,
      GroupATerms:{
        GroupATerm1:Object.groupATerms[0].termName,
        GroupATerm2:Object.groupATerms[1].termName,
        GroupATerm3:Object.groupATerms[2].termName,
        GroupATerm4:Object.groupATerms[3].termName
      },
      GroupBTerms:{
        GroupBTerm1:Object.groupBTerms[0].termName,
        GroupBTerm2:Object.groupBTerms[1].termName,
        GroupBTerm3:Object.groupBTerms[2].termName,
        GroupBTerm4:Object.groupBTerms[3].termName
      },
      GroupCTerms:{
        GroupCTerm1:Object.groupCTerms[0].termName,
        GroupCTerm2:Object.groupCTerms[1].termName,
        GroupCTerm3:Object.groupCTerms[2].termName,
        GroupCTerm4:Object.groupCTerms[3].termName
      },
      GroupDTerms:{
        GroupDTerm1:Object.groupDTerms[0].termName,
        GroupDTerm2:Object.groupDTerms[1].termName,
        GroupDTerm3:Object.groupDTerms[2].termName,
        GroupDTerm4:Object.groupDTerms[3].termName
      },
      GroupAConnections:Object.groupAConnections[0].connectionName,
      GroupBConnections:Object.groupBConnections[0].connectionName,
      GroupCConnections:Object.groupCConnections[0].connectionName,
      GroupDConnections:Object.groupDConnections[0].connectionName,  
    })
  }
  
}
