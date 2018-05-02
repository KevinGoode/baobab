import { browser} from 'protractor';
import { AppPage } from './app.po';

describe('my-app App', () => {
  let page: AppPage;
  


  beforeEach(() => {
    //The Observable.Timer in authneticator.component breaks e2e tests unless have the following line
    //https://www.bountysource.com/issues/35908814-how-to-implement-intervals-polling-in-angular2-to-work-with-protractor
    //For more sophisticated tests may need to toggle this flag but the moment it is fine
    browser.waitForAngularEnabled(false);
    page = new AppPage();
  });

  it('should display home view', () => {
    page.navigateTo('/');
    //Make sure these main elements displayed
    expect(page.getTopPanel()).toEqual(1);
    expect(page.getDashboard()).toEqual(1);
    //Make sure these main elements NOT displayed
    expect(page.getAppFilesView()).toEqual(0);
    expect(page.getAppFilesTree()).toEqual(0);
    expect(page.getAppFileDetail()).toEqual(0);
    //Detailed checks
    expect(page.getTopPanelText()).toEqual('BaoBab');
    expect(page.getTopPanelButtonCount()).toEqual(2);
    expect(page.getTopPanelSplitButtonCount()).toEqual(2);
    expect(page.getAttributeOfTopPanelButton('Home','icon')).toEqual('fa fa-home');
    expect(page.getAttributeOfTopPanelButton('Articles','icon')).toEqual('fa fa-file-text');
    expect(page.getAttributeOfTopPanelSplitButton('Logon','icon')).toEqual('fa-user');
    expect(page.getAttributeOfTopPanelSplitButton('Help','icon')).toEqual('fa-book');


  });

  it('should display files view', () => {
    page.navigateTo('/files');
    //Make sure these main elements displayed
    expect(page.getTopPanel()).toEqual(1);
    expect(page.getAppFilesView()).toEqual(1);
    expect(page.getAppFilesTree()).toEqual(1);
    expect(page.getAppFileDetail()).toEqual(1);
    //Make sure these main elements NOT displayed
    expect(page.getDashboard()).toEqual(0);
    //Detailed checks
  });

});
