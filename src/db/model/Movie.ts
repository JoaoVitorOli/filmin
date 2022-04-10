import { Model } from '@nozbe/watermelondb';
import { text } from "@nozbe/watermelondb/decorators";

export default class Movie extends Model {
  static table = 'movies';

  @text("name") name: string | undefined;
  @text("posterPath") posterPath: string | undefined;
  @text("movieAverange") movieAverange: string | undefined;
  @text("movieDate") movieDate: string | undefined;
  @text("movieStatus") movieStatus: string | undefined;
}
