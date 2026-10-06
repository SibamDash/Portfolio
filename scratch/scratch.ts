import { db } from '../src/prisma/db';

async function main() {
  const q = db.orm.public.Project.where({ status: 'LIVE' });
  const results = await q.all();
  console.log('Results length:', results.length);
}

main().catch(console.error);
