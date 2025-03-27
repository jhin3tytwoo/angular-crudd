import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // นำเข้า CommonModule
import { FormsModule } from '@angular/forms';  // นำเข้า FormsModule
import { HttpClientModule } from '@angular/common/http';  // นำเข้า HttpClientModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(CommonModule, FormsModule, HttpClientModule) // นำเข้า CommonModule และ FormsModule
  ]
};
