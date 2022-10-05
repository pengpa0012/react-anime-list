
export type Anime = {
  aired: {
    from: string
    string: string 
    to: string
  }
  airing: boolean
  approved: boolean
  background: any
  broadcast: object
  demographics: any[]
  duration: string
  episodes: number
  explicit_genres: any[]
  favorites: number
  genres: any[]
  images: {
    jpg: {
      image_url: string
      large_image_url: string
      small: string
    }
    webp: {
      image_url: string
      large_image_url: string
      small: string
    }
  }
  licensors: any[]
  mal_id: number
  members: number
  popularity: number
  producers: any[]
  rank: number
  rating: string
  score: number
  scored_by: number
  season: string
  source: string
  status: string
  studios: any[]
  synopsis: string
  themes: any[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: any[]
  titles: any[]
  trailer: {
    embed_url: string
      images: {
      image_url: string
      large_image_url: string
      maximum_image_url: string
      medium_image_url: string
      small_image_url: string
      url: string
      youtube_id:String
    } 
  }
  type: string
  url: string
  year: number
}

export type Statistics = {
  watching: number,
  completed: number,
  on_hold: number,
  dropped: number,
  plan_to_watch: number,
  total: number,
  scores: [
    {
      score: number,
      votes: number,
      percentage: number
    }
  ]
}