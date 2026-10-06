import { db } from '../src/prisma/db';

async function main() {
  await db.connect();
  const q = db.orm.public.Project.where({ status: 'LIVE' });
  const results = await q.all();
  console.log('Results length:', results.length);
}

main().catch(console.error);
