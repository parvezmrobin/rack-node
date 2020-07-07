/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

import { stopWords, javaKeywords } from '../config/words.json';
import * as snowball from 'node-snowball';
import ApiRepository from './ApiRepository';
import AssociationFrequencyScoreProvider from './AssociationFrequencyScoreProvider';
import AdjacencyScoreProvider from './AdjacencyScoreProvider';

export enum Score {
  KAC,
  KKC,
  ALL,
}

class CodeTokenProvider {
  protected readonly query: string[];

  protected tokenMap?: Map<string, string[]>;

  protected tokenScores?: Map<string, number>;

  constructor(rawQuery: string) {
    this.query = this.decomposeQueryTerms(rawQuery);
  }

  async recommendApi(score = Score.ALL): Promise<string> {
    this.tokenMap = await new ApiRepository(this.query).getApis();
    await this.calculateScores(score);
    if (!this.tokenScores) {
      throw new Error('tokenScores should not be undefined');
    }
    const sortedTokenScores = [...this.tokenScores.entries()]
      .sort((a, b) => b[1] - a[1]);
    console.log('sortedTokenScores', sortedTokenScores);
    return sortedTokenScores.map(([token, score]) => `${token}: ${score}`).join('\n');
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
    // return [...new Set(stemmedTextTokens)];

    return ['java', 'pars', 'html'];
  }

  protected async calculateScores(score: Score) {
    if (!this.tokenMap) {
      throw new Error('collectScores should be called after `this.tokenMap` is generated.');
    }
    this.tokenScores = new Map<string, number>();
    const scores = score === Score.ALL ? [Score.KAC, Score.KKC] : [score];
    if (scores.includes(Score.KAC)) {
      const kacScores = await new AssociationFrequencyScoreProvider(this.tokenMap).getScore();
      for (const token of kacScores.keys()) {
        const currentScore = this.tokenScores.get(token) || 0;
        const kacScore = kacScores.get(token) || 0;
        this.tokenScores.set(token, currentScore + kacScore);
      }
    }
    if (scores.includes(Score.KKC)) {
      const kkcScores = await new AdjacencyScoreProvider(this.tokenMap).getScore();
      for (const token of kkcScores.keys()) {
        const currentScore = this.tokenScores.get(token) || 0;
        const kkcScore = kkcScores.get(token) || 0;
        this.tokenScores.set(token, currentScore + kkcScore);
      }
    }

    // normalize score
    const maxScore = Math.max(...this.tokenScores.values());
    for (const token of this.tokenScores.keys()) {
      this.tokenScores.set(token, this.tokenScores.get(token) as number / maxScore);
    }
  }
}

export default CodeTokenProvider;
