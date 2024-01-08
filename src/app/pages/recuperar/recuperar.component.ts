import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import { AuthService } from '@app/services/auth/auth.service';
import { MensajeService } from '@app/services/mensaje/mensaje.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  form: FormGroup;

  constructor(private mensajeService: MensajeService,private fb: FormBuilder, private authService: AuthService,private appComponent: AppComponent) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    const email = this.form.value.email;
    this.authService.requestPasswordReset(email).subscribe(
      (response) => {
        this.mensajeService.showAlert('Exito', response.message, 'success');
      },
      (error) => {
        this.mensajeService.showAlert('Error', 'No se encuentra correo electronico registrado', 'error');
        console.error('Password reset request failed', error.message);
      }
    );
  }

}
