import { Component, OnInit ,AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

interface Job {
  id: any;
  title: string;
  overview: string;
  description: string[];
  experience: string;
  work_level: string;
  employee_type: string;
  variables: string[];
  results: any;
  is_applied: boolean;
  num_applicants: number; 
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  chatOpen:boolean=false;
  allowIconDisplay:boolean=true;
  isModalVisible = false;
  selectedJob: Job;
  isIntroMsg: boolean = true;
  messages: { author: string; content: string }[] = [];
  mbtipassed: boolean;
  big5passed: boolean;
  isTestVisible: boolean = false;
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  employmentTypes: { id: string, label: string, checked: boolean ,num:number }[] = [];
  
  seniorityLevels: { id: string, label: string, checked: boolean ,num:number }[] = [];
  private apiUrl = 'http://localhost:8000/get-all-jobs/';
  isChatVisible: boolean = false;
  isOpen: boolean = false;

  openForm(): void {
    this.isOpen = true;
  }

  closeForm(): void {
    this.isOpen = false;
  }

  constructor(private http: HttpClient, private authService: AuthService) {}
 
  ngOnInit(): void {
    this.getData();
  }
getData():void{
  this.http.get<Job[]>(this.apiUrl).subscribe((data: Job[]) => {
    this.jobs = data;
    this.initializeFilters();
    this.filterJobs();
  });
}
initializeFilters(): void {
  const employmentTypeMap = new Map<string, number>();
  const seniorityLevelMap = new Map<string, number>();

  this.jobs.forEach(job => {
    employmentTypeMap.set(job.employee_type, (employmentTypeMap.get(job.employee_type) || 0) + 1);
    seniorityLevelMap.set(job.work_level, (seniorityLevelMap.get(job.work_level) || 0) + 1);
  });

  this.employmentTypes = Array.from(employmentTypeMap.entries()).map(([type, num]) => ({ id: type, label: type, checked: true, num }));
  this.seniorityLevels = Array.from(seniorityLevelMap.entries()).map(([level, num]) => ({ id: level, label: level, checked: true, num }));
}

filterJobs(): void {
  const selectedEmploymentTypes = this.employmentTypes.filter(type => type.checked).map(type => type.id);
  const selectedSeniorityLevels = this.seniorityLevels.filter(level => level.checked).map(level => level.id);

  this.filteredJobs = this.jobs.filter(job => 
    selectedEmploymentTypes.includes(job.employee_type) && 
    selectedSeniorityLevels.includes(job.work_level)
  );
}

  showModal(job: Job) {
    this.authService.getMbti().subscribe(
      response => {
        this.mbtipassed = response['passed'];
        this.authService.getBig5().subscribe(
          response => {
            this.big5passed = response['passed'];
            if (this.mbtipassed && this.big5passed) {
              this.isModalVisible = true;
              this.selectedJob = job;
            } else {
              this.isTestVisible = true;
            }
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  }

  closeModal() {
    this.isModalVisible = false;
  }

  closeModal2() {
    this.isTestVisible = false;
  }

 
  apply(idd: number, resultss: any[]) {
    const data = { id: idd, results: resultss };
    this.authService.saveJobU(data).subscribe(
      response => {
        console.log(response['message']);
        this.getData();  // Refresh job data after applying
        this.closeModal();
      },
      error => console.error(error)
    );
  }

 

  
}

