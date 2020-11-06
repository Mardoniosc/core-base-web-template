import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermitionAssociateComponent } from './permition-associate/permition-associate.component';
import { PermitionFormComponent } from './permition-form/permition-form.component';
import { PermitionListComponent } from './permition-list/permition-list.component';

const routes: Routes = [
  { path: '', component: PermitionListComponent },
  { path: 'new', component: PermitionFormComponent },
  { path: ':id/edit', component: PermitionFormComponent },
  { path: 'associate', component: PermitionAssociateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitionsRoutingModule {}
