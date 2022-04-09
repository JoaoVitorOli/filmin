import { Model } from '@nozbe/watermelondb';
import { text } from "@nozbe/watermelondb/decorators";

export default class Movie extends Model {
  static table = 'movies';

  @text("name") name: string | undefined;
  @text("posterPath") posterPath: string | undefined;
  @text("averange") averange: number | undefined;
  @text("date") date: string | undefined;
  @text("isChecked") isChecked: boolean | undefined;
  @text("status") status: boolean | undefined;
}
