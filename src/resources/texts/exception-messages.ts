import '@extensions/string-extensions';

import * as ENExceptionMessages from './en/exception-messages';

export function ExceptionMessage(selectedLanguage?: string) {
  switch (selectedLanguage) {
    default:
      return ENExceptionMessages.MESSAGE;
  }
}
