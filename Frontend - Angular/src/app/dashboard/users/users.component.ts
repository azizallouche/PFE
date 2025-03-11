import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css',  "../../../assets/assets/vendor/bootstrap/css/bootstrap.min.css", "../../../assets/assets/vendor/bootstrap-icons/bootstrap-icons.css", "../../../assets/assets/vendor/boxicons/css/boxicons.min.css","../../../assets/assets/vendor/quill/quill.snow.css","../../../assets/assets/vendor/remixicon/remixicon.css","../../../assets/assets/vendor/quill/quill.bubble.css"
    ,'../../../assets/assets/vendor/simple-datatables/style.css',"../../../assets/assets/css/style.css"]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  private apiUrl = 'http://localhost:8000/users/';
  totalRecords: number = 0;
  rowsPerPage: number = 10;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<User[]>(this.apiUrl).subscribe((data: User[]) => {
      this.users = data;
      this.totalRecords = data.length;
      this.paginatedUsers = this.users.slice(0, this.rowsPerPage);
    });
  }

  onPageChange(event: any): void {
    const first = event.first;
    const rows = event.rows;
    this.paginatedUsers = this.users.slice(first, first + rows);
  }
}