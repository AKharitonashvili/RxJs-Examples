import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  public routerLinks: { text: string; route: string }[];
  
  constructor() {}

  ngOnInit() {
    this.routerLinks = [
      {
        text: 'Todo',
        route: '/Todo',
      },
      {
        text: 'Posts',
        route: '/Posts',
      },
    ];
  }
}
