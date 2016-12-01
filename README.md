# three-tags

Tag your three.js objects, then list them!

## Example

```javascript
import { Object3D } from 'three';
import { TagManager } from 'three-tags';

const tags = new TagManager();

for (let i = 0; i < 10; i++) {

  const bouncingObject = new Object3D();
  tags.tag(bouncingObject, 'bounce');

}

for (let i = 0; i < 10; i++) {

  const spinningObject = new Object3D();
  tags.tag(spinningObject, 'spin');

}

for (let i = 0; i < 10; i++) {

  const crazyObject = new Object3D();
  tags.tag(crazyObject, 'bounce');
  tags.tag(crazyObject, 'spin');

}

// Get individual tags...
tags.get('bounce').forEach(bounce);
tags.get('spin').forEach(spin);

// or combinations of them.
tags.get('bounce', 'spin').forEach(() => { bounce(); spin(); });
```

## Why?

Entity Component System architectures are great, but dominate the application design. With small three.js experiments
it can be overwhelming. `three-tags` lets you use a system-ish update function when and where you want to, on subsets
of entities with unstructured data. Separate your behaviours from your objects without rewriting everything.

## Performance

Tagging and untagging is really fast. Getting a list can be slow the first time and then really fast after that, so
think about prefetching your groups before you need them. This hints to the manager that it should keep track of those
combinations. If you want to speed up access on composite tag groups, try making the mask ahead of time:

```javascript
const bouncingSpinningMask = tags.mask('bounce', 'spin');

tags.get('bounce', 'spin'); // has to map the string tags to a bitmask
tags.get(bouncingSpinningMask) // goes straight to fetching the object group
```

## Tag Limit

Only 32 tags are supported right now, to make bitmasking easy. More could be supported in the future.
