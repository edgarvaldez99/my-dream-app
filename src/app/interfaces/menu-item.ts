export interface MenuItem {
  name: string;
  active: boolean;
  path?: any[] | string;
  routeExact?: boolean;
  children?: MenuItem[];
  iconName?: string;
}
