/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

class CosineSimilarity {
  constructor(
    protected readonly listA: string[],
    protected readonly listB: string[],
  ) {
  }

  getScore() {
    const listAItemOccurrenceCount = new Map<string, number>();
    for (const item1 of this.listA) {
      if (item1) {
        listAItemOccurrenceCount.set(item1, (listAItemOccurrenceCount.get(item1) || 0) + 1);
      }
    }
    const listBItemOccurrenceCount = new Map<string, number>();
    for (const item2 of this.listB) {
      if (item2) {
        listBItemOccurrenceCount.set(item2, (listBItemOccurrenceCount.get(item2) || 0) + 1);
      }
    }

    const listAValues = [...listAItemOccurrenceCount.values()];
    const l2NormA = listAValues
      .map(x => x * x)
      .reduce((sum, x) => x + sum) ** 0.5;
    const listBValues = [...listBItemOccurrenceCount.values()];
    const l2NormB = listBValues
      .map(x => x * x)
      .reduce((sum, x) => x + sum) ** 0.5;

    let aDotB = 0;
    for (const token of listAItemOccurrenceCount.keys()) {
      if (!listBItemOccurrenceCount.has(token)) {
        continue;
      }
      aDotB += (listAItemOccurrenceCount.get(token) as number) * (listBItemOccurrenceCount.get(token) as number);
    }

    const cosineRatio = aDotB / ((l2NormA * l2NormB) + Number.EPSILON);

    return cosineRatio;
  }
}

export default CosineSimilarity;
