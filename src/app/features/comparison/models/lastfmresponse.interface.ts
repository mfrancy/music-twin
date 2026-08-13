export interface GetUserInfoResponse<TImage> {
    user: {
        spotify_expiry_estimate: {
            unixtime: string,
            "#text": number
        }
        playcount: string,
        playlists: string,
        album_count: string,
        bootstrap: string,
        url: string,
        age: string,
        name: string,
        artist_count: string,
        subscriber: string,
        track_count: string,
        realname: string
        image: TImage[]
    }
}

export interface ImageResponse {
    size: string,
    '#text': string
}

