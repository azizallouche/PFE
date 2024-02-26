import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalstorageService} from "../../services/localstorage.service";

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
  
  @Output() output:EventEmitter<string>= new EventEmitter<string>();
 reponse1:string;
 question:string=this.listquest[0];
 questnumber:number=0;
 done:boolean=false;
 width:number=0;

 constructor() {

 }
 getReponse1(){
   console.log(this.reponse1)
   this.output.emit(this.reponse1);
   var textarea = document.getElementById("reponse1") as HTMLTextAreaElement;
   if (textarea) {
     textarea.value = '';
   }
   this.width+=12.5;
   this.incrementquestion();
   if(this.questnumber==8){
      this.done=true;
    }
   }
   incrementquestion(){
   this.questnumber++;
   this.question=this.listquest[this.questnumber];

   }



}
