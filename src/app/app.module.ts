import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BannerInlineTemplateComponent } from './banner-inline-template/banner-inline-template.component';
import { BannerExternalTemplateComponent } from './banner-external-template/banner-external-template.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TwainComponent } from './shared/twain/twain.component';
import { DashboardHeroComponent } from './dashboard/dashboard-hero/dashboard-hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerInlineTemplateComponent,
    BannerExternalTemplateComponent,
    WelcomeComponent,
    TwainComponent,
    DashboardHeroComponent,
    DashboardComponent,
    HeroDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
