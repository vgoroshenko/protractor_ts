import {browser, by, element, $, $$} from 'protractor';

export class ListViewLocators {
  SEARCH_BUTTON = $('.search > button');
  SEARCH_FIELD = $('.search .field');
  LEARN_LANG = $('#mat-tab-label-0-0');
  KNOW_LANG = $('#mat-tab-label-0-1');
  PREVIOUS_BUTTON = $('list-view [data-tests="previous_button"]');
  NEXT_BUTTON = $('list-view [data-tests="next_button"]');
  ADD_BUTTON = $('[data-tests="add_button"]');
  ADD_AFTER_BUTTON = $('[data-tests="add_after_button"]');
  ADD_BEFORE_BUTTON = $('[data-tests="add_before_button"]');
  COPY_BUTTON = $('.copy-btn');
  COPY_DROPDOWN_BUTTON = $('.copy-dropdown-btn');
  COPY_ALL_BUTTON = $('[data-tests="copy_all_button"]');
  CUSTOM_ALL_BUTTON = $('[data-tests="custom_button"]');
  SET_DEFAULT_BUTTON = $('[data-tests="set_default_button"]');
  DELETE_BUTTON = $('[data-tests="delete_button"]');
  MOVE_UP_BUTTON = $('[data-tests="move_up_button"]');
  MOVE_DOWN_BUTTON = $('[data-tests="move_down_button"]');
  PASTE_BUTTON = $('[data-tests="paste_button"]');
  LIST_CARDS = $('.cdk-virtual-scroll-content-wrapper');
  COUNT_CARDS = $$('.cdk-virtual-scroll-content-wrapper .learnFont');
  COUNT_CARDS_KNOWNL = $$('.cdk-virtual-scroll-content-wrapper .knownFont');
  CARD = $('.cdk-virtual-scroll-content-wrapper .learnFont');
  CARD_KNOWNL = $('.cdk-virtual-scroll-content-wrapper .knownFont');
  SELECTED_CARD = $('.mat-list-item-selected');

  CARD_WITH_TEXT(learntext: string) {
    return element(by.cssContainingText('.cdk-virtual-scroll-content-wrapper .learnFont', learntext));
  }

  CARD_POSITION_WITH_TEXT(position: number, learntext: string) {
    return element(by.cssContainingText('.cdk-virtual-scroll-content-wrapper .learnFont:nth-child(' + position + ')', learntext));
  }

}

export class EditViewLocators {
  LEARN_LANGUAGE_TEXT = $('#learningFont');
  LEARN_LANGUAGE_HINT = $('#learnItemHint');
  LEARN_LANGUAGE_TRANSLITERATION = $('#learnItemTransliteration');
  LEARN_LANGUAGE_POS_DROPDOWN = $('');
  KNOWN_LANGUAGE_TEXT = $('#knownItem');
  KNOWN_LANGUAGE_HINT = $('#knownItemHint');
  KNOWN_LANGUAGE_POS_DROPDOWN = $('');
  BASE_WORD = $('#baseWordItem');
}

export class EditSoundLocators {
  SEARCH_BUTTON = $('.search .field');
  LEARN_LANG = $('#mat-tab-label-1-0');
  KNOW_LANG = $('#mat-tab-label-1-1');
}

export class EditRecordSoundLocators {
  SEARCH_BUTTON = $('.search .field');
  LEARN_LANG = $('#mat-tab-label-2-0');
  KNOW_LANG = $('#mat-tab-label-2-1');
  EDIT_ALT = $('#mat-tab-label-2-2');
  CHANGES_LOG = $('#mat-tab-label-2-3');
}

export class EditImageLocators {
}

export class BykiMenuLocators {
  FILE_BUTTON = $('[data-tests="file_menu_button"]');
  EDIT_BUTTON = $('[data-tests="edit_menu_button"]');
  VIEW_BUTTON = $('[data-tests="view_menu_button"]');
  MULTILIST_BUTTON = $('[data-tests="multilist_menu_button"]');
  CREATE_MULTILIST_BUTTON = $('[data-tests="create_multilist_button"]');
  TOOLS_BUTTON = $('[data-tests="tools_menu_button"]');
  HELP_BUTTON = $('[data-tests="help_menu_button"]');
  OPEN_MULTILIST_BUTTON = $('[data-tests="open_multilist_button"]');
  OPEN_MULTILIST = $('input[type="file"]');
}

export class MultilistDirectoryPopupLocators {
  ADD_BUTTON = $('app-multilist-directory [data-tests="add_button"]');
  ADD_INPUT = $('app-multilist-directory input[type="file"]');
  OPEN_BUTTON = $('[data-tests="open_button"]');
  // TEST_LIST = element(by.cssContainingText('.mat-sort .ng-star-inserted', 'List 1 Merge'));
  TEST_LIST = element(by.xpath('//*[contains(text(), \'List 1 Merge\')]'));
}

export class BykiInfoLocators {
}

export class ToolbarLocators {
  NEW_BUTTON = $('[mattooltip="New"]');
  OPEN_BUTTON = $('[mattooltip="Open"]');
  OPEN_INPUT = $('byki-menu input[type="file"]');
  SAVE_BUTTON = $('[mattooltip="Save"]');
}
