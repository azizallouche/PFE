import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Job {
  title: string;
  overview: string;
  description: string;
  experience: string;
  work_level: string;
  employee_type: string;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css', '../../../assets/assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../assets/assets/vendor/bootstrap-icons/bootstrap-icons.css', '../../../assets/assets/vendor/boxicons/css/boxicons.min.css',
    '../../../assets/assets/vendor/quill/quill.snow.css', '../../../assets/assets/vendor/remixicon/remixicon.css',
    '../../../assets/assets/vendor/quill/quill.bubble.css', '../../../assets/assets/vendor/simple-datatables/style.css',
    '../../../assets/assets/css/style.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  paginatedJobs: Job[] = [];
  private apiUrl = 'http://localhost:8000/jobs/';
  totalRecords = 0;
  rowsPerPage = 10;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Job[]>(this.apiUrl).subscribe((data: Job[]) => {
      this.jobs = data;
      this.totalRecords = data.length;
      this.paginatedJobs = this.jobs.slice(0, this.rowsPerPage);
      console.log(data[0]);
    });
  }

  onPageChange(event: any): void {
    const first = event.first;
    const rows = event.rows;
    this.paginatedJobs = this.jobs.slice(first, first + rows);
  }
}
