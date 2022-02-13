import {browser, ElementFinder, ProtractorExpectedConditions} from 'protractor';
import {protractor} from 'protractor/built/ptor';
import {BykiMenuLocators} from '../../pages/locators';
import {MultilistDirectoryPopupLocators, ToolbarLocators} from '../../pages/locators';

const path = require('path');

const bykiMenuLocators = new BykiMenuLocators();
const multilistDirectoryPopupLocators = new MultilistDirectoryPopupLocators();
const toolbarLocators = new ToolbarLocators();

export class ProtractorBase {

  private ec: ProtractorExpectedConditions = browser.ExpectedConditions;
  private timeOut = 4000;

  hasClass(locator, klass) {
    return locator.getAttribute('class').then(classes => {
      return classes.split(' ').indexOf(klass) !== -1;
    });
  }

  open() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  openB4Ufile() {
    const filePath = '../../test-data/EPOxx_ENGus_List_1_Merge.b4u';
    const fpath = path.resolve(__dirname, filePath);
    this.click(toolbarLocators.OPEN_BUTTON);
    toolbarLocators.OPEN_INPUT.sendKeys(fpath);
  }

  createMultilist() {
    const filePath = '../../test-data/EPOxx_ENGus_List_1_Merge.b4u';
    const fpath = path.resolve(__dirname, filePath);
    this.click(bykiMenuLocators.MULTILIST_BUTTON);
    this.click(bykiMenuLocators.CREATE_MULTILIST_BUTTON);
    this.click(multilistDirectoryPopupLocators.ADD_BUTTON);
    multilistDirectoryPopupLocators.ADD_INPUT.sendKeys(fpath);
    this.click(multilistDirectoryPopupLocators.TEST_LIST);
    this.click(multilistDirectoryPopupLocators.OPEN_BUTTON);
  }

  openMultilist() {
    const el = bykiMenuLocators.OPEN_MULTILIST_BUTTON;
    this.click(bykiMenuLocators.MULTILIST_BUTTON);
    const filePath = '../../test-data/multilist';
    const fpath = path.resolve(__dirname, filePath);
    this.click(el);
    el.sendKeys(fpath);
    this.acceptAlert();
  }

  click(element: ElementFinder) {
    browser.wait(this.ec.elementToBeClickable(element), this.timeOut,
        'Failed to click the element: ' + element.getText());
    element.click();
  }

  public type(element: ElementFinder, testData: string) {
    this.visibilityOf(element);
    element.sendKeys(testData);
  }

  public  clearAndType(element: ElementFinder, testData: string) {
    this.visibilityOf(element);
    element.clear();
    element.sendKeys(testData);
  }

  public assertText(element: ElementFinder, expectedText: string) {
    this.visibilityOf(element);
    const actualText = element.getText();
    expect(actualText).toBe(expectedText);
  }

  protected  inVisibilityOf(element: ElementFinder) {
    browser.wait(this.ec.invisibilityOf(element), this.timeOut,
        'Element is still visible: ' + element.getText());
  }

  public assertTrue(element: ElementFinder) {
    this.visibilityOf(element);
    expect(element.isDisplayed()).toBe(true);
  }

  public assertFalse(element: ElementFinder) {
    this.visibilityOf(element);
    expect(element.isDisplayed()).toBe(false);
  }

  public  acceptAlert() {
    browser.wait(this.ec.alertIsPresent(), this.timeOut, 'Alert is not present');
    (browser.switchTo().alert()).accept();
  }

  public  dismissAlert() {
    this.waitForAlert();
    (browser.switchTo().alert()).dismiss();
  }

  public  tyepInAlert(data: string) {
    this.waitForAlert();
    (browser.switchTo().alert()).sendKeys(data);
  }

  public async getTextFromAlert(): Promise<string> {
    this.waitForAlert();
    const alertText = browser.switchTo().alert().getText();
    return alertText;
  }

  public switchToFrame(frameNumber: number) {
    browser.switchTo().frame(frameNumber);
  }


  public typeAndTab(element: ElementFinder, testData: string) {
    this.visibilityOf(element);
    element.clear();
    element.sendKeys(testData, protractor.Key.TAB);
  }

  public async typeAndEnter(element: ElementFinder, testData: string) {
    const capabilities = await browser.getCapabilities();
    const platform = capabilities.get('platform');
    await this.visibilityOf(element);
    await element.clear();
    if (platform === 'Mac OS X') {
      await element.sendKeys(testData, protractor.Key.RETURN);
    } else {
      await element.sendKeys(testData, protractor.Key.ENTER);
    }
  }

  public mouseHoverAndClick(element: ElementFinder) {
    browser.actions()
        .mouseMove(element.getWebElement())
        .click()
        .perform();

  }

  public moveToElement(element: ElementFinder) {
    browser.actions()
        .mouseMove(element.getWebElement())
        .perform();
  }

  public visibilityOf(element: ElementFinder) {
    browser.wait(this.ec.visibilityOf(element), this.timeOut,
        'Element is not visible: ' + element);
  }

  private waitForAlert() {
    browser.wait(this.ec.alertIsPresent(), this.timeOut, 'Alert is not present');
  }


}
