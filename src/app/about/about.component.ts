// eslint-disable-next-line no-unused-vars
import {GroupService} from './../services/group.service';
// eslint-disable-next-line no-unused-vars
import {PostsService} from './../services/posts.service';
// eslint-disable-next-line no-unused-vars
import {Component, OnInit} from '@angular/core';
// eslint-disable-next-line no-unused-vars
import {Title} from '@angular/platform-browser';
// eslint-disable-next-line no-unused-vars
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  mostCommented;
  mostLiked;
  mostFollowed;
  mostSubbed;
  uid;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    private title: Title,
    private postService: PostsService,
    private userService: UserService,
    private groupService: GroupService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe(user => {
      this.uid = user.uid;

    });
    this.title.setTitle('Explore | About');
    this.postService.getMostLikedPosts().subscribe(posts => this.mostLiked = posts);
    this.postService.getMostCommentedPosts().subscribe(posts => this.mostCommented = posts);
    this.mostFollowed = this.userService.getMostFollowedUsers();
    this.groupService.getMostSubbed().subscribe(groups => this.mostSubbed = groups);
  }
}
