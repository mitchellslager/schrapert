require("esbuild").buildSync({
	entryPoints: ["scripts/cli.ts"],
	bundle: true,
	platform: "node",
	target: ["node18"],
	outdir: "build",
});
