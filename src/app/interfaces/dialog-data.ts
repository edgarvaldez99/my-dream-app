import { User } from './user';

export interface DialogData {
  title: string;
  msg: string;
  btn: string;
  btn2: string;
  user: User;
  item?: any;
}
