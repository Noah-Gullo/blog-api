const { prisma } = require("../lib/prisma.js"); 
const hash = require("bcrypt");

async function main() {
  const author = await prisma.author.create({
    data: {
      first_name: "Test",
      last_name: "Author",
      email: "author@test.com",
      password: "temporary-password",
    },
  });

  const post = await prisma.post.create({
    data: {
      title: "Test title",
      body: "This is a test post to see if it appears",
      isPublished: true,
      authorID: author.id,
    },
  });

  console.log("Done seeding")
}

main()