import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CareersComponent } from './careers/careers.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
{
path:"login",
component:LoginComponent
},

{
  path:"main",
  component:MainPageComponent
},
{
  path:"register",
  component:RegisterComponent
},
{
  path:"main/careers",
  component:CareersComponent
},
{
  path:"main/logout",
  component:LogoutComponent
},
{
  path:"main/profile",
  component:ProfileComponent
},
{
  path:"main/forgot",
  component:ForgotPasswordComponent
},
{
  path:"",
  component:LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
