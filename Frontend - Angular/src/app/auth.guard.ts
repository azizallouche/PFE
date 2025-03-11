// auth.guard.ts
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router,CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,OnInit {
  type:string;
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.authService.getUserType().subscribe(
      response => {
        console.log(response);
        this.type=response;
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }
  
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.authService.getUserType().subscribe(
      response => {
        this.type=response['type'];
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
    return this.authService.isConnected().pipe(
      
      map(response => {
        
        const isAuthRoute = state.url === '/auth';
        
        if (response.is_connected) {
         
          if (this.type!="staff" && state.url.includes('/home')) {
            return true;
          } else if (this.type=="staff" && state.url.includes('/dashboard')) {
            return true;
          } else if (this.type!="staff" && state.url.includes('/dashboard')) {
            // Redirect simple user to '/home' if trying to access '/dashboard'
            this.router.navigate(['/home']);
            return false;
          } else if (this.type=="staff" && state.url.includes('/home')) {
            // Redirect staff to '/dashboard' if trying to access '/home'
            this.router.navigate(['/dashboard']);
            return false;
          } else
          if (isAuthRoute) {
            
            if(this.type=="staff"){
             
              this.router.navigate(['/dashboard']);
              return false;
            }
            else{

              this.router.navigate(['/home']);

              return false;
            }
           
            
          }else{
            this.router.navigate([state.url]);
            return false;
          }
          return true;
        } else {
          if (!isAuthRoute) {
            this.router.navigate(['/auth']);
            return false;
          }
          return true;
        }
      })
    );
  }



}
