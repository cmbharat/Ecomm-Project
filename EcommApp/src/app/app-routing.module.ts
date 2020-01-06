import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CareersComponent } from './careers/careers.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
{
path:"login",
component:LoginComponent
},

{
  path:"home",
  component:HomepageComponent
},
{
  path:"register",
  component:RegisterComponent
},
{
  path:"careers",
  component:CareersComponent
},
{
  path:"logout",
  component:LogoutComponent
},
{
  path:"profile",
  component:ProfileComponent
},
{
  path:"forgot",
  component:ForgotPasswordComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
