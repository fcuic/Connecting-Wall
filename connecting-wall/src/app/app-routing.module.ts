import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {CreateQuizComponent} from './create-quiz/create-quiz.component';
import { MyQuizzesComponent } from './my-quizzes/my-quizzes.component';
import { AboutComponent } from './about/about.component';
import { QuizStartComponent } from './quiz-start/quiz-start.component';
import { EditWallComponent } from './edit-wall/edit-wall.component';

const routes: Routes = [
  {path:'', redirectTo:'/user/login',pathMatch:'full'},//first component when app starts
  {path:'user', component:UserComponent,
  children: [
    {path:'registration', component:RegistrationComponent},
    {path: 'login', component:LoginComponent}
  ]
},
  {path : 'home', component:HomeComponent,
  children:[
    {path:'quizstart',component:QuizStartComponent}
  ]
}, // for disabling access to unlogged user
  {path : 'forbidden', component:ForbiddenComponent},//public - no auth guard
  {path : 'adminpanel', component:AdminPanelComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin']} },
  {path : 'create-quiz', component: CreateQuizComponent,canActivate:[AuthGuard]},
  {path : 'my-quizzes', component:MyQuizzesComponent,
  children:[
    {path:'edit-wall',component: EditWallComponent}
  ],
  canActivate:[AuthGuard]},
  {path: 'about', component:AboutComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
