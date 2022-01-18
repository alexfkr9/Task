const fs = require("fs");
const filePath = "./repositories/notes.json";

// POST request for creating a note object
exports.createNotePost = function(req, res) {
    if(!req.body) return res.sendStatus(400);
    
    const noteId = req.body.id;
    const noteName = req.body.name;
    const noteCreated = req.body.created;
    const noteCategory = req.body.category;
    const noteContent = req.body.content;
    const noteDates = req.body.dates;
    const noteArchived = req.body.archived;

    let note = {id: noteId, name: noteName, created: noteCreated,
                category: noteCategory, content: noteContent,
                dates: noteDates, archived: noteArchived
                };
      
    let data = fs.readFileSync(filePath, "utf8");
    let notes = JSON.parse(data);      
    
    // add the note to the array
    notes.push(note);
    data = JSON.stringify(notes);
    // overwrite the file with new data
    fs.writeFileSync("./repositories/notes.json", data);
    res.send(notes);
};

// DELETE request to Remove item.
exports.removeItemDeleteID = function(req, res) {
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let notes = JSON.parse(data);
    let index = -1;
    // find the note index in the array
    for(var i=0; i < notes.length; i++){
        if(notes[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // remove the note from the array by index
        const note = notes.splice(index, 1)[0];
        data = JSON.stringify(notes);
        fs.writeFileSync("./repositories/notes.json", data);
        // отправляем удаленного пользователя
        res.send(note);
    }
    else{
        res.status(404).send();
    }
};

// PATCH request to Edit item.
exports.editItemPatchID = function(req, res) {
    if(!req.body) return res.sendStatus(400);
      
    console.log(req.body);
    const noteId = req.body.id;
    const noteName = req.body.name;
    const noteCreated = req.body.created;
    const noteCategory = req.body.category;
    const noteContent = req.body.content;
    const noteDates = req.body.dates;
    const noteArchived = req.body.archived;
      
    let data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);
    let note;
    for(var i=0; i<notes.length; i++){
        if(notes[i].id==noteId){
            note = notes[i];
            break;
        }
    }
    // change note data
    if(note){
        note.name = noteName;
        note.created = noteCreated;
        note.category = noteCategory;
        note.content = noteContent;
        note.dates = noteDates;
        note.archived = noteArchived;

        data = JSON.stringify(notes);
        fs.writeFileSync("./repositories/notes.json", data);
        res.send(note);
    }
    else{
        res.status(404).send(note);
    }
};

// GET request to Retrieve item.
exports.retrieveItemGetID = function(req, res) {
    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(content);
    let note = null;
    // find the note in the array by id
    for(var i=0; i<notes.length; i++){
        if(notes[i].id==id){
            note = notes[i];
            break;
        }
    }
    // sending the note
    if(note){
        res.send(note);
    }
    else{
        res.status(404).send();
    }
};

// GET request to Get all notes.

exports.allNotesGet = function(req, res) {
    const content = fs.readFileSync(filePath,"utf8");    
    const notes = JSON.parse(content);    
    res.send(notes);
};

// GET request to aggregated data statistics.
exports.dataStatGet = function(req, res) {
    const content = fs.readFileSync(filePath,"utf8");    
    const notes = JSON.parse(content);
    
    //find archived notes 
    let taskActive=0, thoughtActive=0, ideaActive=0;
    let taskArch=0, thoughtArch=0, ideaArch=0;    
    for(var i=0; i<notes.length; i++){
        if(notes[i].archived===true){
            //find active notes            
            switch (notes[i].category) {
              case 'Task': taskActive++ ; break;
              case 'Random Thought': thoughtActive++; break;
              case 'Idea': ideaActive++; break;
            }            
        }
        //find archived notes
        else {            
            switch (notes[i].category) {
              case 'Task': taskArch++ ; break;
              case 'Random Thought': thoughtArch++; break;
              case 'Idea': ideaArch++; break;
            }            
        } 
    }     
    
    let note = [{taskActive: taskActive, thoughtActive: thoughtActive, ideaActive: ideaActive},
        {taskArch: taskArch, thoughtArch: thoughtArch, ideaArch: ideaArch}];

    if(note){
        res.send(note);
    }
    else{
        res.status(404).send();
    }   
   
};