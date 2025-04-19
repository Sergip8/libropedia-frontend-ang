import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule para routerLink
import { AuthService } from '../../../../_core/services/auth.service';
import { LoginRequest, LoginResponse } from '../../../../models/auth-models';
import { finalize } from 'rxjs';
import { CommonService } from '../../../../_core/services/common.service';
import { AlertType } from '../../../../shared/alert/alert.type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule         
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Usamos el ! para indicar que se inicializará en ngOnInit
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private comonService:CommonService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Getter para acceder fácilmente a los controles del formulario en la plantilla
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login Submitted:', this.loginForm.value);
      this.login();
    } else {
      console.log('Formulario no válido');
      // Marca los campos como 'touched' para mostrar errores si el usuario intenta enviar sin llenar
      this.loginForm.markAllAsTouched();
    }
  }

  // Placeholder para la lógica de "Olvidé mi contraseña"
  onForgotPassword(): void {
    const emailValue = this.email?.value || '';
    if (emailValue && this.email?.valid) {
       console.log('Solicitud de recuperación de contraseña para:', emailValue);
      // AQUÍ VA LA LÓGICA:
      // Llama a tu servicio para iniciar el proceso de recuperación
    } else {
       console.log('Por favor, introduce un email válido para recuperar la contraseña.');
       this.email?.markAsTouched(); // Marca el campo de email si está vacío o inválido
    }
  }
  login(){
    
    this.authService.signIn(<LoginResponse>this.loginForm.value).pipe(
          finalize (() => {
            this.comonService.updateAlert({
              message: this.alertMsg,
              alertType: this.alert,
              show: true
            })
          })
        ).subscribe({
      next: data => {
        console.log(data)
          if(data.isError){
            this.alert = AlertType.Danger
          }else{
            this.authService.setToken(data.token)
            this.authService.updateUser()
            this.alert = AlertType.Success


            
          }
          this.alertMsg = data.message
          this.router.navigate([""])

      },error: e => {
        console.log(e)
        this.alert = AlertType.Danger
        this.alertMsg = e.error.message
      }
    })
  }
}