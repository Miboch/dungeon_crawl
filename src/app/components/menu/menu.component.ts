import {Component, Input, OnInit} from '@angular/core';
import {MenuItemModel} from '../../model';

@Component({
  selector: 'crawl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  @Input() menuItems: MenuItemModel[]

  constructor() {
    this.menuItems = [];
  }

  ngOnInit(): void {
  }
}
