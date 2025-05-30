import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ManagersidebarComponent } from '../managersidebar/managersidebar.component';
import { HomeComponent } from '../../home_/home/home.component';

@Component({
  selector: 'app-manager',
  imports: [RouterOutlet, ManagersidebarComponent,HomeComponent,RouterModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})


export class ManagerComponent {
  


}
