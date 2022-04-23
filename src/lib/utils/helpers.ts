import ShortUniqueId from 'short-unique-id';

// initialise short unique id
const shortUniqueId = new ShortUniqueId();

export const selectAll = (selector: string) => document.querySelectorAll(selector);
export const select = (selector: string) => document.querySelector(selector);
export const shortId = () => shortUniqueId.randomUUID(6);
