import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {CountdownModule} from 'ngx-countdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import{ReactiveFormsModule, FormsModule} from '@angular/forms';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { HeaderComponent } from './header/header.component';
import { WallService } from './shared/wall.service';
import { MyQuizzesComponent } from './my-quizzes/my-quizzes.component';
import { AboutComponent } from './about/about.component';
import { EditWallComponent } from './edit-wall/edit-wall.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { QuizStartComponent } from './quiz-start/quiz-start.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    CreateQuizComponent,
    HeaderComponent,
    MyQuizzesComponent,
    AboutComponent,
    EditWallComponent,
    PlayQuizComponent,
    QuizStartComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    CountdownModule,
    ToastrModule.forRoot({
      progressBar:true
    }),
    FormsModule

  ],
  providers: [UserService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  WallService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
