import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { UserService } from '@app/services/user/user.service';
import {AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  form: FormGroup;

  constructor(private fb: FormBuilder,private appComponent: AppComponent,
    private router: Router,private authService: AuthService,
    private userService: UserService) {
    this.form = this.fb.group({
      username:[null],
      password:[null], 
    });
  }



  login() {
    console.log(this.form.value)

    this.authService.login(this.form.value.username, this.form.value.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['']);     
        const token = response.token;
        // Guarda el token en localStorage
        this.authService.setToken(token);
        // Recupera información del usuario (puedes ajustar según tu API)
        const user = {
          userId: response.user.userId,
          usuario: response.user.username,
        }; 
        // Almacena el usuario en el servicio
        this.userService.setCurrentUser(user); 
      } else {
        console.log('Login failed', response.message);
      }
    });
  }

}
