import { defineConfig } from "tsup";
import { readPackageSync } from "read-pkg";
import { writePackageSync } from "write-pkg";

const entry = [
  "array",
  "iterator",
  "object",
  "string",
  "url",
  "validation",
].map((entry) => `src/${entry}/index.ts`);

export default defineConfig((opts) => ({
  entry,
  format: "esm",
  sourcemap: true,
  dts: true,
  clean: !opts.watch,
  async onSuccess() {
    // Update "exports" field in package.json
    const exports_entries = entry.map((file) => {
      const src_exp = /.*src\//;
      const ext_exp = /\.ts$/;

      const exported = file
        .replace(src_exp, "./")
        .replace(ext_exp, "")
        .replace(/\/index$/, "");

      const def = {
        import: file.replace(src_exp, "./dist/").replace(ext_exp, ".js"),
        types: file.replace(src_exp, "./dist/").replace(ext_exp, ".d.ts"),
      };

      return [exported, def];
    });

    const exports_value = Object.fromEntries(exports_entries);

    // Type cast needed due to overly strict typings...
    const package_json: Record<string, any> = readPackageSync({
      normalize: false,
    });

    package_json.exports = exports_value;

    writePackageSync(package_json, { normalize: false });
  },
}));
