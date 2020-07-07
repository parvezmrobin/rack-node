/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

import { exec } from '../db';
import CosineSimilarity from '../similarity/CosineSimilarity';
import { gamma } from '../config/app.json';

class AdjacencyScoreProvider {
  protected readonly tokenScores: Map<string, number>;

  protected readonly adjacencyMap: Map<string, string[]>;

  constructor(private readonly tokenMap: Map<string, string[]>) {
    this.adjacencyMap = new Map<string, string[]>();
    this.tokenScores = new Map<string, number>();
  }

  async getScore() {
    await this.collectAdjacentTerms();

    const textTokens = [...this.tokenMap.keys()];
    const dim = textTokens.length;
    for (let i = 0; i < dim; i++) {
      const firstToken = textTokens[i];
      const firstAdjacencyList = this.adjacencyMap.get(firstToken);
      if (!firstAdjacencyList) {
        throw new Error(`no adjacency list found for ${firstToken}`);
      }
      for (let j = i + 1; j < dim; j++) {
        const secondToken = textTokens[j];
        const secondAdjacencyList = this.adjacencyMap.get(secondToken);
        if (!secondAdjacencyList) {
          throw new Error(`no adjacency list found for ${secondToken}`);
        }
        const similarityScore = new CosineSimilarity(firstAdjacencyList, secondAdjacencyList).getScore();

        if (similarityScore <= gamma) {
          continue;
        }
        const firstApiList = this.tokenMap.get(firstToken) as string[];
        const secondApiList = this.tokenMap.get(secondToken) as string[];
        const commonApiList = firstApiList.filter(token => secondApiList.includes(token));

        for (const api of commonApiList) {
          const currentScore = this.tokenScores.get(api) || 0;
          this.tokenScores.set(api, currentScore + similarityScore);
        }
      }
    }

    return this.tokenScores;
  }

  protected async collectAdjacentTerms() {
    try {
      const query = 'select distinct Token from TextToken where EntryID in (select EntryID from TextToken where Token=?) and Token!=?';
      for (const textToken of this.tokenMap.keys()) {
        // eslint-disable-next-line no-await-in-loop
        const result = await exec<{ Token: string }>(query, [textToken, textToken]);
        const tokens = result.map(row => row.Token);
        this.adjacencyMap.set(textToken, tokens);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

export default AdjacencyScoreProvider;
