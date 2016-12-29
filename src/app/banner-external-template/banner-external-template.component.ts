import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-external-template',
  templateUrl: './banner-external-template.component.html',
  styleUrls: ['./banner-external-template.component.css']
})
export class BannerExternalTemplateComponent implements OnInit {

  title = 'Test external template';

  constructor() { }

  ngOnInit() {
  }

}
