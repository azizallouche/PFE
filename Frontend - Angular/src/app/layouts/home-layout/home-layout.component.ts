import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {
  userInfo: any;
  currentComponent: string = 'quiz'; // Default to quiz component
  currentUrl: string;
  showComponent(component: string) {
    this.currentComponent = component;
  }
  
  constructor(private authService: AuthService,private route: ActivatedRoute , private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
   }
   isActive(url: string): boolean {
    return this.currentUrl === url;
  }
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    const section = document.querySelector("section");
    
    const showBtn = document.querySelector(".a");
    const closeBtn = document.querySelector(".c");
    this.authService.getUserInfo().subscribe(
      response => {
        this.userInfo = response;
        console.log(this.userInfo)
      },
      error => {
        console.error(error);
      }
    );


      showBtn?.addEventListener("click", () => section?.classList.add("active"));

      closeBtn?.addEventListener("click", () => section?.classList.remove("active"));

      
      function closeBox() {
          
            section?.classList.remove("active");
        }

    this.route.url.subscribe(urlSegments => {
      // Check if the route path matches '/home'
      const isHomeRoute = urlSegments.length > 0 && urlSegments[0].path === 'home';
      if (isHomeRoute) {
        // Call your function here
        this.authService.getUserInfo().subscribe(
          response => {
            this.userInfo = response;
            console.log(this.userInfo)
          },
          error => {
            console.error(error);
          }
        );
      }
    });

  }

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/auth']);
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }
}
