import { prisma } from "../src/lib/prisma.js";

const data = [
  { name: "Buku", price: 15000 },
  { name: "Pulpen", price: 5000 },
];

async function main() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log("Tabel products sudah berisi data, seed dilewati.");
    return;
  }
  await prisma.product.createMany({ data });
  console.log(`Seed selesai: ${data.length} produk ditambahkan.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
