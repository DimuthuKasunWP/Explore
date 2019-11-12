// eslint-disable-next-line no-unused-vars
import { GroupService } from './../services/group.service';
// eslint-disable-next-line no-unused-vars
import { PostsService } from './../services/posts.service';
// eslint-disable-next-line no-unused-vars
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line no-unused-vars
import { Title } from '@angular/platform-browser';
// eslint-disable-next-line no-unused-vars
import { UserService } from '../services/user.service';

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

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private title: Title,
    private postService: PostsService,
    private userService: UserService,
    private groupService: GroupService
  ) { }

  ngOnInit () {
    this.title.setTitle('Explore | About');
    this.postService.getMostLikedPosts().subscribe(posts => this.mostLiked = posts);
    this.postService.getMostCommentedPosts().subscribe(posts => this.mostCommented = posts);
    this.userService.getSuggestedUsers().subscribe(users => this.mostFollowed = users);
    this.groupService.getMostSubbed().subscribe(groups => this.mostSubbed = groups);
  }
}
