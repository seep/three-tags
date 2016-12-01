# three-tags

Tag your three.js objects, then list them!

```javascript
import { Object3D } from 'three';
import { TagManager } from 'three-tags';

const tags = new TagManager();

for (let i = 0; i < 10; i++) {

  const bouncingObject = new Object3D();
  tags.tag(bouncingObject, 'bouncing');

}

for (let i = 0; i < 10; i++) {

  const spinningObject = new Object3D();
  tags.tag(spinningObject, 'spinning');

}

for (let i = 0; i < 10; i++) {

  const crazyObject = new Object3D();
  tags.tag(crazyObject, 'bouncing', 'spinning');

}

// Get individual tags...
tags.get('bouncing').forEach(bounce);
tags.get('spinning').forEach(spin);

// or combinations of them.
tags.get('bouncing', 'spinning').forEach(() => { bounce(); spin(); });
```

## Why?

Entity Component System architectures are really cool, but dominate the application design. With three.js it can be
better to piggyback something small and not fight the API. `three-tags` lets you use a system-ish update fusunction
when and where you want to, on subsets of entities.

## Performance

Tagging and untagging is really fast. Getting a list can be slow the first time and then really fast after that. So
think about prefetching your groups before you need them. This hints to the manager that it should keep track of those
combinations.
