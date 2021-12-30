import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  //
  menuItems: any[];

  constructor(
    private sidebarServ: SidebarService,
    private userService: UserService
  ) {
    this.menuItems = sidebarServ.menu;
    // console.log(this.menuItems);
  }

  ngOnInit(): void {}
  logOut() {
    this.userService.logOut();
  }
}
