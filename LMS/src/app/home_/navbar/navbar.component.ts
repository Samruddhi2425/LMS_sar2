import { Component } from '@angular/core';
import { CardService } from '../../card.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  providers: [CardService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
role: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getRole();
  }
}
