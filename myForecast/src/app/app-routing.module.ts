import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './component/forecast/forecast.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { StatisticAndDashboardComponent } from './component/statistic-and-dashboard/statistic-and-dashboard.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/login'},
  {path:'home', component: HomeComponent, children:[
		{ path:'forecast', component: ForecastComponent},
		{ path:'dashboard', component: StatisticAndDashboardComponent},
  ]},
  {path:'login', component: LoginComponent},
  {path:'**', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
