import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formregister : FormGroup;
  showPassword: boolean = false;


  constructor(private fb: FormBuilder,private appComponent: AppComponent,
    private router: Router,private authService: AuthService,
    private userService: UserService) {
    this.form = this.fb.group({
      username:[null],
      password:[null], 
    });

    this.formregister = this.fb.group({
      usuario:[null],
      contrasena:[null], 
      correo:[null], 
      id_tipo_usuario:1,
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.form.value.username, this.form.value.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['']);     
        const token = response.token;
        // Guarda el token en localStorage
        this.authService.setToken(token);
        // Recupera información del usuario (puedes ajustar según tu API)
        const user = {
          userId: response.user.id_usuario,
          usuario: response.user.usuario,
          tipo_usuario:response.user.nombre_tipo_usuario,
          id_tipo_usuario:response.user.id_tipo_usuario,
          id_bar:response.user.id_bar
        }; 
        // Almacena el usuario en el servicio
        this.userService.setCurrentUser(user); 
      } else {
        console.log('Login failed', response.message);
      }
    });
  }

  registerUser() {
    console.log(this.formregister.value)
    if (this.formregister.valid) {
      const user = this.formregister.value; 
      console.log(user)
      // Llama al servicio para registrar al usuario
      this.userService.save(user).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['']);  
          // Puedes redirigir al usuario a la página de inicio de sesión u otra página aquí
        },
        (error) => {
          console.error('Error durante el registro:', error);
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
    }
  }
}
