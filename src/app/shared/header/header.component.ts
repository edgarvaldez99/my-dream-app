import { Component, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/enums/role.enum';
import { AuthService } from 'src/app/services/auth.service';
import { MenuConfigService } from 'src/app/services/menu-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userObservable$ = this.authService.getLoggedUserObservable();

  get isAdmin(): boolean {
    return this.authService.loggedUserHasRole(RoleEnum.ADMIN);
  }

  constructor(
    public menuConfigService: MenuConfigService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
  }

  toggleSidebarMenu(): void {
    this.menuConfigService.toggleSidebarMenu();
  }
}
