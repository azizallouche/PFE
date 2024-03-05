import {Component, EventEmitter, Input, Output} from '@angular/core';

import {LocalstorageService} from "../../services/localstorage.service";
import {QuestionnaireService} from "../../services/questionnaire.service";
@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css']
})
export class QAComponent {
  @Input() personality:string="ESTJ";
  @Input() valid:boolean;
  @Input() E_I:any;
  @Input() EI_type:any;
  @Input() S_N:any;
  @Input() SN_type:any;
  @Input() J_P:any;
  @Input() JP_type:any;
  @Input() T_F:any;
  @Input() TF_type:any;
  @Input() desc1:any;
  @Input() desc2:any;
  @Input() desc3:any;
  @Input() color:any;
  listquest:any[]=['When you have a day all to yourself, what does your ideal day look like?','In a bustling social event, what role do you find yourself naturally gravitating towards?','How do you typically prepare for a new experience or journey?','When reflecting on a past event, what stands out to you the most - the specific details or the overall meaning?','When offering support to a friend, what is your instinctive response?','Reflecting on a recent decision, what was the primary influence on your choice - logic or the impact on others?','How do you adapt to changes in your daily routine or plans?','In a team setting, what is your approach to completing tasks and reaching goals?']
  listpersonality:any[]=[
    'Idealism',
    'Curiosity',
    'Loyalty to values and people',
    'Sensitivity',
    'Warm-heartedness',
    'Empathy',
    'Sociability',
    'Inspiration'
  ];
  listbehavior:any[]=[
    'Seriousness',
    'Thoroughness',
    'Dependability',
    'Practicality',
    'Realism',
    'Logical decision-making',
    'Orderliness',
    'Organizational values',
    'Tradition and loyalty',
    'Friendliness',
    'Responsibility',
    'Conscientiousness',
    'Commitment',
    'Accuracy',
    'Values meaning',
    'Connections',
    'Relationships',
    'Organization',
    'Decisiveness',
    'Originality',
    'Drive for ideas and achievements',
    'Analytical',
    'Logical',
    'High standards',
    'Independence',
    'Skepticism',
    'Tolerance',
    'Flexibility',
    'Observational skills',
    'Critical thinking',
    'Spontaneity',
    'Action orientation',
    'Collaborative spirit',
    'Common sense',
    'Logical thinking',
    'Forcefulness',
    'Determination',
    'Cooperation',
    'Attention to small details',
    'Providing',
    'Contributing',
    'Appreciation-seeking'
  ];
  listtone:any[]=[
    'Warmth',
    'Enjoyment of material comforts'
  ];
  baseurl:string="http://localhost:8000/VM/";
  @Output() output:EventEmitter<string>= new EventEmitter<string>();
 reponse1:string;
 question:string=this.listquest[0];
 questnumber:number=0;
 done:boolean=false;
 width:number=0;
 listiter:any=[];
listelem:any=[];
vari:any;
 result:any;
 selectedColumns: { [key: string]: boolean } = {};
 constructor(private sessionStorage:LocalstorageService,private qService:QuestionnaireService) {
}
 getReponse1(){
   
   this.output.emit(this.reponse1);
   const selectedColumnss = Object.keys(this.selectedColumns).filter(column => this.selectedColumns[column]);
   console.log('Selected Columns:', selectedColumnss);
   
   this.done=true;
   this.valid=true;
   this.result={
    "variables": this.selectedColumns,
    
  }
   this.qService.sendData(JSON.stringify(this.result),this.baseurl).subscribe(
    (response) => {
       console.log(response);
       console.log(response.length % 4)
       this.vari=response.length %4;
       console.log(this.vari);
       let green=0 ;
       let yellow=0 ;
       let bleu =0;
       let red =0;
       let ii=0
       let num = Math.floor(response.length / 4);
       let iter= num;
       if((response.length % 4) !=0){
        iter+=1;
       }
       
        for (let j = 0; j < iter; j++) {
          this.listiter.push(j);

        }
       let jj =0;
       
       console.log(num)
       if((response.length %4)==0){
        green=num;
        yellow=num;
        bleu=num;
        red=num;

       }else if((response.length %4)==1){
        green=num+1;
        yellow=num;
        bleu=num;
        red=num;

       }else if((response.length %4)==2){
        green=num+1;
        yellow=num+1;
        bleu=num;
        red=num;

       }else if((response.length %4)==3){
        green=num+1;
        yellow=num+1;
        bleu=num+1;
        red=num;
       }
       
        for (let i = 0; i < num+1; i++) {
          

              
              if((response.length %4)==0){
                this.listelem.push(response[i]);
                this.listelem.push(response[i+green]);
                this.listelem.push(response[i+bleu+green]);
                this.listelem.push(response[i+yellow+bleu+green]);
               }else if((response.length %4)==1){
                if(i==num){
                  this.listelem.push(response[i]);
                }
                else{
                  this.listelem.push(response[i]);
                  this.listelem.push(response[i+green]);
                  this.listelem.push(response[i+bleu+green]);
                  this.listelem.push(response[i+yellow+bleu+green]);
                }
                
               }else if((response.length %4)==2){
                if(i==num){
                  this.listelem.push(response[i]);
                  this.listelem.push(response[i+green]);
                }
                else{
                  this.listelem.push(response[i]);
                  this.listelem.push(response[i+green]);
                  this.listelem.push(response[i+bleu+green]);
                  this.listelem.push(response[i+yellow+bleu+green]);
                }
                
               }else if((response.length %4)==3){
                if(i==num){
                  this.listelem.push(response[i]);
                  this.listelem.push(response[i+green]);
                  this.listelem.push(response[i+bleu+green]);
                }
                else{
                  this.listelem.push(response[i]);
                  this.listelem.push(response[i+green]);
                  this.listelem.push(response[i+bleu+green]);
                  this.listelem.push(response[i+yellow+bleu+green]);
                }
                
               }
            
            
            
          }
       console.log(this.listelem);
       
    },
    (error) => {
      console.error('Error communicating with backend:', error);
    }
  );
 }



}
