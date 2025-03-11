import { Component, ViewEncapsulation } from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";
import {QuestionnaireService} from "../services/questionnaire.service";

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class vmComponent {

  newdata:any[]=[];
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
  desc1:string;
  desc2:string;
  desc3:string;
  color:string;
  baseurl:string="http://localhost:8000/QA/TestResult/";
  personality:string="INTJ";
  valid:boolean=false;
  constructor(private sessionStorage:LocalstorageService,private qService:QuestionnaireService) {
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
    if(this.newdata.length == 8){
      console.log("entred")
      console.log(this.newdata[0]);
      const body={
        "answer1": this.newdata[0],
        "answer2": this.newdata[1]
      }
console.log(typeof body)
      let baseurl1="http://localhost:8000/QA/EI/";
      let baseurl2="http://localhost:8000/QA/NS/";
      let baseurl3="http://localhost:8000/QA/TF/";
      let baseurl4="http://localhost:8000/QA/JP/";


      this.qService.sendData(JSON.stringify(body),baseurl1).subscribe(
        (response) => {
           this.EI = response;
           this.step++;
          if(this.step == 4){
            this.sendFinaldata();
          }
          console.log('Response from backend:', this.EI);
          // Handle the response as needed
        },
        (error) => {
          console.error('Error communicating with backend:', error);
        }
      );
      this.qService.sendData(JSON.stringify(body),baseurl2).subscribe(
        (response) => {
          this.SN = response;
          this.step++;
          if(this.step == 4){
            this.sendFinaldata();
          }
          console.log('Response from backend:', this.SN);
          // Handle the response as needed
        },
        (error) => {
          console.error('Error communicating with backend:', error);
        }
      );
      this.qService.sendData(JSON.stringify(body),baseurl3).subscribe(
        (response) => {
          this.TF = response;
          this.step++;
          if(this.step == 4){
            this.sendFinaldata();
          }
          console.log('Response from backend:', this.TF);
          // Handle the response as needed
        },
        (error) => {
          console.error('Error communicating with backend:', error);
        }
      );
      this.qService.sendData(JSON.stringify(body),baseurl4).subscribe(
        (response) => {
          this.JP = response;
          this.step++;
          if(this.step == 4){
            this.sendFinaldata();
          }
          console.log('Response from backend:', this.JP);
          // Handle the response as needed
        },
        (error) => {
          console.error('Error communicating with backend:', error);
        }
      );


    }
  }

}
