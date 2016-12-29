import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../model/hero';

@Component({
  selector: 'dashboard-hero',
  templateUrl: './dashboard-hero.component.html',
  styleUrls: ['./dashboard-hero.component.css']
})
export class DashboardHeroComponent implements OnInit {

  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() {
  }

  click() { 
    this.selected.emit(this.hero);
  } 

}
