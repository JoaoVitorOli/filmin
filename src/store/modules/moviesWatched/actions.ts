export function setMoviesWatched(value: number) {
  return {
    type: "SET_MOVIES_WATCHED",
    payload: {
      value
    }
  }
}
