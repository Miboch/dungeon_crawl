import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

const mat = [
  MatButtonModule,
  MatToolbarModule
];

@NgModule({
  declarations: [],
  imports: [...mat],
  exports: [...mat]
})
export class MaterialModule {
}
