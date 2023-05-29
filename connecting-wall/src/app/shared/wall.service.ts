import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Wall } from '../../models/wall';

@Injectable({
  providedIn: 'root',
})
export class WallService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  readonly BaseURI = 'http://localhost:57392/api';
  private header = new HttpHeaders({ 'content-type': 'application/json' });

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

  getAllWalls() {
    return this.http.get<any>(this.BaseURI + '/Wall');
  }

  getWallDetails(id: any) {
    return this.http
      .get<Wall>(this.BaseURI + '/Wall/WallDetails/' + id)
      .pipe(catchError((Error) => of(null)));
  }

  getWallByUserId(id: any) {
    return this.http
      .get<Wall>(this.BaseURI + '/Wall/GetWallsByUserId/' + id)
      .pipe(catchError((Error) => of(null)));
  }

  deleteWall(id: string): Observable<any> {
    return this.http.delete<any>(this.BaseURI + '/Wall/' + id).pipe(
      tap((_) => console.log('id of deleted wall:' + id)),
      catchError((Error) => of(null))
    );
  }

  insertWall(wall: any): Observable<any> {
    return this.http.post(this.BaseURI + '/Wall', wall, {
      headers: this.header,
    });
  }

  populateForm(Object: Wall) {
    let groupA = Object.groupConnections.find(
      (conn) => conn.connectionGroup === 'A'
    );
    let groupB = Object.groupConnections.find(
      (conn) => conn.connectionGroup === 'B'
    );
    let groupC = Object.groupConnections.find(
      (conn) => conn.connectionGroup === 'C'
    );
    let groupD = Object.groupConnections.find(
      (conn) => conn.connectionGroup === 'D'
    );

    this.formModel.patchValue({
      wallID: Object.wallID,
      wallName: Object.wallName,
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
      GroupAConnections: groupA.connectionName,
      GroupBConnections: groupB.connectionName,
      GroupCConnections: groupC.connectionName,
      GroupDConnections: groupD.connectionName,
    });
  }
}
