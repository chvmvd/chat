import fs from "node:fs";
import express from "express";
import { PrismaClient } from "@prisma/client";
import escapeHTML from "escape-html";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
const prisma = new PrismaClient();

const template = fs.readFileSync("./template.html", "utf-8");
app.get("/", async (request, response) => {
  const posts = await prisma.post.findMany();
  const html = template.replace(
    "<!-- posts -->",
    posts.map((post) => `<li>${escapeHTML(post.message)}</li>`).join(""),
  );
  response.send(html);
});

let messages=[];
if ${message-input} != "";
    app.post("/send", async(request, response) => {
        messages.push(`${request.body.message}`)
    
        response.send(
        
            `
            <   !doctype html>
                <html lang="ja">
                    <head>
                        <meta charset="utf-8" />
                        <title>チャット</title>
                        <link rel="stylesheet" href="/style.css" />
                    </head>
                    <body>
        
                        <h1 class="app-title">チャット</h1>
                    
                        <ul>
                            <!-- posts -->
                            ${messages.map((message) => `<li>${message}</li>`).join("")}
                        
                        </ul>
                        <form action="/send" method="post">
                            <input id="message-input" type="text" name="message" />
                            <button type="submit">送信</button>
                    
                        </form>
                        <script src="/script.js"></script>
                    </body>
            </html>
       
        `);

    });

app.listen(3000);
