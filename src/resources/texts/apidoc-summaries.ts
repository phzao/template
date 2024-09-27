import '@resources/string-extensions';

import * as ENApiDoc from './en/apidoc-summary';

export function ApiDocSummary(selectedLanguage?: string) {
  switch (selectedLanguage) {
    default:
      return ENApiDoc.SUMMARY;
  }
}
