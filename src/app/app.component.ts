import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './_services/auth.service';
import { Auth } from './_interfaces/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'products-angular-client';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    initFlowbite();
    this.setCurrentAuth();
  }

  setCurrentAuth() {
    const authString = localStorage.getItem('auth');
    console.log('auth', authString);
    if (!authString) return;
    const auth: Auth = JSON.parse(authString);
    this.authService.setCurrentAuth(auth);
  }
}
