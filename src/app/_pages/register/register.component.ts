import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  genderOptions: { value: string; text: string }[] = [
    { value: '1', text: 'Masculino' },
    { value: '2', text: 'Femenino' },
    { value: '3', text: 'Prefiero no decirlo' },
    { value: '4', text: 'Otro' },
  ];
  showErrors: boolean = false;
  errorMessages: { attribute: string; message: string }[] = [
    { attribute: 'Default', message: '' },
    { attribute: 'Rut', message: '' },
    { attribute: 'Name', message: '' },
    { attribute: 'Birthday', message: '' },
    { attribute: 'Email', message: '' },
    { attribute: 'GenderId', message: '' },
    { attribute: 'Password', message: '' },
    { attribute: 'ConfirmPassword', message: '' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      rut: ['', Validators.required],
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genderId: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (result) => {
        this.errorMessages.forEach((error) => {
          error.message = '';
        });

        if (result.error.errors) {
          this.errorMessages.forEach((error) => {
            if (error.attribute in result.error.errors) {
              error.message = result.error.errors[error.attribute][0];
            }
          });
        } else {
          this.errorMessages[0].message = result.error;
        }

        this.showErrors = true;
      },
    });
  }
}
