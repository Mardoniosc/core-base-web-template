import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { PermitionListComponent } from './permition-list/permition-list.component';
import { PermitionFormComponent } from './permition-form/permition-form.component';
import { PermitionsRoutingModule } from './permitions-routing.module';

@NgModule({
  declarations: [PermitionFormComponent, PermitionListComponent],
  imports: [SharedModule, PermitionsRoutingModule],
})
export class PermitionsModule {}
