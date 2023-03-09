import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPostsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
