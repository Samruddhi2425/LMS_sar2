import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { AddBookComponent } from './manager/add-book/add-book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LMS'; 
}
