import { Component, AfterViewInit ,OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  
})
export class AuthComponent implements AfterViewInit,OnInit {

  registerUsername: string;
  registerEmail: string;
  registerPassword: string;
  registerFirstname: string;
  registerLastname: string;
  usernameTaken: boolean = false;
  loginUsername: string;
  loginPassword: string;
  exist:string="";
  existl:string="";
  type:string;
  usernames: string[] = [];
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.getUsernames().subscribe(
      (data) => {
        this.usernames = data;
        console.log(this.usernames);
      },
      (error) => {
        console.error('Error fetching usernames', error);
      }
    );
  
  }
  checkUsername(): void {
    this.usernameTaken = this.usernames.includes(this.registerUsername);
    console.log(this.usernameTaken);
  }

  ngAfterViewInit() {



    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    
    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }

  register() {
    const userData = {
      username: this.registerUsername,
      firstname: this.registerFirstname,
      lastname: this.registerLastname,
      email: this.registerEmail,
      password: this.registerPassword
    };
    this.authService.register(userData).subscribe(
      response => {
        console.log(response['message']);
        this.exist=response['message'];
        this.router.navigate(['/home']);
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

  login() {
    const credentials = {
      username: this.loginUsername,
      password: this.loginPassword
    };
   
    this.authService.login(credentials).subscribe(
      response => {
        console.log(response['message']);
        this.existl=response['message'];
        if (response['message'] == "s") {
          this.authService.getUserType().subscribe(
            response => {
              this.type=response['type'];
              console.log(this.type);
          console.log(this.type == "staff");
          if(this.type=="staff"){
            this.router.navigate(['/dashboard']);
            
           }
           else{
            this.router.navigate(['/home']);
           }
            },
            error => {
              console.error(error);
              // Handle error
            }
          );
          
          
          // Redirect to home page upon successful login
          console.log("Logged in successfully");
        }
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log(response);
        // Handle success, e.g., redirect to login page or update UI
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }
}
