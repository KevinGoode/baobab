// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Run all tests:
//const context = require.context('./', true, /\.spec\.ts$/);

// OR
//Run inidividual tests by commenting out line above and replacing with following
//const context = require.context('./', true, /help-panel\.component\.spec\.ts/);
//const context = require.context('./', true, /help-dialog\.component\.spec\.ts/);
//const context = require.context('./', true, /dashboard\.component\.spec\.ts/);
//const context = require.context('./', true, /top-panel\.component\.spec\.ts/);
const context = require.context('./', true, /file-detail\.component\.spec\.ts/);
// And load the modules.
context.keys().map(context);
