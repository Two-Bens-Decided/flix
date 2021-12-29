interface MovieObj {
  id: number;
  movie_id: string;
  title: string;
  release_date: string;
  genres: string;
  description: string;
  actors: string;
  directors: string;
  trailer_url: string;
  thumbnailUrl: string;
}

interface movieEntry {
  id: number;
  movie_id: string;
  title: string;
  release_date: string;
  description: string;
  trailer_url: string;
  thumbnailUrl: string;
}

interface UserEntry {
  id: number;
  username: string;
  email_Oauth?: string;
  twitter_Oauth?: string;
  twitter_user_name?: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  age: number;
}