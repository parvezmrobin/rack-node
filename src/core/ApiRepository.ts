/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */
import { exec } from '../db';

const MAX_API_NUM = '10';

class ApiRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected readonly queryTerms: string[]) {
  }

  async getApis() {
    const tokenMap: Record<string, string[]> = {};
    try {
      const query = 'select ct.Token from CodeToken as ct, TextToken as tt where ct.EntryID=tt.EntryID and tt.Token=? group by ct.Token order by count(*) desc limit ?';
      for (const queryTerm of this.queryTerms) {
        // eslint-disable-next-line no-await-in-loop
        const apis = await exec(query, [queryTerm, MAX_API_NUM]);
        tokenMap[queryTerm] = apis.map((row: { Token: string }) => row.Token);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return tokenMap;
  }
}

export default ApiRepository;
