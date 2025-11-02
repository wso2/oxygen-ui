import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgPath = path.join(__dirname, '../package.json');
const distComponents = path.join(__dirname, '../dist/components');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const exportsBlock = {
  ".": {
    types: "./dist/index.d.ts",
    import: "./dist/index.js",
    require: "./dist/index.cjs"
  }
};

function addExports(dir, prefix = "") {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    if (entry.isDirectory()) {
      addExports(path.join(dir, entry.name), prefix + entry.name + "/");
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      const name = entry.name.replace(/\.js$/, "");
      const base = prefix + name;
      exportsBlock[`./${base}`] = {
        types: `./dist/components/${base}.d.ts`,
        import: `./dist/components/${base}.js`,
        require: `./dist/components/${base}.cjs`
      };
    }
  });
}

addExports(distComponents);

pkg.exports = exportsBlock;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("package.json exports updated!");
