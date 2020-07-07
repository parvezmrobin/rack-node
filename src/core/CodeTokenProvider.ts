/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

import { stopWords, javaKeywords } from '../config/words.json';

export enum Score {
  KAC,
  KPAC,
  KKC,
  ALL,
}

class CodeTokenProvider {
  protected readonly query: string[];

  constructor(rawQuery: string) {
    this.query = this.decomposeQueryTerms(rawQuery);
  }

  recommendApi(score = Score.ALL) {
    return this.query;
  }

  protected decomposeQueryTerms(rawQuery: string) {
    const lowerCaseQuery = rawQuery.toLowerCase();
    const separatorRegExp = /[^\w]+|\s+/g;
    const numRegExp = /\d+/;
    const wordsToIgnore = [...stopWords, ...javaKeywords];
    const textTokens = lowerCaseQuery
      .split(separatorRegExp)
      .map(token => token.trim())
      .filter(token => !numRegExp.test(token))
      .filter(Boolean)
      .filter(token => !wordsToIgnore.includes(token));
    return textTokens;
  }
}

export default CodeTokenProvider;
