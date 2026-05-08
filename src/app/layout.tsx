import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/pdf-split";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dividir PDF Online Gratis — Split PDF por Páginas",
    template: "%s | PDF Split",
  },
  description:
    "Divide un PDF por rango de páginas, cada N páginas, o extrae página por página. 3 modos de división, 100% en el navegador, sin registro, sin subir archivos a servidores.",
  keywords: [
    "dividir pdf online gratis",
    "split pdf gratis",
    "separar páginas pdf",
    "extraer páginas pdf",
    "pdf split online",
    "cortar pdf online",
    "dividir pdf por páginas",
    "separar pdf en partes",
    "extract pages from pdf",
    "pdf page extractor",
  ],
  authors: [{ name: "Miguel Ángel Colorado Marin", url: "https://miguelacm.es" }],
  creator: "Miguel Ángel Colorado Marin",
  openGraph: {
    title: "Dividir PDF Online Gratis — Split PDF",
    description:
      "Divide un PDF por rango, cada N páginas o página por página. Sin registro. Por MACM.",
    url: SITE_URL,
    siteName: "PDF Split — MACM",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dividir PDF Online Gratis",
    description: "Divide un PDF por rango o página por página. Sin registro. Por MACM · miguelacm.es",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
        <meta name="author" content="Miguel Ángel Colorado Marin" />
        <meta name="copyright" content="Miguel Ángel Colorado Marin — miguelacm.es" />
      </head>
      <body className="antialiased">
        {children}
        <footer className="pb-8 text-center text-xs text-text-muted/40">
          ⚡ por{" "}
          <a
            href="https://miguelacm.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            MACM · miguelacm.es
          </a>
          {" · "}
          <a
            href="https://github.com/m-a-c-m/PDFSplit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            Código abierto
          </a>
        </footer>
      </body>
    </html>
  );
}
