import { Component } from '@angular/core';
import { NavbarComponent } from '../../../home_/navbar/navbar.component';
import { RegisterComponent } from '../../../register/register.component';
import { LoginComponent } from '../../login.component';

@Component({
  selector: 'app-confirm',
  imports: [NavbarComponent,RegisterComponent,LoginComponent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

}
