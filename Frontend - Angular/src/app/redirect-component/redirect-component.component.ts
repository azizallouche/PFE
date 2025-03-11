import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-redirect-component',
  templateUrl: './redirect-component.component.html',
  styleUrls: ['./redirect-component.component.css']
})
export class RedirectComponentComponent implements OnInit {
  constructor(private router: Router,private authService:AuthService) {}
 type:string;
  ngOnInit(): void {
    this.authService.getUserType().subscribe(
      response => {
        this.type=response['type'];
        console.log("type:"+this.type);
        if (this.type =="staff") {
          this.router.navigate(['/dashboard']);
        } else if (this.type=="simple_user") {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/auth']);
        }
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
 

  
  }
}
