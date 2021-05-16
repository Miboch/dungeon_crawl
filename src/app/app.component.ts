import {Component} from '@angular/core';
import {MenuItemModel} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems: MenuItemModel[] = [
    {
      route: 'home',
      label: 'Home'
    },
    {
      route: 'play',
      label: 'Play'
    },
    {
      route: 'options',
      label: 'Options'
    }
  ]
}
