import PDFSplit from "@/components/PDFSplit";
import { MdPictureAsPdf } from "react-icons/md";

const EMBED_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/pdf-split";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <MdPictureAsPdf className="text-base" />
            Herramienta gratuita · Free tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            <span className="gradient-text">Dividir PDF</span>
            <br />
            <span className="text-2xl font-medium text-text-muted sm:text-3xl">Por rango · cada N páginas · página por página</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-text-muted">
            Divide un PDF con 3 modos distintos: extrae un rango de páginas, divide en fragmentos de N páginas, o descarga cada página como un PDF independiente.
            100% en el navegador — tus documentos nunca salen de tu dispositivo.
          </p>
        </div>

        <div className="glass rounded-2xl border border-border/20 p-5 sm:p-8">
          <PDFSplit />
        </div>

        <div className="mt-12 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            ¿Cómo dividir un PDF? / How to split a PDF?
          </h2>
          <ol className="space-y-5">
            {[
              {
                n: "1",
                t: "Carga tu PDF / Upload your PDF",
                d: "Arrastra el archivo PDF sobre la zona de carga o haz clic para seleccionarlo. Se leerá el número de páginas automáticamente para mostrarte las opciones disponibles. / Drag your PDF or click to select it. The page count is read automatically.",
              },
              {
                n: "2",
                t: "Elige el modo de división / Choose split mode",
                d: "'Rango de páginas' genera un único PDF con las páginas que indiques (ej: 1-3, 5, 7-9). 'Cada N páginas' divide el PDF en fragmentos de N páginas. 'Página por página' descarga cada página como un PDF individual. / Choose range, every N pages, or individual pages mode.",
              },
              {
                n: "3",
                t: "Configura los parámetros / Set the parameters",
                d: "En modo Rango, escribe las páginas con formato '1-3, 5, 7-9'. En modo Cada N, escribe el número de páginas por fragmento. En modo Página por página, deja vacío para todas o indica cuáles quieres. / Enter page ranges, N value, or specific pages depending on the mode.",
              },
              {
                n: "4",
                t: "Descarga el resultado / Download the result",
                d: "Haz clic en 'Dividir PDF'. Se descargarán automáticamente los archivos resultantes. Si son múltiples, se descargan con un pequeño intervalo entre cada uno. / Click Split PDF. Multiple files download automatically with a small delay between each.",
              },
            ].map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {s.n}
                </span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Preguntas frecuentes / FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "¿Cuáles son los 3 modos de división? / What are the 3 split modes?",
                a: "'Rango de páginas': extrae un subconjunto de páginas en un único PDF (ej: 1-3, 5). 'Cada N páginas': divide el PDF en fragmentos de igual tamaño. 'Página por página': genera un PDF independiente por cada página seleccionada. / Range: extract pages as one PDF. Every N: split into equal chunks. Page by page: one PDF per page.",
              },
              {
                q: "¿Cómo escribo el rango de páginas? / How do I write the page range?",
                a: "Usa comas para separar páginas individuales y guiones para rangos. Ejemplos: '1-5' extrae las páginas 1 a 5; '1, 3, 7-10' extrae las páginas 1, 3 y de la 7 a la 10; '2-2' extrae solo la página 2. / Use commas for individual pages and dashes for ranges. E.g., '1-5, 7, 9-12'.",
              },
              {
                q: "¿Los PDFs protegidos con contraseña funcionan? / Do password-protected PDFs work?",
                a: "No. Los PDFs cifrados no pueden procesarse en el navegador. Deberás eliminar la protección con otra herramienta antes de dividirlos aquí. / No. Encrypted PDFs cannot be processed. Remove the protection first.",
              },
              {
                q: "¿Se descargan varios archivos a la vez? / Do multiple files download at once?",
                a: "Los archivos se descargan con un pequeño intervalo entre cada uno (100ms) para que el navegador tenga tiempo de procesarlos. Con muchas páginas en modo 'página por página', el proceso puede tardar unos segundos. / Files download with a small 100ms delay between each to let the browser process them.",
              },
              {
                q: "¿Mis PDFs se envían a algún servidor? / Are my PDFs uploaded to any server?",
                a: "No. Todo el procesamiento ocurre localmente en tu navegador usando pdf-lib. El archivo PDF nunca abandona tu dispositivo. / No. All processing is local using pdf-lib. Your file never leaves your device.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-white">
            Incrusta en tu web / Embed on your website
          </h2>
          <p className="mb-4 text-sm text-text-muted">
            Integra este divisor de PDFs en cualquier página web con un simple iframe:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-surface/80 p-4 text-xs text-text-muted">
            <code>{`<iframe
  src="${EMBED_URL}"
  width="100%"
  height="700"
  frameborder="0"
  loading="lazy"
  style="border-radius:12px"
  title="PDF Split — MACM"
></iframe>`}</code>
          </pre>
          <p className="mt-3 text-xs text-text-muted/60">
            Herramienta embebible gracias a <code className="text-primary/80">frame-ancestors *</code>.
            Sin cookies, sin tracking, 100% gratuita.
          </p>
        </div>

      </div>
    </main>
  );
}
