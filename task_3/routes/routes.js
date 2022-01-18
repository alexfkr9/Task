const {Router} = require('express');
const router = Router();

const validate = require('../services/yup');
const services = require('../services/services');

// POST request for creating and validate a note object
router.post('/notes', validate.val(validate.Schema), services.createNotePost);

// DELETE request to Remove item.
router.delete('/notes/:id', services.removeItemDeleteID);

// PATCH request to Edit and validate item.
router.patch('/notes/:id', validate.val(validate.Schema), services.editItemPatchID);

// GET request to aggregated data statistics.
router.get('/notes/stats', services.dataStatGet);

// GET request to Retrieve item.
router.get('/notes/:id', services.retrieveItemGetID);

// GET request to Get all notes.
router.get('/notes', services.allNotesGet);

module.exports = router;