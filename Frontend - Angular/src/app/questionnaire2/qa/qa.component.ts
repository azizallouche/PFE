import {Component, EventEmitter, Input, OnInit, AfterViewInit, Output} from '@angular/core';
import {LocalstorageService} from "../../services/localstorage.service";

import {QuestionnaireService} from "../../services/questionnaire.service";

import $ from 'jquery';
import { AuthService } from 'src/app/auth.service';
import { SharedService } from 'src/app/shared.service';


// Quiz Creator
class CQuiz {
  question: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  opt5: string;
  answer: number;
  asked: number;

  constructor(que: string, o1: string, o2: string, o3: string, o4: string,o5: string, ans: number, d: number) {
    this.question = que;
    this.opt1 = o1;
    this.opt2 = o2;
    this.opt3 = o3;
    this.opt4 = o4;
    this.opt5 = o5;
    this.answer = ans;
    this.asked = d;
  }
}

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css','../../questionnaire/qa/qa.component.css']
})
export class QAComponent implements OnInit, AfterViewInit {
  selectedValue: string | null=null;
  usernameForm: HTMLElement | null = null;
  uname: HTMLElement | null = null;
  login: boolean = false;
  theQuiz: HTMLElement | null = null;
  pass: HTMLInputElement | null = null;
  submitBtn: HTMLButtonElement | null = null;
  err: HTMLElement | null = null;
  errH: HTMLElement | null = null;
  queDone: number = 0;
  userAns: string[] = [];
  queDoneArr: number[] = [];
  p: HTMLElement | null = null;
  O1: HTMLElement | null ;
  O2: HTMLElement | null ;
  O3: HTMLElement | null;
  O4: HTMLElement | null ;
  O5: HTMLElement | null ;
  nextBtn: HTMLButtonElement | null = null;
  resultCircle: HTMLElement | null = null;
  resultFb: HTMLElement | null = null;
  correctAns: HTMLElement | null = null;
  quizCompleted: boolean = false;
  lett: boolean = false;
  RColor: string = '';
  dataquiz:any[]=[];
  E: number;
  A: number;
  C: number;
  N: number;
  O: number;
   totQ = [
    // Extroversion Questions
    new CQuiz('I am the life of the party.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I don’t talk a lot.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I feel comfortable around people.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I keep in the background.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I start conversations.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I have little to say.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I talk to a lot of different people at parties.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I don’t like to draw attention to myself.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I don’t mind being the center of attention.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I am quiet around strangers.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),

    // Neuroticism Questions
    new CQuiz('I get stressed out easily.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I am relaxed most of the time.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I worry about things.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I seldom feel blue.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I am easily disturbed.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I get upset easily.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I change my mood a lot.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I have frequent mood swings.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I get irritated easily.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I often feel blue.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),

    // Agreeableness Questions
    new CQuiz('I feel little concern for others.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I am interested in people.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I insult people.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I sympathize with others’ feelings.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I am not interested in other people’s problems.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I have a soft heart.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I am not really interested in others.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I take time out for others.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I feel others’ emotions.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I make people feel at ease.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),

    // Conscientiousness Questions
    new CQuiz('I am always prepared.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I leave my belongings around.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I pay attention to details.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I make a mess of things.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I get chores done right away.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I often forget to put things back in their proper place.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I like order.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I shirk my duties.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I follow a schedule.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I am exacting in my work.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),

    // Openness Questions
    new CQuiz('I have a rich vocabulary.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I have difficulty understanding abstract ideas.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I have a vivid imagination.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I am not interested in abstract ideas.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I have excellent ideas.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I do not have a good imagination.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 4, 0),
    new CQuiz('I am quick to understand things.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I use difficult words.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I spend time reflecting on things.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0),
    new CQuiz('I am full of ideas.', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree', 3, 0)
];
  big5results: any;
  big5passed: boolean;


  constructor(private sharedService:SharedService,private authService:AuthService, private sessionStorage: LocalstorageService, private qService: QuestionnaireService) {}
  ngAfterViewInit(): void {
    const labels = document.querySelectorAll('.sliders .tap');
    const blogCard = document.querySelector('.blog-card') as HTMLElement;

    labels.forEach((label, index) => {
      label.addEventListener('click', () => {
        // Change the background color based on the label clicked
        switch (index) {
          case 0:
            blogCard.style.backgroundColor = '#38B1CC';
            break;
          case 1:
            blogCard.style.backgroundColor = '#2CB299';
            break;
          case 2:
            blogCard.style.backgroundColor = '#8E5D9F';
            break;
          case 3:
            blogCard.style.backgroundColor = '#EFC32F';
            break;
          case 4:
            blogCard.style.backgroundColor = '#E44C41';
            break;
          default:
            blogCard.style.backgroundColor = 'white';
        }
      });
    });
  }

  ngOnInit() {
    this.usernameForm = document.getElementById('username');
    this.uname = document.getElementById('uname');
    this.theQuiz = document.getElementById('theQuiz');
    this.pass = document.getElementById('pass') as HTMLInputElement;
    this.submitBtn = document.getElementById('submit') as HTMLButtonElement;
    this.err = document.getElementById('err');
    this.errH = document.getElementById('errH');
    this.p = document.getElementById('que');
    this.O1 = document.getElementById('opt1');
    this.O2 = document.getElementById('opt2');
    this.O3 = document.getElementById('opt3');
    this.O4 = document.getElementById('opt4');
    this.O5 = document.getElementById('opt5');
    this.nextBtn = document.getElementById('next-button') as HTMLButtonElement;
    this.resultCircle = document.getElementById('resultCircle');
    this.resultFb = document.getElementById('resultFb');
    this.correctAns = document.getElementById('correctAns');
    this.steps(19);
    this.chkUser();
    
    this.authService.getBig5().subscribe(
      response => {
        this.big5passed = response['passed'];
        this.big5results = response['results'];
        console.log(response);
        if(this.big5passed){
           this.trait();
        }
       
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

  chkUser() {
    const tempCa = localStorage.getItem('ca'); // get previous correct answer
    const tempPer = localStorage.getItem('percentage'); // get previous percentage

    this.startQuiz();
    // if percentage and correct answers found
    if (this.theQuiz) {
      this.theQuiz.style.display = 'block';
      
    }
    this.showResult(Number(tempPer), Number(tempCa));
  }
  

  typing() {
    // enable 'verify identity btn' as user starts typing
    if (this.pass && this.submitBtn) {
      if (this.pass.value !== '') {
        this.submitBtn.removeAttribute('disabled');
        const fingerprint = document.getElementsByClassName('finger-print')[0] as HTMLElement;
        if (fingerprint) fingerprint.style.opacity = '1';
      } else {
        this.submitBtn.setAttribute('disabled', 'disabled');
        const fingerprint = document.getElementsByClassName('finger-print')[0] as HTMLElement;
        if (fingerprint) fingerprint.style.opacity = '.6';
      }
    }
  }

  startQuiz() {
    if (this.theQuiz) {
      this.theQuiz.style.display = 'block'; // show the quiz page
      this.randomQ(); // trigger first question
    }
  }

  steps(quizLength: number) {
    const mainStepDiv = document.getElementById('steps');
    if (mainStepDiv) {
      for (let i = 0; i < quizLength; i++) {
        const span = document.createElement('span');
        span.className = 'step';
        mainStepDiv.appendChild(span);
      }
    }
  }

  randomQ() {
    console.log("yess");
    let thisAsked = false;
    const x = this.queDone// get a random number b/w 0 to total questions
    while ((this.totQ[x].asked === 0) == true) {
      // if this question is not asked
      thisAsked = true; // this will be true
      this.totQ[x].asked = 1; // mark this as asked
      this.queDoneArr.unshift(x); // put in asked question array
      this.queDone = ++this.queDone; // increase the counter
      if (this.p && this.O1 && this.O2 && this.O3 && this.O4 && this.O5) {
        this.p.innerHTML = this.totQ[x].question; // write question
        if (this.O1.nextElementSibling) this.O1.nextElementSibling.innerHTML = this.totQ[x].opt1; // write option 1
        if (this.O2.nextElementSibling) this.O2.nextElementSibling.innerHTML = this.totQ[x].opt2; // write option 2
        if (this.O3.nextElementSibling) this.O3.nextElementSibling.innerHTML = this.totQ[x].opt3; // write option 3
        if (this.O4.nextElementSibling) this.O4.nextElementSibling.innerHTML = this.totQ[x].opt4; // write option 4
        if (this.O5.nextElementSibling) this.O5.nextElementSibling.innerHTML = this.totQ[x].opt5; // write option 4
      }
    }
    if (!thisAsked) {
      // if random number is already asked and this didn't become true go inside and fire random question again
      if (this.queDone != this.totQ.length) {
        // if not reached total length
        this.randomQ();
      }
    }
  }


  next() {
   
    // if no option in the current tab is selected
    let radios = document.getElementsByName('q') as NodeListOf<HTMLInputElement>;
        
    let selectedValue: any = 3;
    
    // Loop through the radio buttons to find the checked one
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            console.log("Selected value: " + selectedValue);
            break;
        }
    }
    for (let i = 0; i < radios.length; i++) {
      // Check the radio button if its value is '3', otherwise uncheck it
      
          radios[i].checked = false;
      
  }
  this.selectedValue=null;
    this.dataquiz.push(selectedValue);
        console.log(this.dataquiz);
    this.topping(this.queDone); // setting up btn and steps counter...
    console.log(this.queDone)
    document.getElementsByClassName('step')[this.queDone - 1].className += ' finish';
    document.getElementsByClassName('step')[this.queDone ].className += ' active';
    if (this.queDone == this.totQ.length) {
      // if reached the end of the questions
      if (this.theQuiz) this.theQuiz.style.display = 'none';
      const theResult = document.getElementById('theResult');
      if (theResult) theResult.style.display = 'block';
     
       // calculates result
      return this.calcResult();
    }
   // otherwise, fires next question...
    this.randomQ(); // return true for other cases
}
trait(){
  if (this.theQuiz) this.theQuiz.style.display = 'none';
      const theResult = document.getElementById('theResult');
      if (theResult) theResult.style.display = 'block';
      $('.bar-percentage[data-percentage]').each(function () {
        var progress = $(this);
        const percentageAttr = progress.attr('data-percentage');
      const percentage = percentageAttr ? Math.ceil(Number(percentageAttr)) : 0;
        $({countNum: 0}).animate({countNum: percentage}, {
          duration: 2000,
          easing:'linear',
          step: function() {
            // What todo on every count
            var pct = Math.floor(this.countNum) + '%';
            progress.text(pct) && progress.siblings().children().css('width',pct);
          }
        });
      });
  
      let correct = 0;
      for (let i = 0; i < this.userAns.length; i++) {
        if (this.userAns[i] == this.totQ[this.queDoneArr[i]].answer.toString()) {
          correct++;
        }
      }
      const percentage = Math.floor((correct / this.totQ.length) * 100);
     // this.showResult(percentage, correct);
      
      this.E=this.big5results['E'].toString();
      this.A=this.big5results['A'].toString();
      this.O=this.big5results['O'];
      this.C=this.big5results['C'];
      this.N=this.big5results['N'];
     // this.lett=true;
      console.log(this.E);
}

  validateForm() {
    let valid = false;
    const chkBox = document.getElementsByClassName('custom-control-input') as HTMLCollectionOf<HTMLInputElement>; // targeting all checkboxes...
    for (let i = 0; i < chkBox.length; i++) {
      // checks every radio btn
      if (chkBox[i].checked) {
        // if found checked
        valid = true;
        this.userAns.unshift(chkBox[i].value); // store user's answer
        chkBox[i].checked = false;
        if (this.nextBtn) this.nextBtn.setAttribute('disabled', 'disabled'); // disable button for next question
        break;
      }
    }
    if (!valid) {
      // if no option selected
      alert('Please Select Any Option...');
      if (this.nextBtn) this.nextBtn.setAttribute('disabled', 'disabled');
    }
    if (valid) {
      // if the valid status is true, mark the step as finished
      const steps = document.getElementsByClassName('step');
      if (steps[this.queDone - 1]) {
        steps[this.queDone - 1].className += ' finish';
      }
    }
    return valid; // return the valid status
  }

  enableBtn(i: HTMLInputElement) {
    if (i.checked) {
      if (this.nextBtn) this.nextBtn.removeAttribute('disabled');
    } else {
      if (this.nextBtn) this.nextBtn.setAttribute('disabled', 'disabled');
    }
  }

  topping(n: number) {
    // dynamic next button's text
    if (n == this.totQ.length - 1) {
      const nextButton = document.getElementById('next-button');
      if (nextButton) nextButton.innerHTML = 'Submit';
    } else if (n == this.totQ.length) {
      const nextButton = document.getElementById('next-button');
      if (nextButton) nextButton.innerHTML = 'Next';
    }
  }

  calcResult() {
    $('.bar-percentage[data-percentage]').each(function () {
      var progress = $(this);
      const percentageAttr = progress.attr('data-percentage');
    const percentage = percentageAttr ? Math.ceil(Number(percentageAttr)) : 0;
      $({countNum: 0}).animate({countNum: percentage}, {
        duration: 2000,
        easing:'linear',
        step: function() {
          // What todo on every count
          var pct = Math.floor(this.countNum) + '%';
          progress.text(pct) && progress.siblings().children().css('width',pct);
        }
      });
    });

    let correct = 0;
    for (let i = 0; i < this.userAns.length; i++) {
      if (this.userAns[i] == this.totQ[this.queDoneArr[i]].answer.toString()) {
        correct++;
      }
    }
    const percentage = Math.floor((correct / this.totQ.length) * 100);
    this.showResult(percentage, correct);
    let body={
      "answer": this.dataquiz,
    }
    let baseurl="http://localhost:8000/big5/test/";
    this.qService.sendData(JSON.stringify(body),baseurl).subscribe(
        (response) => {
          this.E=response['E'].toString();
          this.A=response['A'].toString();
          this.O=response['O'];
          this.C=response['C'];
          this.N=response['N'];
          this.lett=true;
          console.log(this.E);
          this.big5passed=true;
          this.sharedService.setBig5Passed(true);
         

// Add a class

        },
        (error) => {
          console.error('Error communicating with backend:', error);
        }
      );
  }

  showResult(percentage: number, correct: number) {
    const resultElement = document.getElementById('result');
    if (resultElement) {
      resultElement.innerHTML = `You answered ${correct} out of ${this.totQ.length} questions correctly. Your score is ${percentage}%.`;
    }
  }


  
}



 




