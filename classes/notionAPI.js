const {Client} = require("@notionhq/client");
const Entries = require('./entries');

class Notion{

    constructor(key, databseId, config){
        this.notion = new Client({ auth: key });
        this.databseId = databseId;
        this.config = config; 
    }

    async getEntries(){
        const response = await this.notion.databases.query({
            database_id: this.databseId,
            filter : {
                and : [
                    {
                        "property" : "Fällig wiederholt sich (Tage)",
                        "number": {
                            "is_not_empty" : true
                        },
                    },
                    { 
                        or : [
                            {
                                "property": "Erledigt",
                                "checkbox": {
                                    "equals" : true
                                }
                            },
                            {
                                "property": "Kanban - Status",
                                "select": {
                                    "equals" : "Done"
                                }
                            }
                        ]
                    }
                ]
            },
            sorts:[
                {
                    property: "Fällig",
                    direction: "ascending",
                },
            ],
        });
        let entries = new Entries.Entries(response.results);
        return entries;
    };

    async update(entry){
        const response = await this.notion.pages.update({
            page_id : entry.entry.id,
            properties: {
                Start: entry.getStart(),
                Fällig: entry.getFaellig(),
                Erledigt: entry.entry.properties.Erledigt,
                "Kanban - Status" : entry.entry.properties["Kanban - Status"],
            }
        });
        console.log(`Eintrag '${entry.getTitle()}' angepasst`);
        return response;
    }; 
}

module.exports={
    Notion:Notion
};