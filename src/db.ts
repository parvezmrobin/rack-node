/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Jul 07, 2020
 */

import { Database } from 'sqlite3';
import { join } from 'path';

const dbPath = join(__dirname, 'database', 'RACK-EMSE.db');

export function exec(query: string, parameters = [] as string[]): Promise<Record<string, any>> {
  return new Promise(((resolve, reject) => {
    const db = new Database(dbPath);
    db.all(query, parameters, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
    db.close();
  }));
}

