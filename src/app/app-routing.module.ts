import { UserIdleComponent } from './components/user-idle/user-idle.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonReactiveComponent } from './components/common-reactive/common-reactive.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';

const routes: Routes = [
  {path: 'template-driven', component: RegistrationformComponent },
  {path: 'reactive-form', component: CommonReactiveComponent},
  {path: 'timer', component: UserIdleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
