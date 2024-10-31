import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarModule } from 'primeng/toolbar';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { UserInfoComponent } from './user-info/user-info.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuizCrudRowComponent } from './quiz-crud-row/quiz-crud-row.component';
import { QuizCrudComponent } from './quiz-crud/quiz-crud.component';
import { AnswerQuizComponent } from './answer-quiz/answer-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateUserComponent,
    LoginComponent,
    UserInfoComponent,
    CreateQuizComponent,
    CreateQuestionComponent,
    QuizCrudComponent,
    QuizCrudRowComponent,
    AnswerQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }