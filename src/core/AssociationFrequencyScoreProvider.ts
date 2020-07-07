/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

class AssociationFrequencyScoreProvider {
  private readonly tokenScores: Record<string, number>;

  constructor(private readonly tokenMap: Record<string, string[]>) {
    this.tokenScores = {} as Record<string, number>;
    for (const tokenMapKey in this.tokenMap) {
      this.tokenScores[tokenMapKey] = 0;
    }
  }

  getScore() {
    for (const tokenMapKey in this.tokenMap) {
      const apis = this.tokenMap[tokenMapKey];

      for (let i = 0; i < apis.length; i++) {
        const api = apis[i];
        const score = 1 - (i / apis.length);
        this.tokenScores[api] += score;
      }
    }

    return this.tokenScores;
  }
}

export default AssociationFrequencyScoreProvider;
