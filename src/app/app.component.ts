import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAEcJc2q2ELce1RAeYlSQ2gXeXhtkliyzg',
      authDomain: 'max-angular-tutorial-project.firebase.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
