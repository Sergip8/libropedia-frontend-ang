import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule para routerLink
import { RegistrationResponse } from '../../../../models/auth-models';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../_core/services/auth.service';
import { CommonService } from '../../../../_core/services/common.service';
import { AlertType } from '../../../../shared/alert/alert.type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    RouterModule         // Importa RouterModule aquí
   ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Puedes dejarlo vacío
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""

  constructor(private fb: FormBuilder,
    private authService: AuthService, 
    private commonService:CommonService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      // Podrías añadir confirmación de contraseña aquí si es necesario
      // confirmPassword: ['', Validators.required]
    }/*, { validators: this.passwordMatchValidator }*/); // Validador a nivel de grupo si hay confirmación
  }

  // Getters para acceso fácil
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  // Ejemplo de validador personalizado si añades confirmación de contraseña
  // passwordMatchValidator(form: FormGroup) {
  //   const password = form.get('password');
  //   const confirmPassword = form.get('confirmPassword');
  //   return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  // }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Register Submitted:', this.registerForm.value);
      // AQUÍ VA LA LÓGICA DE REGISTRO:
      // Llama a tu servicio de autenticación para registrar al usuario
      // Ejemplo: this.authService.register(this.registerForm.value).subscribe(...);
      this.register()
    } else {
      console.log('Formulario no válido');
      this.registerForm.markAllAsTouched();
    }
  }
  register(){
    const payload: RegistrationResponse = {
      username: this.registerForm.value["username"],
      email: this.registerForm.value["email"],
      password: this.registerForm.value["password"]
    }
    this.authService.signUp(payload).pipe(
      finalize (() => {
        this.commonService.updateAlert({
          message: this.alertMsg,
          alertType: this.alert,
          show: true
        })
      })
    ).subscribe({
      next: data => {
          if(data.isError){
            this.alert = AlertType.Danger
            
          }else{
            this.alert = AlertType.Success
          }
          this.alertMsg = data.message
          
      },error: e => {
        console.log(e)
        this.alert = AlertType.Danger
        this.alertMsg = e.error.message
      }
    })
  }
}