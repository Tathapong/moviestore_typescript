export enum Mode {
  NOW_PLAYING = "Now Playing",
  POPULAR = "Popular",
  TOP_RATED = "Top Rated",
  UPCOMING = "Upcoming",
  SEARCH = "Search",
  CHECKOUT = "Checkout"
}

export type ModeType = Mode.NOW_PLAYING | Mode.POPULAR | Mode.TOP_RATED | Mode.UPCOMING | Mode.SEARCH | Mode.CHECKOUT;
