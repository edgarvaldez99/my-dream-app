import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '../enums/role.enum';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  role = RoleEnum;

  transform(status: string): string {
    switch (status) {
      case this.role.AINV:
        return 'Analista de inversiones';
      case this.role.JPYC:
        return 'Jefe de planeamiento y control';
      case this.role.APYC:
        return 'Analista de planeamiento y control';
      default:
        return 'Admin';
    }
  }
}
