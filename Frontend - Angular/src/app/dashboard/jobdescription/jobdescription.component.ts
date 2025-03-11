import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { SharedService } from 'src/app/shared.service';
interface Job {
  id: number;
  nom: string,
  prenom: string,
  username:string,
  email: string,
  job_id: number,
  job_title: string,
  score: number,
  personality: string,
  color:boolean
}
@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.css', '../../../assets/assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../assets/assets/vendor/bootstrap-icons/bootstrap-icons.css', '../../../assets/assets/vendor/boxicons/css/boxicons.min.css',
    '../../../assets/assets/vendor/quill/quill.snow.css', '../../../assets/assets/vendor/remixicon/remixicon.css',
    '../../../assets/assets/vendor/quill/quill.bubble.css', '../../../assets/assets/vendor/simple-datatables/style.css',
    '../../../assets/assets/css/style.css']
})
export class JobdescriptionComponent implements OnInit {
change() {
  this.sharedService.setShowdesc(false);
}
  
  constructor(private http: HttpClient,private authService:AuthService,private sharedService:SharedService) { }
  jobs: Job[] = [];
  paginatedJobs: Job[] = [];
  private apiUrl = 'http://localhost:8000/jobs/';
  totalRecords = 0;
  rowsPerPage = 10;
  @Input() idJob:number;
  
  getFullStars(rating:number): number {
    return Math.floor(rating);
  }
  getFullStarsArray(rating:number): number[] {
    return Array(this.getFullStars(rating));
  }
  hasHalfStar(rating:number): boolean {
    return rating % 1 !== 0;
  }
  getEmptyStarsArray(rating:number): number[] {
    const totalStars = 5;
    const emptyStars = totalStars - Math.ceil(rating);
    return Array(emptyStars);
  }

  
  ngOnInit(): void {
    this.authService.getJobById(this.idJob).subscribe(jobU => {
      this.jobs = jobU;
      this.totalRecords = jobU.length;
      this.paginatedJobs = this.jobs.slice(0, this.rowsPerPage);
      
    });
     console.log(this.idJob);
     
  }
  onPageChange(event: any): void {
    const first = event.first;
    const rows = event.rows;
    this.paginatedJobs = this.jobs.slice(first, first + rows);
  }
}
