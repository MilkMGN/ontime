import { failEmptyObjects } from '../utils/routerUtils.js';
import {
  addEvent,
  applyDelay,
  deleteAllEvents,
  deleteEvent,
  editEvent,
  reorderEvent,
  swapEvents,
} from '../services/rundown-service/RundownService.js';
import { getDelayedRundown } from '../services/rundown-service/delayedRundown.utils.js';
import { RequestHandler } from 'express';

// Create controller for GET request to '/events'
// Returns -
export const rundownGetAll: RequestHandler = async (_req, res) => {
  const delayedRundown = getDelayedRundown();
  res.json(delayedRundown);
};

// Create controller for POST request to '/events/'
// Returns -
export const rundownPost: RequestHandler = async (req, res) => {
  if (failEmptyObjects(req.body, res)) {
    return;
  }

  try {
    const newEvent = await addEvent(req.body);
    res.status(201).send(newEvent);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Create controller for PUT request to '/events/'
// Returns -
export const rundownPut: RequestHandler = async (req, res) => {
  if (failEmptyObjects(req.body, res)) {
    return;
  }

  try {
    const event = await editEvent(req.body);
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const rundownReorder: RequestHandler = async (req, res) => {
  if (failEmptyObjects(req.body, res)) {
    return;
  }

  try {
    const { eventId, from, to } = req.body;
    const event = await reorderEvent(eventId, from, to);
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const rundownSwap: RequestHandler = async (req, res) => {
  if (failEmptyObjects(req.body, res)) {
    return;
  }

  try {
    const { from, to } = req.body;
    await swapEvents(from, to);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Create controller for PATCH request to '/events/applydelay/:eventId'
// Returns -
export const rundownApplyDelay: RequestHandler = async (req, res) => {
  try {
    await applyDelay(req.params.eventId);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Create controller for DELETE request to '/events/:eventId'
// Returns -
export const deleteEventById: RequestHandler = async (req, res) => {
  try {
    await deleteEvent(req.params.eventId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Create controller for DELETE request to '/events/'
// Returns -
export const rundownDelete: RequestHandler = async (req, res) => {
  try {
    await deleteAllEvents();
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error);
  }
};
