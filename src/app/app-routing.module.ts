import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuadroBatalhaComponent } from './components/quadro-batalha/quadro-batalha.component';

const routes: Routes = [
  {path: 'batalha', component: QuadroBatalhaComponent},
  {path: '', redirectTo: '/batalha', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
