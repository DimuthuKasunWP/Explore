// eslint-disable-next-line no-unused-vars
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line no-unused-vars
import { AuthService } from '../services/auth.service';
// eslint-disable-next-line no-unused-vars
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  mostLiked;
  mostCommented;

  constructor(
    private auth: AuthService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Explore | Get started!');
  }



}
