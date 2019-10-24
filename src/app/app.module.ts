import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Third party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ChartsModule } from 'ng2-charts';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import * as firebase from 'firebase';


// Pipes and Directives
import { DateFormatPipe } from './services/date.pipe';
import { LinkifyPipe } from './services/linkify.pipe';
import { DetectScrollDirective } from './directives/detect-scroll.directive';

// Services
import { AuthService } from './services/auth.service';
import { UploadService } from './services/upload.service';
import { GroupService } from './services/group.service';
import { PostsService } from './services/posts.service';
import { UserService } from './services/user.service';
import { FollowService } from './services/follow.service';
import { LikesService } from './services/likes.service';
import { NotificationService } from './services/notification.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { AccountComponent } from './components/account/account.component';
import { PostComponent } from './components/post/post.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user-list/user/user.component';
import { GroupComponent } from './components/group/group.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { ChatroomComponent } from './components/messaging/chatroom/chatroom.component';
import { MessageService } from './services/message.service';
import { ChatroomlistComponent } from './components/messaging/chatroomlist/chatroomlist.component';
import { MessageComponent } from './components/messaging/chatroom/message/message.component';
import { SuggestedComponent } from './components/suggested/suggested.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AdminComponent } from './components/admin/admin.component';
import { GrouplistComponent } from './components/group/grouplist/grouplist.component';
import { NotificationComponent } from './components/notification/notification.component';


firebase.initializeApp(environment.firebase);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user/:username',
    component: ProfileComponent
  },
  {
    path: 'post/:pid',
    component: PostComponent
  },
  {
    path: 'group/:gid',
    component: GroupComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'messaging',
    component: MessagingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'start',
    component: LandingComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'user/:username/groups',
    component: GrouplistComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    LinkifyPipe,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ErrorComponent,
    AccountComponent,
    PostComponent,
    SearchComponent,
    AboutComponent,
    AddPostComponent,
    UserListComponent,
    UserComponent,
    DetectScrollDirective,
    GroupComponent,
    AddCommentComponent,
    CreateGroupComponent,
    MessagingComponent,
    ChatroomComponent,
    ChatroomlistComponent,
    MessageComponent,
    SuggestedComponent,
    FeedbackComponent,
    AdminComponent,
    GrouplistComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Scribe'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    ReactiveFormsModule,
    NgxAutoScrollModule
  ],
  providers: [
    AuthService,
    UploadService,
    UserService,
    PostsService,
    FollowService,
    LikesService,
    GroupService,
    NotificationService,
    DateFormatPipe,
    LinkifyPipe,
    MessageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateGroupComponent
  ]
})
export class AppModule { }
