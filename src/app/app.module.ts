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
import {AgmCoreModule} from '@agm/core';


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
import { HashtagService }  from './services/hashtag.service';
import {MarkersService} from './services/markers.service'

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { AccountComponent } from './account/account.component';
import { PostComponent } from './post/post.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { AddPostComponent } from './add-post/add-post.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user-list/user/user.component';
import { GroupComponent } from './group/group.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ChatroomComponent } from './messaging/chatroom/chatroom.component';
import { MessageService } from './services/message.service';
import { ChatroomlistComponent } from './messaging/chatroomlist/chatroomlist.component';
import { MessageComponent } from './messaging/chatroom/message/message.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AdminComponent } from './admin/admin.component';
import { GrouplistComponent } from './group/grouplist/grouplist.component';
import { NotificationComponent } from './notification/notification.component';
import { GmapsComponent } from './gmaps/gmaps.component';

import { EventComponent } from './event/event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PasswdresetComponent } from './passwdreset/passwdreset.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { GroupsearchComponent } from './groupsearch/groupsearch.component';

import { GmapComponent } from './gmap/gmap.component';



import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import { PopupWindowComponent } from './popup-window/popup-window.component';
import {MatDialogModule} from '@angular/material/dialog';


import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { EventlistComponent } from './event/eventlist/eventlist.component';
import {EventsService} from './services/events.service';
import { HashtagComponent } from './hashtag/hashtag.component';
import { GroupEventComponent } from './group-event/group-event.component';
import { AddmarkerComponent } from './addmarker/addmarker.component';


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
    path: 'event',
    component: EventComponent
  },
  {
    path: 'event/:eid',
    component: EventComponent
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
    path: 'popup-window',
    component: PopupWindowComponent
  },
  {

    path:'passwdreset',
    component:PasswdresetComponent

  },
  {
    path:"hashtag/:hid",
    component:HashtagComponent
  },
  {
    path:"groupevent/:geid",
    component:GroupEventComponent

  }
  // {
  //   path: '**',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // }
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
    NotificationComponent,
    GmapsComponent,
    EventComponent,
    PopupWindowComponent,
    PasswdresetComponent,
    AddMembersComponent,
    GroupsearchComponent,
    GmapsComponent,
    GmapComponent,
    EventlistComponent,
    HashtagComponent,
    GroupEventComponent,
    AddmarkerComponent,
    
  ],

  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Explore'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyD_gQGzi-IDe-KM69qlbUsOmKTvhuIscjg'
    }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ['places']
    })
  ],
  providers: [
    AuthService,
    EventsService,
    UploadService,
    UserService,
    PostsService,
    FollowService,
    LikesService,
    GroupService,
    NotificationService,
    DateFormatPipe,
    LinkifyPipe,
    MessageService,
    MatDatepickerModule,
    HashtagService,
    MarkersService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateGroupComponent
  ]
})
export class AppModule { }
