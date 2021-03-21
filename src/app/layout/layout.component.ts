import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from '../interfaces/menu-item';
import { MenuConfigService } from '../services/menu-config.service';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  toggleSidebarMenuSubscription?: Subscription;
  sidebarMode: MatDrawerMode = 'side';
  menuList: MenuItem[] = [
    {
      name: 'Administración',
      active: true,
      children: [
        {
          name: 'Usuarios',
          path: '/admin/user/list',
          active: true,
        },
        {
          name: 'Monedas',
          path: '/admin/currency/list',
          active: true,
        },
      ],
    },
    {
      name: 'Proyectos',
      path: '/project/list',
      active: true,
    },
  ];

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  @HostListener('window:resize')
  onResize(): void {
    this.configSidebarMode();
  }

  constructor(
    public menuConfigService: MenuConfigService,
    private responsiveService: ResponsiveService,
  ) {}

  ngOnInit(): void {
    this.menuConfigService.setMenuItemList(this.menuList);
    this.fetchToggleSidebarMenu();
  }

  ngOnDestroy(): void {
    this.toggleSidebarMenuSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.configSidebarMode();
  }

  closeSidebarMenu(): void {
    if (this.responsiveService.isMobileScreen) {
      this.menuConfigService.setSidebarMenu(false);
    }
  }

  private fetchToggleSidebarMenu(): void {
    this.toggleSidebarMenuSubscription = this.menuConfigService
      .getToggleSidebarMenuObservable()
      .pipe(filter(() => !!this.sidenav))
      .subscribe((isOpened: boolean) => {
        if (isOpened) {
          this.sidenav?.open();
        } else {
          this.sidenav?.close();
        }
      });
  }

  private configSidebarMode(): void {
    setTimeout(() => {
      if (this.responsiveService.isMobileScreen) {
        this.sidebarMode = 'over';
        this.menuConfigService.setSidebarMenu(false);
      } else {
        this.sidebarMode = 'side';
        this.menuConfigService.setSidebarMenu(true);
      }
    });
  }
}
