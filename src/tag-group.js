/**
 * Create a new tag group.
 * @returns {TagGroup}
 * @constructor
 */
export function TagGroup() {

  return Object.create(TagGroupPrototype, {

    indexes: {
      value: new WeakMap(),
      writable: false,
      enumerable: true,
    },

    list: {
      value: [],
      writable: false,
      enumerable: true,
    }

  });

}

const TagGroupPrototype = {

  track(object) {

    if (object.isObject3D !== true) {

      throw new TypeError('Tag groups are only for Object3D instances.');

    } else if (this.indexes.has(object) === false) {

      this.indexes.set(object, this.list.length);
      this.list.push(object);

    }

  },

  tracking(object) {

    return this.indexes.has(object);

  },

  forget(object) {

    if (this.indexes.has(object) === true) {

      const index = this.indexes.get(object);

      this.indexes.delete(object);

      const lastidx = this.list.length - 1;

      // Swap in the last object, unless we just removed it.
      if (lastidx !== index) {

        const lastobj = this.list.pop();
        this.indexes.set(lastobj, index);
        this.list[index] = lastobj;

      } else {

        this.list.pop();

      }

    }

  }

};
