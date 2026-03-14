import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@gamehub.dev' },
    update: {},
    create: { email: 'user@gamehub.dev', fullName: 'Demo User', passwordHash }
  });

  await prisma.user.upsert({
    where: { email: 'admin@gamehub.dev' },
    update: {},
    create: { email: 'admin@gamehub.dev', fullName: 'Admin User', passwordHash, role: Role.ADMIN }
  });

  const action = await prisma.category.upsert({
    where: { slug: 'action' },
    update: {},
    create: { name: 'Action', slug: 'action' }
  });

  const game = await prisma.game.upsert({
    where: { slug: 'sky-force-reloaded' },
    update: {},
    create: {
      title: 'Sky Force Reloaded',
      slug: 'sky-force-reloaded',
      shortDescription: 'Arcade shooter built for premium gameplay.',
      fullDescription: 'Fast-paced shooter with rich visuals and progression.',
      price: '49000',
      currency: 'UZS',
      categoryId: action.id,
      developerName: 'GameHub Studios',
      publisherName: 'GameHub Publishing',
      version: '1.0.0',
      packageIdentifier: 'com.gamehub.skyforce',
      fileSize: BigInt(256000000),
      minAndroidVersion: '8.0',
      coverImage: 'https://picsum.photos/600/900',
      featured: true,
      checksumSha256: 'demo-checksum-sha256'
    }
  });

  await prisma.gameMedia.createMany({
    data: [
      { gameId: game.id, url: 'https://picsum.photos/1080/1920?1', type: 'screenshot', sortOrder: 1 },
      { gameId: game.id, url: 'https://picsum.photos/1080/1920?2', type: 'screenshot', sortOrder: 2 }
    ],
    skipDuplicates: true
  });

  await prisma.entitlement.upsert({
    where: { userId_gameId: { userId: user.id, gameId: game.id } },
    update: {},
    create: { userId: user.id, gameId: game.id, source: 'seed' }
  });
}

main().finally(() => prisma.$disconnect());
