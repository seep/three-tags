import test from 'tape';
import { TagGroup } from '../src/tag-group';

/**
 * Create an Object3D-like test fixture.
 */
const Object3D = () => ({ userData: {}, isObject3D: true });

test('tag group # track objects', (assert) => {

  const group = TagGroup();

  const object = Object3D();
  assert.false(group.tracking(object), 'new object');

  group.track(object);
  assert.true(group.tracking(object), 'tracked object');

  group.forget(object);
  assert.false(group.tracking(object), 'forgotten object');

  assert.end();

});

test('tag group # list objects', (assert) => {

  const group = TagGroup();
  const list = [];

  for (let i = 0; i < 100; i++) {

    const object = Object3D();
    group.track(object);
    list.push(object);

  }

  assert.same(group.list, list, 'maintains list');

  for (let i = 0; i < 50; i++) {

    const object = list.pop();
    group.forget(object);

  }

  assert.same(group.list, list, 'maintains list');

  assert.end();

});
