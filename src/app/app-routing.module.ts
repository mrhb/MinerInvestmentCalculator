import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Main2Component } from './main2/main2.component';

const routes: Routes = [
{path:"main",component:MainComponent},
{path:"MinerCalculator",component:Main2Component},
{ path: '',   redirectTo: '/MinerCalculator', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
