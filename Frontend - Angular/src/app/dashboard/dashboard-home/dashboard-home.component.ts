import { Component, ElementRef, AfterViewInit, Renderer2, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css',  "../../../assets/assets/vendor/bootstrap/css/bootstrap.min.css", "../../../assets/assets/vendor/bootstrap-icons/bootstrap-icons.css", "../../../assets/assets/vendor/boxicons/css/boxicons.min.css","../../../assets/assets/vendor/quill/quill.snow.css","../../../assets/assets/vendor/remixicon/remixicon.css","../../../assets/assets/vendor/quill/quill.bubble.css"
    ,'../../../assets/assets/vendor/simple-datatables/style.css',"../../../assets/assets/css/style.css"]
})
export class DashboardHomeComponent implements OnInit {
  visibleSidebar: boolean = false;
  items: MenuItem[];
  expandedSections: string[] = [];
  userInfo: any;
  isActive(url: string): boolean {
    return this.router.url === url;
  }

  toggleCollapse(sectionId: string) {
    // Toggle the section's ID in the expandedSections array
    if (this.isExpanded(sectionId)) {
      this.expandedSections = this.expandedSections.filter(id => id !== sectionId);
    } else {
      this.expandedSections.push(sectionId);
    }
  }

  isExpanded(sectionId: string): boolean {
    // Check if the section's ID is in the expandedSections array
    return this.expandedSections.includes(sectionId);
  }
  data: any[] = [
    { name: 'John', age: 30, country: 'USA' },
    { name: 'Anna', age: 24, country: 'UK' },
    { name: 'Mike', age: 35, country: 'Canada' }
  ];
products: any;

  constructor(private el: ElementRef, private renderer: Renderer2,private router:Router,private authService:AuthService) {}
  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      response => {
        this.userInfo = response;
        console.log(this.userInfo)
      },
      error => {
        console.error(error);
      }
    );
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus' },
          { label: 'Open', icon: 'pi pi-fw pi-download' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }

  navigate(destination: string) {
    console.log(`Navigating to ${destination}`);
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
