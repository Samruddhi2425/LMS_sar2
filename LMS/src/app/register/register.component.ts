import { Component } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [NavbarComponent,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
