import { readdirSync, rmSync } from 'fs';
import { resolve } from 'path';

const [nodePath, script, folderPath, folder] = process.argv;

function removeFolder(path: string) {
  rmSync(path, {
    force: true,
    recursive: true,
  });
}

function findFolder(path: string) {
  const options = readdirSync(path, { withFileTypes: true });
  const folders = options
    .filter((option) => !option.isFile())
    .map((option) => option.name);

  if (folders.find((folderName) => folderName === folder)) {
    console.log(path + '/' + folder);
    removeFolder(resolve(path, folder));
    return;
  }

  folders.forEach((folderName) => findFolder(resolve(path, folderName)));
}

findFolder(folderPath);
