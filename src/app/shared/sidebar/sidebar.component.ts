import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  //
  public user: User;
  menuItems: any[];

  constructor(
    private sidebarServ: SidebarService,
    private userService: UserService
  ) {
    this.menuItems = sidebarServ.menu;
    // console.log(this.menuItems);

    this.user = userService.user;
  }

  ngOnInit(): void {}

  logOut() {
    this.userService.logOut();
  }
}
