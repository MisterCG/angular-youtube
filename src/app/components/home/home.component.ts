import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Snippet } from '../../models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Snippet[] = [];

  constructor( private youtubeService: YoutubeService ) { }

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    this.youtubeService.getVideosChannel()
        .subscribe(videos => {
          this.videos.push( ...videos )
          console.log(this.videos);
        });
  }


  verVideo(video: Snippet) {
    Swal.fire({
      title: video.title,
      html: `
      <hr>
      <iframe width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
              frameborder="0" 
              allow="accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture" 
              allowfullscreen>
      </iframe>
      `
    })
  }

}
