import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {


  constructor(private http:HttpClient) {

  }
  sendData(data:any,baseurl:string):Observable<any>{

    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(baseurl,data,{headers});

  }
}
