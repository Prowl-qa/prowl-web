// Ambient declaration for plain CSS side-effect imports (e.g. `import "./globals.css"`).
// Next.js only ships a declaration for `*.module.css`, so editors/configs with
// `noUncheckedSideEffectImports` enabled flag global stylesheet imports. This covers them.
declare module '*.css';
