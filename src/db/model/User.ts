import { Model } from '@nozbe/watermelondb';
import { text } from "@nozbe/watermelondb/decorators";

export default class User extends Model {
  static table = 'user_info';

  @text("name") name: string | undefined;
  @text("photo") photo: string | undefined;
}
