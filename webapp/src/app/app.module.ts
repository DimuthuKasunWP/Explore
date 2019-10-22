import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Third party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';



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
import { AppComponent } from '../app/app.component';
import { HomeComponent } from '../app/components/home/home.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { FooterComponent } from '../app/components/footer/footer.component';
import { LandingComponent } from '../app/components/landing/landing.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { ErrorComponent } from '../app/components/error/error.component';
import { AccountComponent } from '../app/components/account/account.component';
import { PostComponent } from '../app/components/post/post.component';
import { SearchComponent } from '../app/components/search/search.component';
import { AboutComponent } from '../app/components/about/about.component';
import { AddPostComponent } from '../app/components/add-post/add-post.component';
import { UserListComponent } from '../app/components/user-list/user-list.component';
import { UserComponent } from '../app/components/user-list/user/user.component';
import { GroupComponent } from '../app/components/group/group.component';
import { AddCommentComponent } from '../app/components/add-comment/add-comment.component';
import { CreateGroupComponent } from '../app/components/create-group/create-group.component';
import { MessagingComponent } from '../app/components/messaging/messaging.component';
import { ChatroomComponent } from '../app/components/messaging/chatroom/chatroom.component';
import { MessageService } from './services/message.service';
import { ChatroomlistComponent } from '../app/components/messaging/chatroomlist/chatroomlist.component';
import { MessageComponent } from '../app/components/messaging/chatroom/message/message.component';
import { SuggestedComponent } from '../app/components/suggested/suggested.component';
import { FeedbackComponent } from '../app/components/feedback/feedback.component';
import { AdminComponent } from '../app/components/admin/admin.component';
import { GrouplistComponent } from '../app/components/group/grouplist/grouplist.component';
import { NotificationComponent } from '../app/components/notification/notification.component';


// firebase.initializeApp(environment.firebase);

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
    // NgbModule.forRoot(),
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebase, 'Scribe'),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    // AngularFireStorageModule,
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
