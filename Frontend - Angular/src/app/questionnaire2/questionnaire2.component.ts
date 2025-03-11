import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";
import {QuestionnaireService} from "../services/questionnaire.service";

@Component({
  selector: 'app-questionnaire2',
  templateUrl: './questionnaire2.component.html',
  styleUrls: ['./questionnaire2.component.css']
})
export class Questionnaire2Component implements OnInit {

  
  constructor(private sessionStorage:LocalstorageService,private qService:QuestionnaireService) {
  }
  ngOnInit(): void {
    
  }
  
  

}
