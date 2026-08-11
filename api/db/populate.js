import prisma from "./prisma.js";
import { hash } from "bcryptjs";

async function main(){
    const post =  await prisma.post.create({
        data: {
            title: "Test title",
            body: "This is a test post to see if it appears"
        },
    })
    console.log("Seeded post: ", post);
}