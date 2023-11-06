const {PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
        { name: "Software Engineering" },
        { name: "Data Analytic"},
        { name: "Business Analytic"},
        { name: "Human Resources"},
        { name: "Video Editing"},
        { name: "Translator"},
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