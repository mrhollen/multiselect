import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StringMultiSelectComponent } from './string-multi-select/string-multi-select.component';

const routes: Routes = [{
  path: 'string',
  component: StringMultiSelectComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
