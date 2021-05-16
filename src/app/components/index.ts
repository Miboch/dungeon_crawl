import {HomeComponent} from './@routed/home/home.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MenuComponent} from './menu/menu.component';
import {PlayComponent} from './@routed/play/play.component';
import {OptionsComponent} from './@routed/options/options.component';

export const routedComponents = [
  HomeComponent,
  PlayComponent,
  OptionsComponent
];

export const components = [
  MenuComponent,
  ToolbarComponent
];

// components
export * from './menu/menu.component';
export * from './toolbar/toolbar.component';

// routed
export * from './@routed/home/home.component';
export * from './@routed/play/play.component';
export * from './@routed/options/options.component';
