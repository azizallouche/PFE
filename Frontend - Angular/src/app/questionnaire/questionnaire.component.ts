import { Component, Input, OnInit } from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";
import {QuestionnaireService} from "../services/questionnaire.service";
import { AuthService } from '../auth.service';
import { SharedService } from '../shared.service';
interface MBTIResults {
  extrovert: number;
  introvert: number;
  sensing: number;
  intuition: number;
  thinking: number;
  feeling: number;
  judging: number;
  perceiving: number;
  dimension1: string;
  dimension2: string;
  dimension3: string;
  dimension4: string;
  personality: string;
}
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit{
  mbtiresults:any;
  mbtipassed:boolean=false;
  newdata:any[]=[];
  results:any[]=[];
  EI:any;
  SN:any;
  TF:any;
  JP:any;
  step:number=0;
  result:any;
  E_I:any;
  S_N:any;
  T_F:any;
  J_P:any;
  EI_type:any;
  SN_type:any;
  TF_type:any;
  JP_type:any;
  personality_desc:any={
    "ISTJ" : ["Most Reliable","LOGISTICAN",["- Practical and fact-minded individuals","- Whose relibility cannot be doubted"],"rgb(80, 147, 147)"],
    "ISFJ" : ["Most Loyal","DEFENDER",["- Very dedicate and warm protectors","- Always ready to defend their loved ones"],"rgb(80, 147, 147)"],
    "ISTP" : ["Most Progmtic","VIRTUOSO",["- Bold and partical experimenters","- Masters of all kinds of tools"],"rgb(158, 129, 42)"],
    "ISFP" : ["Most Artistic","ADVENTURER",["- Flexible and charming artists","- Always ready to explore and experience something new"],"rgb(158, 129, 42)"],
    "INTJ" : ["Most Indepnedent","ARCHITECT",["- Imaginative and strategic thinkers","- With a plan for everything"],"rgb(111, 80, 94)"],
    "INFP" : ["Most Idealistic","MEDIATOR",["- Poetic","- Kind and altruistic people","- Always eager to help a good cause"],"rgb(101, 125, 73)"],
    "INTP" : ["Most Conceptual","LOGICIAN",["- Innovative inventors","- With an unquenchable thirst for knowledge"],"rgb(111, 80, 94)"],
    "ENFP" : ["Most Optimistic","CAMPAIGNER",["- Enthuisiastic","- Creative and social free spirits","- Who can always find a reason to smile"],"rgb(101, 125, 73)"],
    "ESTP" : ["Most Fun","ENTREPRENEUR",["- Smart","- Energetic and very perceptive people","- Who truly enjoy living on the edge"],"rgb(158, 129, 42)"],
    "ESFP" : ["Most Generous","ENTERTAINER",["- Spontaneous","- Energetic and enthusiastic people","- Life is never boring around them"],"rgb(158, 129, 42)"],
    "ESTJ" : ["Most Forceful","EXECUTIVE",["- Excellent administrators","- Unsurpassed at managing things - or people"],"rgb(80, 147, 147)"],
    "INFJ" : ["Most Reflective","ADVOCATE",["- Quiet and mystical","- Yet very inspiring and tireless idealists"],"rgb(101, 125, 73)"],
    "ENTP" : ["Most Inventive","DEBATER",["- Smart","- Curious thinkers","- Cannot resist an intellectual challenge"],"rgb(111, 80, 94)"],
    "ENFJ" : ["Most Persuasive","PROTAGONSIST",["- Charismatic","- Inspiring leaders","- Able to mesmerize their listeners"],"rgb(101, 125, 73)"],
    "ENTJ" : ["Most Commading","COMMANDER",["- Bold","- Imaginative","- Strong-willed leaders","- Always finding a way -or making one"],"rgb(111, 80, 94)"],
    "ESFJ" : ["Most Harmonious","CONSUL",["- Extraordinarily caring","- Social and people","- Always eager to help"],"rgb(80, 147, 147)"]
  };
  quest:string;
  desc1:string;
  desc2:string;
  desc3:string;
  color:string;
  baseurl:string="http://localhost:8000/QA/TestResult/";
  body:any={
    "answer1": "first",
    "num": 0,
  }

  
  personality:string="INTJ";
  valid:boolean=false;
  finish:boolean=false;
  constructor(private sharedService:SharedService,private authService:AuthService,private sessionStorage:LocalstorageService,private qService:QuestionnaireService) {
  }
  ngOnInit(): void {
    this.authService.getMbti().subscribe(
      response => {
        this.mbtipassed = response['passed'];
        this.mbtiresults = response['results'];
        console.log(response);
        this.trait();
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
   
  }
  trait(){
    console.log("this.mbtipassed");
    console.log(this.mbtipassed);
    if (this.mbtipassed){
      console.log("yesss");
      console.log(this.mbtiresults);
      this.personality=this.mbtiresults["personality"];
      this.valid=true;
      
      this.desc1= this.personality_desc[this.personality][0];
      this.desc2= this.personality_desc[this.personality][1];
      this.desc3= this.personality_desc[this.personality][2];
      this.color= this.personality_desc[this.personality][3];
      console.log(this.mbtiresults["extrovert"]);
      if(this.mbtiresults["extrovert"]>this.mbtiresults["introvert"]){
        this.E_I=this.mbtiresults["extrovert"];
        this.EI_type="Extrovert";
      }
      else{
        this.E_I=this.mbtiresults["introvert"];
        this.EI_type="introvert";
      }
      if(this.mbtiresults["intuition"]>this.mbtiresults["sensing"]){
        this.S_N=this.mbtiresults["intuition"];
        this.SN_type="Intuition";
      }
      else{
        this.S_N=this.mbtiresults["sensing"];
        this.SN_type="Sensing";
      }
      if(this.mbtiresults["thinking"]>this.mbtiresults["feeling"]){
        this.T_F=this.mbtiresults["thinking"];
        this.TF_type="Thinking";
      }
      else{
        this.T_F=this.mbtiresults["feeling"];
        this.TF_type="Feeling";
      }
      if(this.mbtiresults["judging"]>this.mbtiresults["perceiving"]){
        this.J_P=this.mbtiresults["judging"];
        this.JP_type="Judging";
      }
      else{
        this.J_P=this.mbtiresults["perceiving"];
        this.JP_type="Perceiving";
      }
    }
  }
  sendFinaldata(){
    console.log('in result');
    this.result={
      "EI": this.EI,
      "SN": this.SN,
      "JP": this.JP,
      "TF": this.TF
    }
    this.qService.sendData(JSON.stringify(this.result),this.baseurl).subscribe(
      (response) => {
        this.personality=response["personality"];
        this.valid=true;
        
        this.desc1= this.personality_desc[this.personality][0];
        this.desc2= this.personality_desc[this.personality][1];
        this.desc3= this.personality_desc[this.personality][2];
        this.color= this.personality_desc[this.personality][3];

        if(response["extrovert"]>response["introvert"]){
          this.E_I=response["extrovert"];
          this.EI_type="Extrovert";
        }
        else{
          this.E_I=response["introvert"];
          this.EI_type="introvert";
        }
        if(response["intuition"]>response["sensing"]){
          this.S_N=response["intuition"];
          this.SN_type="Intuition";
        }
        else{
          this.S_N=response["sensing"];
          this.SN_type="Sensing";
        }
        if(response["thinking"]>response["feeling"]){
          this.T_F=response["thinking"];
          this.TF_type="Thinking";
        }
        else{
          this.T_F=response["feeling"];
          this.TF_type="Feeling";
        }
        if(response["judging"]>response["perceiving"]){
          this.J_P=response["judging"];
          this.JP_type="Judging";
        }
        else{
          this.J_P=response["perceiving"];
          this.JP_type="Perceiving";
        }
        this.mbtipassed=true;
        this.sharedService.setMbtiPassed(true);
       

        console.log('Response from backend:', response);
        // Handle the response as needed
      },
      (error) => {
        console.error('Error communicating with backend:', error);
      }
    );
  }
  getDataFromchildren1(data: any){
    console.log(data);
    this.newdata.push(data);
    console.log("new data",this.newdata);
    this.sessionStorage.saveQ1(this.newdata);
    if(this.finish == true){
      this.sendFinaldata();}
      
      else{
      console.log("entred")
      console.log(this.newdata[this.newdata.length -1]);

      if (this.newdata.length != 0){
         this.body={
          "answer": this.newdata[this.newdata.length -1],
          "num": this.newdata.length -1,
        }
      }
      
console.log(typeof this.body)
   if(!this.mbtipassed){
    let baseurl1="http://localhost:8000/QA/calculatequestion/";
    this.qService.sendData(JSON.stringify(this.body),baseurl1).subscribe(
        (response) => {
          this.step++;
          this.quest=response['question'];
          this.finish=response['finish'];
          console.log(this.finish);
          console.log('Response from backend:', this.quest);
          // Handle the response as needed
        },
        (error) => {
          console.error('Error communicating with backend:', error);
        }
      );
   }
     
    }
  }

}
