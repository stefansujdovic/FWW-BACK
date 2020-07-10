const Event = require('../models/event');
const { errorHandler } = require('../helpers/ErrorHandler');

exports.addEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(result)
    })
}

exports.allEvents = async (req, res) => {
    await Event.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(result)
    })
}

exports.eventId = async (req, res, next, id) => {
    await Event.findById(id).exec((err, result) => {
        if (err || !result) {
            return res.status(400).json({
                error: 'Event not found'
            })
        }
        req.event = result;
        next();
    })
}

exports.editEvent = async (req,res) => {
    const event = req.event;
    event.text = req.body.text;

    event.save((error) => {
        if (error) {
            return res.status(400).json({
              error: errorHandler(error)
            })
          }
          res.json({
            message: 'Successfuly updated'
          });
    })

}

exports.removeEvent = async (req, res) => {
    const event = req.event;
    await event.remove((error) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json({
        message: "Event removed"
      })
    })
  }