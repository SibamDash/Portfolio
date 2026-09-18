import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('Please provide a password to hash.');
  console.log('Usage: npx tsx scripts/hash-password.ts <your_password>');
  process.exit(1);
}

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('\nCopy the following line into your .env file:\n');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
}

main();
