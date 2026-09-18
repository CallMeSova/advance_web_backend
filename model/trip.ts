export interface Trip {
  idx: number;
  name: string;
  country: string;
  destinationid: number;
  coverimage: string;
  detail: string;
  price: number;
  duration: number;
}

export interface TripPostRequest {
  name: string;
  country: string;
  destinationid: number;
  coverimage: string;
  detail: string;
  price: number;
  duration: number;
}
