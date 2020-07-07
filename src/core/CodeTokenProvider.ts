/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

import { stopWords, javaKeywords } from '../config/words.json';
import * as snowball from 'node-snowball';
import ApiRepository from "./ApiRepository";

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

  async recommendApi(score = Score.ALL): Promise<string> {
    const apis = await new ApiRepository(this.query).getApis();
    return JSON.stringify(apis);
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

    const stemmedTextTokens = snowball.stemword(textTokens, 'english');
    return [...new Set(stemmedTextTokens)];
  }
}

export default CodeTokenProvider;
