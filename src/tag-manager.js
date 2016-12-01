import { TagGroup } from './tag-group';

/**
 * Create a new tag manager.
 * @returns {TagManager}
 * @constructor
 */
export function TagManager() {

  const masks = new Map();
  const groups = new Map();
  const objects = [];

  const manager = {};

  /**
   * Add a tag to an object.
   * @param {Object3D} object - The object.
   * @param {String} tag - The tag.
   */
  manager.tag = function (object, tag) {

    let tagmask = masks.get(tag);

    if (tagmask === undefined && masks.size >= 31) {

      throw new Error('The TagManager only supports 32 tags.');

    } else if (tagmask === undefined) {

      tagmask = 1 << masks.size;
      masks.set(tag, tagmask);

    }

    const grpmask = object.userData.tags = (object.userData.tags | tagmask);

    const group = groups.get(grpmask);
    if (group) group.track(object);

    objects.push(object);

  };

  /**
   *
   * @param object
   * @param tags
   */
  manager.has = function(object, ...tags) {

    let grpmask = 0;

    for (let i = 0; i < tags.length; i++) {

      grpmask = grpmask | masks.get(tags[i]);

    }

    return (object.userData.tags & grpmask) !== 0;

  };

  /**
   * Get a list of objects with a set of tags.
   * @param {String} tags - One or more tags to look for.
   * @returns {Object3D[]} The list of objects with that tag.
   */
  manager.get = function (...tags) {

    let grpmask = 0;

    for (let i = 0; i < tags.length; i++) {

      grpmask = grpmask | masks.get(tags[i]);

    }

    let group = groups.get(grpmask);

    if (group === undefined) {

      group = TagGroup();
      groups.set(grpmask, group);

      for (let i = 0; i < objects.length; i++) {

        const object = objects[i];
        const objmask = object.userData.tags;

        // Add the object to the group if it contains all of the tags.
        if ((objmask & grpmask) === grpmask) group.track(object);

      }

    }

    return group.list;

  };

  /**
   * Remove a tag from an object with a tag.
   * @param {Object3D} object - The object.
   * @param {String} tag - The tag.
   */
  manager.untag = function (object, tag) {

    const tagmask = masks.get(tag);

    if (tagmask === undefined) {

      return; // tag doesn't exist

    }

    const grpmask = object.userData.tags;
    const group = groups.get(grpmask);

    // Remove the object from its old group if one exists.
    if (group) group.forget(object);

    const objmask = object.userData.tags = (object.userData.tags ^ tagmask);

    // Remove the object from the list if it has no tags left.
    if (objmask === 0) objects.splice(objects.indexOf(object), 1);

  };

  return manager;

}
