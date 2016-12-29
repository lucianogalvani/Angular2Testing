/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { UserService } from '../model/user.service';

/**
 * Test a component with a dependency
 * Injecting the real UserService could be a nightmare. 
 * The real service might try to ask the user for login credentials and try to reach an authentication server. 
 * These behaviors could be hard to intercept. 
 * It is far easier and safer to create and register a test double in place of the real UserService.
 */
describe('WelcomeComponent', () => {
  let component:    WelcomeComponent;
  let fixture:      ComponentFixture<WelcomeComponent>;
  let de:           DebugElement;
  let el:           HTMLElement;
  let userService:  UserService;

  beforeEach(() => {

    // stub UserService for test purposes
    let userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };

    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
                                      // Provide a test-double instead
       providers:    [ {provide: UserService, useValue: userServiceStub } ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    // UserService from the root injector
    userService = TestBed.get(UserService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no welcome in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });

});
