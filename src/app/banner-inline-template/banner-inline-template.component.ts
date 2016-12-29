import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-inline-template',
  template: '<h1>{{title}}</h1>'
})
export class BannerInlineTemplateComponent implements OnInit {

  title = 'Test inline template';

  constructor() { }

  ngOnInit() {
  }

}
