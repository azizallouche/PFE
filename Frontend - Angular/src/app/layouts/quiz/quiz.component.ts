import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { SharedService } from 'src/app/shared.service';
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
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  mbtipassed:boolean;
  mbtiresults:MBTIResults;
  big5results:any;
  big5passed:boolean=false;
  constructor(private sharedService:SharedService,private authService: AuthService) { }
  ngOnInit(): void {
    this.sharedService.big5Passed$.subscribe(passed => {
      this.big5passed = passed;
     
    });
    this.sharedService.mbtiPassed$.subscribe(passed => {
      this.mbtipassed = passed;
     
    });
    this.authService.getMbti().subscribe(
      response => {
        this.mbtipassed=response['passed'];
        this.mbtiresults=response['results'];
        console.log(this.mbtipassed);
      },
      error => {
        console.error(error);
        // Handle errorg
      }
    );
  
  this.authService.getBig5().subscribe(
    response => {
      this.big5passed=response['passed'];
      this.big5results=response['results'];
      console.log(this.big5results)
    },
    error => {
      console.error(error);
      // Handle errorg
    }
  );
  console.log(this.mbtipassed);
}

  showQuestionnaire1 = true;
  showQuestionnaire2 = false;

  showQuestionnaire(type: string) {
    if (type === 'mbti') {
      this.showQuestionnaire1 = true;
      this.showQuestionnaire2 = false;
    } else if (type === 'big5') {
      this.showQuestionnaire1 = false;
      this.showQuestionnaire2 = true;
    }
  }
}
