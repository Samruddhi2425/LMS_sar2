import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagersidebarComponent } from '../managersidebar/managersidebar.component';

@Component({
  selector: 'app-manager',
  imports: [RouterOutlet, ManagersidebarComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
