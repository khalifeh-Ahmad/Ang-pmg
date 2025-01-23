import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { loginResponse } from '../../context/DTOs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private srv: LoginService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  loginFrm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginFrm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      role: ['user'],
    });
  }
  login() {
    this.spinner.show();
    this.srv.login(this.loginFrm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.spinner.hide();
        this.router.navigate(['/tasks']);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
      },
      (er) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: er.error.message,
          footer: er.message,
        });
      }
    );
  }
}
