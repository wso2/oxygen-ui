/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import prettier from "prettier";

const PACKAGE_NAME = "@wso2/oxygen-icons";
const iconsDir = path.resolve("icons");
const srcDir = path.resolve("src");
const distDir = path.resolve("dist");
const distIconsDir = path.join(distDir, "icons");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distIconsDir, { recursive: true });

// Copy CSS file to dist
if (fs.existsSync(path.join(srcDir, "icons.css"))) {
  fs.copyFileSync(path.join(srcDir, "icons.css"), path.join(distDir, "icons.css"));
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const files = fs.readdirSync(iconsDir).filter((f) => f.endsWith(".svg"));
const indexExports = [];
const indexTypeExports = [];

/** Normalize SVG attributes (e.g. stroke-width → strokeWidth) */
function normalizeAttributes(attrs) {
  const normalized = {};
  for (const [key, value] of Object.entries(attrs)) {
    const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    normalized[camelKey] = value;
  }
  return normalized;
}

/** Convert filenames to PascalCase */
function toPascalCase(string) {
  return string
    .replace(/[-_]+/g, " ")
    .replace(/\s(.)/g, (s) => s.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (s) => s.toUpperCase());
}

async function generateIcons() {
  for (const file of files) {
    const svgContent = fs.readFileSync(path.join(iconsDir, file), "utf8");
    const parsed = parser.parse(svgContent);
    const svg = parsed.svg;

    const baseName = path.basename(file, ".svg");
    const svgName = svg.name || svg.id || toPascalCase(baseName);
    const svgClass = svg.class || undefined;

    const nodeElements = Object.entries(svg)
      .filter(([tag]) =>
        ["path", "circle", "rect", "line", "polyline", "polygon", "ellipse", "g"].includes(tag)
      )
      .flatMap(([tag, val]) => {
        const arr = Array.isArray(val) ? val : [val];
        return arr.map((attrs) => [tag, normalizeAttributes(attrs)]);
      });

    const iconNodeJson = JSON.stringify(nodeElements, null, 2);

    const tsSource = `
import { createLucideIcon } from "lucide-react";

const ${svgName}Icon = createLucideIcon("${svgName}", ${iconNodeJson}) as any;
${svgClass ? `${svgName}Icon.defaultProps = { className: "${svgClass}" };` : ""}
export const ${svgName} = ${svgName}Icon;
`;

    const dtsSource = `
import type { LucideIcon } from "lucide-react";
export declare const ${svgName}: LucideIcon;
`;

    const formattedTs = await prettier.format(tsSource, { parser: "typescript" });
    const formattedDts = await prettier.format(dtsSource, { parser: "typescript" });

    fs.writeFileSync(path.join(distIconsDir, `${svgName}.ts`), formattedTs);
    fs.writeFileSync(path.join(distIconsDir, `${svgName}.d.ts`), formattedDts);

    // --- For JS builds, include ".js" extension ---
    indexExports.push(`export { ${svgName} } from "./icons/${svgName}.js";`);
    // --- For .d.ts builds, no extension ---
    indexTypeExports.push(`export { ${svgName} } from "./icons/${svgName}";`);
  }

  // Add CSS import at the beginning
  const cssImport = `import "./icons.css";`;
  
  // Add lucide-react re-export
  indexExports.push(`export * from "lucide-react";`);
  indexTypeExports.push(`export * from "lucide-react";`);

  const indexContent = await prettier.format(
    cssImport + "\n" + indexExports.join("\n"), 
    { parser: "typescript" }
  );
  const indexTypesContent = await prettier.format(indexTypeExports.join("\n"), { parser: "typescript" });

  fs.writeFileSync(path.join(distDir, "index.ts"), indexContent);
  fs.writeFileSync(path.join(distDir, "index.d.ts"), indexTypesContent);

  console.log(`✅ Generated ${files.length} icons in dist/icons`);
  console.log(`✨ All icons + lucide-react are exported from ${PACKAGE_NAME}`);
}

await generateIcons();
