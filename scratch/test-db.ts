import { db } from '../src/prisma/db';
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(db.orm.public.Project)));
