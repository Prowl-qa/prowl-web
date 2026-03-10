import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-10 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold tracking-tight mt-10 mb-3 pb-2 border-b border-border">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-8 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 mb-4 text-muted">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-cyan underline underline-offset-4 hover:text-cyan-light transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-muted">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-muted">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan pl-4 my-6 italic text-muted">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes("language-");
      if (isBlock) {
        return (
          <code className={`${className} text-sm`}>{children}</code>
        );
      }
      return (
        <code className="bg-code-bg text-cyan-light px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-code-bg border border-border rounded-lg p-4 overflow-x-auto mb-6 text-sm">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="my-8 border-border" />
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        className="rounded-lg border border-border my-6 max-w-full"
      />
    ),
    ...components,
  };
}
