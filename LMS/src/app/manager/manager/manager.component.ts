import { Component } from '@angular/core';
import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager',
  imports: [ManagerSidebarComponent,RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
