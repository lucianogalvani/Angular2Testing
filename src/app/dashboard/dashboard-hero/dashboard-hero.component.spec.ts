/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardHeroComponent } from './dashboard-hero.component';

import { click } from '../../../testing';

import { Hero } from '../../model';

/**
 * Test DashboardHeroComponent stand-alone
 */
describe('DashboardHeroComponent when tested directly', () => {
  let component:    DashboardHeroComponent;
  let fixture:      ComponentFixture<DashboardHeroComponent>;
  let heroEl:       DebugElement;
  let expectedHero: Hero;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;
    heroEl = fixture.debugElement.query(By.css('.hero')); // find a hero element

    // pretend that it was wired to something that supplied a hero
    expectedHero = new Hero(42, 'Test Name');
    component.hero = expectedHero;
    fixture.detectChanges(); // trigger initial data binding

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    heroEl.triggerEventHandler('click', null);
    expect(selectedHero).toBe(expectedHero);
  });

  //Here's the previous test, rewritten using this click helper.
  it('should raise selected event when clicked', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    /**
     * Clicking a button, an anchor, or an arbitrary HTML element is a common test task. 
     * Make that easy by encapsulating the click-triggering process in a helper. 
     */
    click(heroEl);   // triggerEventHandler helper
    expect(selectedHero).toBe(expectedHero);
  });

});

/**
 * Test a component inside a test host component
 */
describe('DashboardHeroComponent when inside a test host', () => {
  let testHost:    TestHostComponent;
  let fixture:      ComponentFixture<TestHostComponent>;
  let heroEl:       DebugElement;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent, TestHostComponent ], // declare both
    }).compileComponents();
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture  = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl   = fixture.debugElement.query(By.css('.hero')); // find hero
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });

});

/**
 * Testing with the actual DashboardComponent host is doable but seems more trouble than its worth. 
 * It's easier to emulate the DashboardComponent host with a test host like this one:
 */
import { Component } from '@angular/core';

////// Test Host Component //////
@Component({
  template: `
    <dashboard-hero  [hero]="hero"  (selected)="onSelected($event)"></dashboard-hero>`
})
class TestHostComponent {
  hero = new Hero(42, 'Test Name');
  selectedHero: Hero;
  onSelected(hero: Hero) { this.selectedHero = hero; }
}


