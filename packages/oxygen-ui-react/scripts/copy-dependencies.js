import fs from 'fs';
import path from 'path';

const pkgJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
const dependencies = Object.keys(pkgJson.dependencies || {});

const copyRecursiveSync = (src, dest) => {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

dependencies.forEach(dep => {
  const src = path.join(process.cwd(), 'node_modules', dep);
  const dest = path.join(process.cwd(), 'dist', 'node_modules', dep);
  copyRecursiveSync(src, dest);
  console.log(`Copied ${dep} from node_modules to dist/node_modules`);
});
