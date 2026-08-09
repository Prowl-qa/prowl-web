import {
  createElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

export type OgImageOptions = {
  /** Small uppercase label above the headline, e.g. "PROWL CLI". */
  eyebrow: string;
  /** One-line headline; the main message, kept short for thumbnail legibility. */
  headline: string;
};

type OgImageContentOptions = OgImageOptions & {
  logoDataUri: string;
};

// @vercel/og's pinned Tailwind-to-Satori parser handles layout, spacing, color,
// and typography here, but logs gradient utilities as invalid. Keep only these
// generated-image gradients in scoped CSS properties so the visual card stays
// stable while avoiding broad inline style objects.
const CARD_BACKGROUND: CSSProperties = {
  backgroundImage:
    "radial-gradient(1100px circle at 18% -10%, rgba(34,211,238,0.20), transparent 45%), radial-gradient(1000px circle at 108% 118%, rgba(74,222,128,0.18), transparent 45%)",
};

const ACCENT_BACKGROUND: CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #22d3ee, #4ade80)",
};

function ogElement(
  type: string,
  props: Record<string, unknown> | null,
  ...children: ReactNode[]
): ReactElement {
  return createElement(type, props, ...children);
}

export function createOgImageContent({
  eyebrow,
  headline,
  logoDataUri,
}: OgImageContentOptions): ReactElement {
  return ogElement(
    "div",
    {
      tw: "w-full h-full flex flex-col justify-between px-20 py-[72px] bg-[#09090b] text-[#fafafa] font-sans",
      style: CARD_BACKGROUND,
    },
    ogElement(
      "div",
      { tw: "flex items-center" },
      ogElement("img", { src: logoDataUri, width: 132, height: 132, alt: "" }),
      ogElement(
        "span",
        { tw: "ml-6 text-[76px] font-bold tracking-tight text-[#fafafa]" },
        "Prowl"
      )
    ),
    ogElement(
      "div",
      { tw: "flex flex-col" },
      ogElement(
        "span",
        { tw: "mb-5 text-[28px] tracking-widest uppercase text-[#22d3ee]" },
        eyebrow
      ),
      ogElement(
        "span",
        {
          tw: "flex max-w-[1000px] text-[58px] leading-[1.15] tracking-tight text-[#fafafa]",
        },
        headline
      )
    ),
    ogElement(
      "div",
      { tw: "flex items-center justify-between" },
      ogElement("div", {
        tw: "w-[220px] h-3 rounded-full",
        style: ACCENT_BACKGROUND,
      }),
      ogElement("span", { tw: "text-[30px] text-[#a1a1aa]" }, "prowl.tools")
    )
  );
}
