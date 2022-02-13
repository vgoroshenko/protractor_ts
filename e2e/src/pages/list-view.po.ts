import {ListViewLocators, EditViewLocators} from './locators';
import {CommonFunctions} from '../base/common/commonFunctions';
import {browser} from 'protractor';

const listViewLocators = new ListViewLocators();
const editViewLocators = new EditViewLocators();

export class ListViewPage extends CommonFunctions {
  addCard(test_data: string) {
    this.addLearnLangText(test_data);
    this.addLearnLangHint(test_data);
    this.addLearnLangTrans(test_data);
    this.addKnownLangText(test_data);
    this.addKnownLangHint(test_data);
    this.clickAdd();
  }

  addAfterCardWithText(test_data: string) {
    this.clickAddAfter();
    this.addLearnLangText(test_data);
    this.addLearnLangHint(test_data);
    this.addLearnLangTrans(test_data);
    this.addKnownLangText(test_data);
    this.addKnownLangHint(test_data);
  }

  addBeforeCardWithText(test_data: string) {
    this.clickAddBefore();
    this.addLearnLangText(test_data);
    this.addLearnLangHint(test_data);
    this.addLearnLangTrans(test_data);
    this.addKnownLangText(test_data);
    this.addKnownLangHint(test_data);
  }

  addLearnLangText(learntext: string) {
    this.type(editViewLocators.LEARN_LANGUAGE_TEXT, learntext);
  }

  addLearnLangHint(learnhint: string) {
    this.type(editViewLocators.LEARN_LANGUAGE_HINT, learnhint);
  }

  addLearnLangTrans(learntrans: string) {
    this.type(editViewLocators.LEARN_LANGUAGE_TRANSLITERATION, learntrans);
  }

  addKnownLangText(knowntext: string) {
    this.type(editViewLocators.KNOWN_LANGUAGE_TEXT, knowntext);
  }

  addKnownLangHint(knownhint: string) {
    this.type(editViewLocators.KNOWN_LANGUAGE_HINT, knownhint);
  }

  clickAdd() {
    this.click(listViewLocators.ADD_BUTTON);
  }

  clickAddAfter() {
    this.click(listViewLocators.ADD_AFTER_BUTTON);
  }

  clickAddBefore() {
    this.click(listViewLocators.ADD_BEFORE_BUTTON);
  }

  clickDelete() {
    this.click(listViewLocators.DELETE_BUTTON);
  }

  clickCopy() {
    this.click(listViewLocators.COPY_BUTTON);
  }

  clickMoveDown() {
    this.click(listViewLocators.MOVE_DOWN_BUTTON);
  }

  clickMoveUp() {
    this.click(listViewLocators.MOVE_UP_BUTTON);
  }

  clickKnownLangTab() {
    this.click(listViewLocators.KNOW_LANG);
  }

  clickLearnLangTab() {
    this.click(listViewLocators.LEARN_LANG);
  }

  clickNextCard() {
    this.click(listViewLocators.NEXT_BUTTON);
  }

  clickPreviousCard() {
    this.click(listViewLocators.PREVIOUS_BUTTON);
  }

  clickPaste() {
    this.click(listViewLocators.PASTE_BUTTON);
  }

  copyCardWithText(learntext: string) {
    this.click(listViewLocators.CARD_WITH_TEXT(learntext));
    this.clickCopy();
  }

  selectCardWithText(learntext: string) {
    this.click(listViewLocators.CARD_WITH_TEXT(learntext));
  }

  shouldAddedCardWithText(learntext: string) {
    expect(listViewLocators.CARD_WITH_TEXT(learntext).isDisplayed()).toBe(true);
  }

  shouldPresentTotalCards(total_cards: number) {
    listViewLocators.COUNT_CARDS.then((items) => {
      expect(items.length).toBe(total_cards, 'Should present ' + total_cards + ' but present ' + items.length);
    });
  }

  shouldPresentKnownLangCards() {
    this.visibilityOf(listViewLocators.CARD_KNOWNL);
    const firstKnownCard = listViewLocators.COUNT_CARDS_KNOWNL.first().getText();
    firstKnownCard.then((knowLangCardText) => {
      const knowLangText = editViewLocators.KNOWN_LANGUAGE_TEXT.getText();
      expect(knowLangText).toContain(knowLangCardText, 'Should see known lang');
    });
  }

  shouldPresentLearnLangCards() {
    this.visibilityOf(listViewLocators.CARD);
    const firstLearnCard = listViewLocators.COUNT_CARDS.first().getText();
    firstLearnCard.then((learnLangCardText) => {
      const learnLangText = editViewLocators.LEARN_LANGUAGE_TEXT.getText();
      expect(learnLangText).toContain(learnLangCardText, 'Should see learn lang');
    });
  }

  shouldPresentChangedCardAfterClickNext() {
    const card = editViewLocators.LEARN_LANGUAGE_TEXT.getText();
    card.then((selected_card) => {
      this.clickNextCard();
      const card_after = editViewLocators.LEARN_LANGUAGE_TEXT.getText();
      card_after.then((selected_card_after) => {
        expect(selected_card !== selected_card_after).toBe(true, 'Check select functional cards');
        expect(listViewLocators.SELECTED_CARD.getText()).toContain(selected_card_after);
      });
    });
  }

  shouldPresentChangedCardAfterClickPrevious() {
    const card = editViewLocators.LEARN_LANGUAGE_TEXT.getText();
    card.then((selected_card) => {
      this.clickPreviousCard();
      const card_after = editViewLocators.LEARN_LANGUAGE_TEXT.getText();
      card_after.then((selected_card_after) => {
        expect(selected_card !== selected_card_after).toBe(true, 'Check select functional cards');
        expect(listViewLocators.SELECTED_CARD.getText()).toContain(selected_card_after);
      });
    });
  }

  shouldPresentCopiedCards() {
    listViewLocators.COUNT_CARDS.getText().then((items) => {
      expect(this.checkForDuplicates(items)).toBe(true, 'Should see copied cards but not');
    });
  }

  shouldAddedAfterCardWithText(card_text: string) {
    expect(listViewLocators.CARD_POSITION_WITH_TEXT(2, card_text).isDisplayed()).toBe(true);
  }

  shouldAddedBeforeCardWithText(card_text: string) {
    expect(listViewLocators.CARD_POSITION_WITH_TEXT(1, card_text).isDisplayed()).toBe(true);
  }

  shouldMovedDownCardWithText(card_text: string) {
    expect(listViewLocators.CARD_POSITION_WITH_TEXT(2, card_text).isDisplayed()).toBe(true);
  }

  shouldMovedUpCardWithText(card_text: string) {
    expect(listViewLocators.CARD_POSITION_WITH_TEXT(1, card_text).isDisplayed()).toBe(true);
  }

  shouldNotPresentCards() {
    this.assertText(listViewLocators.LIST_CARDS, '');
  }

  prepareForAddsButtons() {
    this.createMultilist();
  }

  checkForDuplicates(array) {
    const valuesAlreadySeen = [];

    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      if (valuesAlreadySeen.indexOf(value) !== -1) {
        return true;
      }
      valuesAlreadySeen.push(value);
    }
    return false;
  }

}
