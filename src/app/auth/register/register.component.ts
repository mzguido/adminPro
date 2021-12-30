import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  //
  public formSubmitted = false;

  // TODO: Probar otras formas de crear los controles y groups, la usada esta deprecada
  public registerForm = this.fb.group(
    {
      name: ['Guido', [Validators.required, Validators.minLength(3)]],
      email: ['testEmail@test.com', [Validators.required, Validators.email]],
      password: ['12345', [Validators.required]],
      password2: ['12345', [Validators.required]],
      terms: [true, [Validators.requiredTrue]],
    },
    { validators: this.equalPasswords() }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }
    // Realizar el posteo del usuario
    this.userService.createUser(this.registerForm.value).subscribe(
      (res) => {
        console.log('Usuario creado');
        console.log(res);

        // Redireccionar al Dashboard
        this.router.navigate(['/dashboard']);
      },
      (e) => {
        // Cuando ocurra un error
        Swal.fire({
          title: 'Error',
          text: e.error.msg,
          icon: 'error',
          confirmButtonColor: '#368bf6',
        });
      }
    );
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  termsNotAccepted(): boolean {
    // return !this.registerForm.get('terms).value && this.formSubmitted;
    return !this.registerForm.controls.terms.value && this.formSubmitted;
  }

  invalidPass(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    }
    return false;
  }

  equalPasswords() {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get('password');
      const pass2 = formGroup.get('password2');

      // if (pass1.value === pass2.value) {
      //   pass1.setErrors(null);
      // } else {
      //   pass1.setErrors({ notEqual: true });
      // }
      if (pass1.value !== pass2.value) {
        pass2.setErrors({ notEqual: true });
      }
      return null;
    };
  }
}
