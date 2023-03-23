require('dotenv').config();
const Notion = require('./classes/notionAPI');
const { config } = require('dotenv');

const intervalTime = process.env.TIME_TO_WAIT_TO_START_SCRIPT;

const mode = "PROD"; 
// const mode = "TEST"; 

const notionKey = process.env.NOTION_KEY;

const values = JSON.parse(process.env.VALUES)[mode];
const notionDatabaseId = values.NOTION_DATABASE_ID;

const notion = new Notion.Notion(notionKey, notionDatabaseId, config);

const interval = setInterval(function(){
    notion.getEntries()
    .then(entries => {
        entries.entries.forEach(entry => {
            entry.getRecurringEntry();
            notion.update(entry);
        });
    });
}, intervalTime);