import { Client } from "@notionhq/client"
import { config } from "dotenv"
import { propertiesForNewPages } from "./sampleData.js"

config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/* 
---------------------------------------------------------------------------
*/

/**
 * Resources:
 * - Create a database endpoint (notion.databases.create(): https://developers.notion.com/reference/create-a-database)
 * - Create a page endpoint (notion.pages.create(): https://developers.notion.com/reference/post-page)
 * - Working with databases guide: https://developers.notion.com/docs/working-with-databases
 */

async function addNotionPageToDatabase(databaseId, pageProperties) {
  const newPage = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties,
  })
  console.log(newPage)
}

async function main() {

  const databaseId = pageId
  // If there is no ID (if there's an error), return.
  if (!databaseId) return

  console.log("Adding new pages...")

  const pageProp = {
    "Name": {
      type: "title",
      title: [{ type: "text", text: { content: "Tomatoes" } }],
    },
    "URL": {
      type: "url",
      url: "https://zhuanlan.zhihu.com/p/646507710",
    },
  }

  await addNotionPageToDatabase(databaseId, pageProp)
}

main()