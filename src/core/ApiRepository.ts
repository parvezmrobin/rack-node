/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */
import { exec } from '../db';
import { delta1 } from '../config/app.json';

const MAX_API_NUM = delta1.toString();

class ApiRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected readonly queryTerms: string[]) {
  }

  async getApis(): Promise<Map<string, string[]>> {
    const tokenMap = new Map<string, string[]>();
    try {
      const query = 'select ct.Token from CodeToken as ct, TextToken as tt where ct.EntryID=tt.EntryID and tt.Token=? group by ct.Token order by count(*) desc limit ?';
      for (const queryTerm of this.queryTerms) {
        // eslint-disable-next-line no-await-in-loop
        const apis = await exec<{ Token: string }>(query, [queryTerm, MAX_API_NUM]);
        tokenMap.set(queryTerm, apis.map(row => row.Token));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return tokenMap;
  }
}

export default ApiRepository;
