// source from next js org
// import bcrypt from "bcrypt";
// import postgres from "postgres";
// import { invoices, customers, revenue, users } from "../lib/placeholder-data";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// async function seedUsers() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     })
//   );

//   return insertedUsers;
// }

// async function seedInvoices() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `
//     )
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `
//     )
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `
//     )
//   );

//   return insertedRevenue;
// }
// source form nextjs.org
// export async function GET() {
//   try {
//     const result = await sql.begin((sql) => [
//       seedUsers(),
//       seedCustomers(),
//       seedInvoices(),
//       seedRevenue(),
//     ]);

//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

//source from gemini
import bcrypt from "bcrypt";
import postgres from "postgres";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// ၁။ Users ဆောက်ပြီး data သွင်းမည့် function
async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = [];
  // Promise.all အစား for...of loop သုံးပြီး တစ်ခုချင်းစီ sequential သွားပါတယ်
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
    insertedUsers.push(result);
  }

  return insertedUsers;
}

// ၂။ Invoices ဆောက်ပြီး data သွင်းမည့် function
async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = [];
  for (const invoice of invoices) {
    const result = await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
      ON CONFLICT (id) DO NOTHING;
    `;
    insertedInvoices.push(result);
  }

  return insertedInvoices;
}

// ၃။ Customers ဆောက်ပြီး data သွင်းမည့် function
async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = [];
  for (const customer of customers) {
    const result = await sql`
      INSERT INTO customers (id, name, email, image_url)
      VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
      ON CONFLICT (id) DO NOTHING;
    `;
    insertedCustomers.push(result);
  }

  return insertedCustomers;
}

// ၄။ Revenue ဆောက်ပြီး data သွင်းမည့် function
async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = [];
  for (const rev of revenue) {
    const result = await sql`
      INSERT INTO revenue (month, revenue)
      VALUES (${rev.month}, ${rev.revenue})
      ON CONFLICT (month) DO NOTHING;
    `;
    insertedRevenue.push(result);
  }

  return insertedRevenue;
}
// source from gemini
export async function GET() {
  try {
    // sql.begin() ကို သုံးပြီး တစ်ဆင့်ချင်းစီ sequential (တန်းစီပြီး) လုပ်ဆောင်စေပါမယ်
    await sql.begin(async (sql) => {
      console.log("Seeding users...");
      await seedUsers();

      console.log("Seeding customers...");
      await seedCustomers();

      console.log("Seeding invoices...");
      await seedInvoices();

      console.log("Seeding revenue...");
      await seedRevenue();
    });

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed Error Detail:", error); // Terminal မှာ error သေချာမြင်ရအောင်လို့ပါ
    return Response.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
