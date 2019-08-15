import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitProcess = false;
  public loginForm: FormGroup;
  public submitted = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Login process
   */
  public signIn() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitProcess = true;
      this._authService.login(this.loginForm.value)
        .pipe(catchError(error => {
          this.submitProcess = false;
          return throwError(error);
        }))
        .subscribe((data) => {
          if (data.success) {
            localStorage.setItem('tokenApp', data.token);
            localStorage.setItem('username', this.loginForm.controls['username'].value);
            this._router.navigate(['catalog']);
          } else {
            this._toastrService.error(data.message);
          }
          this.submitProcess = false;
        });
    }
  }

}
