import { browser, by, element , promise} from 'protractor';

export class AppPage {
  navigateTo(url:string) {
    return browser.get(url);
  }

  //Get components
  getDashboard() {
    return element.all(by.css('app-dashboard')).count();
  }
  getTopPanel() {
    return element.all(by.css('app-top-panel')).count();
  }
  getAppFilesView(){
    return element.all(by.css('app-files-view')).count();
  }
  getAppFilesTree(){
    return element.all(by.css('app-files-view app-files-tree')).count();
  }
  getAppFileDetail(){
    return element.all(by.css('app-files-view app-file-detail')).count();
  }

 //Get component detail
  getTopPanelText() {
    return element(by.css('app-root h1')).getText();
  }
  getTopPanelButtonCount(){
    return element.all(by.css('app-top-panel p-button')).count();
  }
  getTopPanelSplitButtonCount(){
    return  element.all(by.css('app-top-panel p-splitbutton')).count();
  }
  getAttributeOfTopPanelButton(buttName:string, attName:string){
    return  element(by.css('app-top-panel p-button[label=' + buttName + ']')).getAttribute(attName);
  }
  getAttributeOfTopPanelSplitButton(buttName:string, attName:string){
    return  element(by.css('app-top-panel p-splitbutton[label=' + buttName + ']')).getAttribute(attName);
  }
 
}
