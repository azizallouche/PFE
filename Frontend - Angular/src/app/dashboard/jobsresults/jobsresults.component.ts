import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
interface Job {
  id:number;
  title: string;
  overview: string;
  description: string;
  experience: string;
  work_level: string;
  employee_type: string;
  results:any;
}

@Component({
  selector: 'app-jobsresults',
  templateUrl: './jobsresults.component.html',
  styleUrls: ['./jobsresults.component.css']
})
export class JobsresultsComponent implements OnInit{
  idJob:number;
  showdesc:boolean=false;
  num:number;
apply(id: number) {
 this.idJob=id;
 this.showdesc=true;
 this.sharedService.setShowdesc(true);
}

  constructor(private http: HttpClient,private sharedService:SharedService) { }
  jobs: Job[] = [];
  paginatedJobs: Job[] = [];
  private apiUrl = 'http://localhost:8000/get-all-jobs/';
  ngOnInit(): void {
    this.sharedService.showdesc$.subscribe(value => {
      this.showdesc = value;
    });
  
    this.http.get<Job[]>(this.apiUrl).subscribe((data: Job[]) => {
      this.jobs = data;
      console.log(data[0].id);
      this.num=data.length;
      
    });
  }
}
