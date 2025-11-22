import bcrypt from "bcryptjs";

import { prisma } from "../lib/db";

async function createAdminUser() {
  const email = "admin@leon4rdo.dev";
  const password = "admin123";
  const name = "Leonardo Menezes";

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("✅ Admin user already exists");
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  console.log("✅ Admin user created successfully!");
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log(`👤 User ID: ${user.id}`);
}

createAdminUser()
  .catch((error) => {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
