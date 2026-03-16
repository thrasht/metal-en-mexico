export interface BandData {
  name: string;
  slug: string;
  genre?: string | null;
  origin?: string | null;
}

export interface ShowData {
  band: BandData;
  isHeadliner: boolean;
  stage?: string | null;
  showDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  setlistFmUrl?: string | null;
  sortOrder: number;
}

export interface EventWithShows {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  eventType: string;
  venueName: string;
  venueAddress?: string | null;
  city: string;
  state: string;
  startDate: string;
  endDate?: string | null;
  flyerUrl?: string | null;
  ticketUrl?: string | null;
  ticketPriceInfo?: string | null;
  status: string;
  shows: ShowData[];
}
