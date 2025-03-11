import { Component,AfterViewInit, Renderer2 } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../auth.service';
import $ from 'jquery';
@Component({
  selector: 'app-addhr',
  templateUrl: './addhr.component.html',
  styleUrls: ['./addhr.component.css',  "../../../assets/assets/vendor/bootstrap/css/bootstrap.min.css", "../../../assets/assets/vendor/bootstrap-icons/bootstrap-icons.css", "../../../assets/assets/vendor/boxicons/css/boxicons.min.css","../../../assets/assets/vendor/quill/quill.snow.css","../../../assets/assets/vendor/remixicon/remixicon.css","../../../assets/assets/vendor/quill/quill.bubble.css"
    ,'../../../assets/assets/vendor/simple-datatables/style.css',"../../../assets/assets/css/style.css"]
})
export class AddhrComponent implements AfterViewInit {
  openpop(){
    this.vis=true;
  }
  closepop(){
    this.vis=false;
  }
email: any;
username: any;
username1:any;
firstname: any;
lastname: any;
password:any;
vis:boolean=false;
constructor(private authService: AuthService) { }
preventEnterKey($event: Event) {
throw new Error('Method not implemented.');
}


ngAfterViewInit(): void {
 
}

onSubmit() {
  this.password=this.generatepassword();
  this.username1=this.username;
  const userData = {
    username: this.username,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    password:this.password ,
    type:"staff"
  };
  this.authService.register(userData).subscribe(
    response => {
      console.log(this.password);
      this.resetForm();
    },
    error => {
      console.error(error);
      // Handle error
    }
  );
}
resetForm(): void {
  // Reset the component properties to empty strings
  this.email = '';
  this.username = '';
  this.firstname = '';
  this.lastname = '';
}
generatepassword(){
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var string_length = 8;
var randomstring = '';
for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
}
return randomstring;
}

}
