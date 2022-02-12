import {browser, logging} from 'protractor';
import {ListViewPage} from './pages/list-view.po';
import * as testData from './test-data/userInfo.json';

const listViewPage = new ListViewPage();

describe('Should check list-view base functional', () => {

  // beforeAll(() => {
  //   browser.manage().window().maximize();
  //   browser.manage().timeouts().implicitlyWait(30000);
  // });
  beforeEach(() => {
    listViewPage.open();
  });

  it('should check add new card', () => {
    listViewPage.addCard(testData.card1.learnLangText);
    listViewPage.shouldAddedCardWithText(testData.card1.learnLangText);
    listViewPage.shouldPresentTotalCards(1);
  });
  it('should check delete card after add', () => {
    listViewPage.addCard(testData.card1.learnLangText);
    listViewPage.selectCardWithText(testData.card1.learnLangText);
    listViewPage.clickDelete();
    listViewPage.shouldNotPresentCards();
    // attachScreenshot('last');
  });
  it('should check copy and past card after add', () => {
    listViewPage.addCard(testData.card1.learnLangText);
    listViewPage.addCard(testData.card2.learnLangText);
    listViewPage.copyCardWithText(testData.card2.learnLangText);
    listViewPage.selectCardWithText(testData.card1.learnLangText);
    listViewPage.clickPaste();
    listViewPage.shouldPresentTotalCards(3);
    listViewPage.shouldPresentCopiedCards();
  });
  it('should check add after', () => {
    listViewPage.prepareForAddsButtons();
    listViewPage.addAfterCardWithText(testData.card1.learnLangText);
    listViewPage.shouldAddedAfterCardWithText(testData.card1.learnLangText);
  });
  it('should check add before', () => {
    listViewPage.prepareForAddsButtons();
    listViewPage.addBeforeCardWithText(testData.card1.learnLangText);
    listViewPage.shouldAddedBeforeCardWithText(testData.card1.learnLangText);
  });
  it('should check move down', () => {
    listViewPage.prepareForAddsButtons();
    listViewPage.addBeforeCardWithText(testData.card1.learnLangText);
    listViewPage.clickMoveDown();
    listViewPage.shouldMovedDownCardWithText(testData.card1.learnLangText);
  });
  it('should check move up', () => {
    listViewPage.prepareForAddsButtons();
    listViewPage.addAfterCardWithText(testData.card1.learnLangText);
    listViewPage.clickMoveUp();
    listViewPage.shouldMovedUpCardWithText(testData.card1.learnLangText);
  });
  it('should present known and learn lang', () => {
    listViewPage.openB4Ufile();
    listViewPage.clickKnownLangTab();
    listViewPage.shouldPresentKnownLangCards();
    listViewPage.clickLearnLangTab();
    listViewPage.shouldPresentLearnLangCards();
  });
  it('should check next button and previous button', () => {
    listViewPage.openB4Ufile();
    listViewPage.shouldPresentChangedCardAfterClickNext();
    listViewPage.shouldPresentChangedCardAfterClickPrevious();
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
// async function attachScreenshot(filename: string) {
//   let png = await browser.takeScreenshot();
//   await allure.createAttachment(filename, new Buffer(png, 'base64'));
// }
