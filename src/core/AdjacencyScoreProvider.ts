/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

import { exec } from '../db';

class AdjacencyScoreProvider {
  private readonly adjacencyMap: Record<string, string[]>;

  constructor(private readonly queryTerms: string[]) {
    this.adjacencyMap = {};
  }

  protected async collectAdjacentTerms() {
    try {
      const query = 'select distinct Token from TextToken where EntryID in (select EntryID from TextToken where Token=?) and Token!=?';
      for (const queryTerm of this.queryTerms) {
        // eslint-disable-next-line no-await-in-loop
        const result = await exec(query, [queryTerm, queryTerm]);
        this.adjacencyMap[queryTerm] = result.map((row: { Token: string }) => row.Token);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

export default AdjacencyScoreProvider;
