class Entry{

    constructor(entry){
        this.entry = entry;
    };

    getRecurringEntry(){
        this.changeStart();
        this.changeFaellig();
        this.changeErledigt();
        this.changeKanbanStatus();
    };

    changeStart(){
        if(this.entry.properties.Start && this.entry.properties['next start date']){
            this.entry.properties.Start.date.start = this.entry.properties['next start date'].formula.date.start;
        }
    };

    changeFaellig(){
        if(this.entry.properties.Fällig && this.entry.properties['next due date']){
            this.entry.properties.Fällig.date.start = this.entry.properties['next due date'].formula.date.start;
        }; 
    };

    changeErledigt(){
        this.entry.properties.Erledigt.checkbox = false;
    };

    getStart(){
        if(this.entry.properties.Start) return this.entry.properties.Start;
    };

    getFaellig(){
        if(this.entry.properties.Fällig) return this.entry.properties.Fällig;
    };

    getTitle(){
        return this.entry.properties.Aufgabe.title[0].text.content;
    };

}

module.exports={
    Entry:Entry
};