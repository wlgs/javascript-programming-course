import { checkName } from "../index.js";
import assert from 'assert';

describe('The checkName() method', function () {
  it('Returns "dir" for a directory named "directory"', function () {
    assert.strictEqual(checkName("directory"), 'dir')
  });
  it('Returns "file" for a file named "file.txt"', function () {
    assert.strictEqual(checkName("file.txt"), 'file')
  });
  it('Returns "err" for a non existent file', function () {
    assert.strictEqual(checkName("file11111.txt"), 'err')
  });
});
