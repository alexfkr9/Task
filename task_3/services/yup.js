// Schema Validation with Yup

const yup = require("yup");

exports.Schema = yup.object({  
    noteId: yup.number().required(),
    noteName: yup.string().max(20).required(),
    noteCreated: yup.date().required(),    
    noteCategory: yup.string().max(12).required(),
    noteContent: yup.string().max(32).required(),
    noteDates: yup.date().required(),
    noteArchived: yup.boolean().required()   
});

exports.val = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
    noteId: req.body.id,
    noteName: req.body.name,
    noteCreated: req.body.created,
    noteCategory: req.body.category,
    noteContent: req.body.content,
    noteDates: req.body.dates,
    noteArchived: req.body.archived
    });
    return next();
  } catch (err) { console.log(err);
    return res.status(500).send();
  }
}