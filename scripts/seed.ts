const {PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Software Engineering" },
        { name: "Artificial Intelligence" },
        { name: "Finance" },
        { name: "Human Resources" },
        { name: "Filming" },
        { name: "Photography" },
        { name: "Data Analytics" }
      ]
    });

    console.log("Success");
  } catch(error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
};

main();