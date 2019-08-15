import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public submitProcess = false;
  public signUpForm: FormGroup;
  public submitted = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.signUpForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: RepeatPasswordValidator });
  }

  /**
   * Process sign up
   */
  public signUp() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.submitProcess = true;
      this._authService.signUp(this.signUpForm.value)
        .pipe(catchError(error => {
          this.submitProcess = false;
          return throwError(error);
        }))
        .subscribe((data) => {
          if (data.success) {
            localStorage.setItem('tokenApp', data.token);
            localStorage.setItem('username', this.signUpForm.controls['username'].value);
            this._router.navigate(['/catalog']);
          } else {
            this._toastrService.error(data.message);
          }
          this.submitProcess = false;
        });
    }
  }

}

export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const confirmPassword = group.controls.confirmPassword.value;
  return password === confirmPassword ? null : { passwordsNotEqual: true }
}
