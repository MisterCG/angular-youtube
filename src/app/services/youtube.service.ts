import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Snippet, YoutubeRes } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private urlYoutube = 'https://www.googleapis.com/youtube/v3';
  private snippet = 'snippet';
  private maxResults = '10';
  private playlistId = 'UUuaPTYj15JSkETGnEseaFFg';
  private api_key = 'AIzaSyBqL0EzzM5a7iTqE1N1VDrhqjkv_lRdews';
  public pageToken = '';
  public videos: Snippet[] = [];

  constructor(private http: HttpClient) { }

  getVideosChannel() {

    const url = `${this.urlYoutube}/playlistItems`
    const params = new HttpParams()
        .set('part', this.snippet)
        .set('maxResults', this.maxResults)
        .set('playlistId', this.playlistId)
        .set('key', this.api_key)
        .set('pageToken', this.pageToken);

    return this.http.get<YoutubeRes>( url, { params })
        .pipe(
          map( res => {
            console.log(res)
            this.pageToken = res.nextPageToken;
         
            return res.items;
          }),
          map(items => items.map(videos => videos.snippet))
        )
  }


}
