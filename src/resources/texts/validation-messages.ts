import '@extensions/string-extensions';

import * as ENValidationMessages from './en/validation-messages';

export function ValidationMessage(selectedLanguage?: string) {
  switch (selectedLanguage) {
    default:
      return ENValidationMessages.VALIDATION;
  }
}
