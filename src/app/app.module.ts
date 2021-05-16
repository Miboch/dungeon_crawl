import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {components, routedComponents} from './components';
import {MaterialModule} from './material.module';
import {CanvasSpyDirective} from './directives/canvas-spy.directive';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Clock} from '@game/src/system';
import {take} from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    ...routedComponents,
    ...components,
    CanvasSpyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private route: Router) {
    route.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationStart) {
        Clock.getInstance().setPause(true);
      }
      if (routeEvent instanceof NavigationEnd && routeEvent.url.match('play')) {
        Clock.getInstance().setPause(false)
      }
    })
  }
}
