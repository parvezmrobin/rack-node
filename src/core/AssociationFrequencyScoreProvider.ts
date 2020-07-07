/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

class AssociationFrequencyScoreProvider {
  private readonly tokenScores: Map<string, number>;

  constructor(private readonly tokenMap: Map<string, string[]>) {
    this.tokenScores = new Map<string, number>();
  }

  getScore() {
    for (const tokenMapKey of this.tokenMap.keys()) {
      const apis = this.tokenMap.get(tokenMapKey) as string[];

      for (let i = 0; i < apis.length; i++) {
        const api = apis[i];
        const score = 1 - (i / apis.length);
        this.tokenScores.set(api, (this.tokenScores.get(api) || 0) + score);
      }
    }

    return this.tokenScores;
  }
}

export default AssociationFrequencyScoreProvider;
