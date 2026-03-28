import { prisma } from "../../src/lib/prisma";

async function main() {
  // Categories - upsert avoids duplicate errors
  const categories = [
    "All",
    "Public Free",
    "Public Paid",
    "Private Free",
    "Private Paid",
  ];

  const categoryRecords = [];
  for (const name of categories) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {}, // do nothing if exists
      create: { name },
    });
    categoryRecords.push(cat);
  }

  console.log("Categories added/ensured:", categoryRecords.map(c => c.name));

  // Users
//   const tutorUser = await prisma.user.upsert({
//     where: { email: "tutor@test.com" },
//     update: {},
//     create: {
//       id: "tutor-user-1",
//       name: "Md. Rahim",
//       email: "tutor@test.com",
//       role: "TUTOR",
//     },
//   });

//   const studentUser = await prisma.user.upsert({
//     where: { email: "student@test.com" },
//     update: {},
//     create: {
//       id: "student-user-1",
//       name: "Md. Karim",
//       email: "student@test.com",
//       role: "STUDENT",
//     },
//   });

  // Tutor profile
//   await prisma.tutorProfile.upsert({
//     where: { userId: tutorUser.id },
//     update: {
//       bio: "Experienced math and physics tutor with 5+ years experience.",
//       pricePerHr: 800,
//       rating: 4.7,
//     },
//     create: {
//       userId: tutorUser.id,
//       bio: "Experienced math and physics tutor with 5+ years experience.",
//       pricePerHr: 800,
//       rating: 4.7,
//       categories: {
//         connect: categoryRecords.map(c => ({ id: c.id })),
//       },
//     },
//   });

//   console.log("Tutor profile added/ensured");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());