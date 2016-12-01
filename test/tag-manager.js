import test from 'tape';
import { TagManager } from '../src/tag-manager';

/**
 * Create an Object3D-like test fixture.
 */
const Object3D = () => ({ userData: {}, isObject3D: true });

test('tag manager # tag objects', (assert) => {

  const tags = TagManager();
  const object = Object3D();

  tags.tag(object, 'foo');

  assert.true(tags.has(object, 'foo'), 'assigns tags');

  tags.untag(object, 'foo');

  assert.false(tags.has(object, 'foo'), 'removes tags');

  assert.end();

});

test('tag manager # list single tags', (assert) => {

  const tags = TagManager();
  const list = [];

  for (let i = 0; i < 10; i++) {

    const object = Object3D();
    tags.tag(object, 'foo');
    list.push(object);

  }

  assert.same(tags.get('foo'), list, 'grows list');

  for (let i = 0; i < 5; i++) {

    const object = list.pop();
    tags.untag(object, 'foo');

  }

  assert.same(tags.get('foo'), list, 'trims list');

  assert.end();

});

test('tag manager # list composite tags', (assert) => {

  const tags = TagManager();
  const list = [];

  for (let i = 0; i < 10; i++) {

    const object = Object3D();
    tags.tag(object, 'foo');
    tags.tag(object, 'bar');
    list.push(object);

  }

  assert.same(tags.get('foo', 'bar'), list, 'grows list');

  for (let i = 0; i < 5; i++) {

    const object = list.pop();
    tags.untag(object, 'foo');
    tags.untag(object, 'bar');

  }

  assert.same(tags.get('foo', 'bar'), list, 'trims list');

  assert.end();

});

test('tag manager # list premade tags', (assert) => {

  const tags = TagManager();
  const list = [];

  for (let i = 0; i < 10; i++) {

    const object = Object3D();
    tags.tag(object, 'foo');
    tags.tag(object, 'bar');
    list.push(object);

  }

  const mask = tags.mask('foo', 'bar');

  assert.same(tags.get(mask), list, 'uses tag mask');

  assert.end();

});

test('tag manager # separate tags', (assert) => {

  const tags = TagManager();
  const foos = [];
  const bars = [];
  const foobars = [];

  for (let i = 0; i < 10; i++) {

    const object = Object3D();
    tags.tag(object, 'foo');
    foos.push(object);

  }

  for (let i = 0; i < 10; i++) {

    const object = Object3D();
    tags.tag(object, 'bar');
    bars.push(object);

  }

  for (let i = 0; i < 10; i++) {

    const object = Object3D();
    tags.tag(object, 'foo');
    tags.tag(object, 'bar');
    foos.push(object);
    bars.push(object);
    foobars.push(object);

  }

  assert.same(tags.get('foo'), foos, 'maintains foo list');
  assert.same(tags.get('bar'), bars, 'maintains bar list');
  assert.same(tags.get('foo', 'bar'), foobars, 'maintains foobar list');

  assert.end();

});
