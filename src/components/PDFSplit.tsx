"use client";

import { useState, useRef, useCallback } from "react";
import { FiUpload, FiDownload, FiX } from "react-icons/fi";
import { MdPictureAsPdf } from "react-icons/md";

interface Props {
  locale?: string;
}

type SplitMode = "range" | "every" | "extract";

export default function PDFSplit({ locale = "es" }: Props) {
  const isEs = locale === "es";

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<SplitMode>("range");
  const [rangeInput, setRangeInput] = useState("");
  const [everyN, setEveryN] = useState(1);
  const [extractPages, setExtractPages] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadPdf = useCallback(async (file: File) => {
    setError(null);
    setPdfFile(null);
    setPageCount(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
      setPdfFile(file);
    } catch {
      setError(isEs ? "No se pudo leer el PDF. Puede estar protegido o dañado." : "Could not read the PDF. It may be protected or corrupted.");
    }
  }, [isEs]);

  const parsePageList = (input: string, max: number): number[] | null => {
    const indices = new Set<number>();
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map((s) => parseInt(s.trim(), 10));
        if (isNaN(a) || isNaN(b) || a < 1 || b > max || a > b) return null;
        for (let i = a; i <= b; i++) indices.add(i - 1);
      } else {
        const n = parseInt(part, 10);
        if (isNaN(n) || n < 1 || n > max) return null;
        indices.add(n - 1);
      }
    }
    return indices.size > 0 ? Array.from(indices).sort((a, b) => a - b) : null;
  };

  const split = useCallback(async () => {
    if (!pdfFile || !pageCount) return;
    setSplitting(true);
    setError(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await pdfFile.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);

      const baseName = pdfFile.name.replace(/\.pdf$/i, "");

      if (mode === "range") {
        const indices = parsePageList(rangeInput, pageCount);
        if (!indices) {
          setError(isEs ? "Rango inválido. Usa formato: 1-3, 5, 7-9" : "Invalid range. Use format: 1-3, 5, 7-9");
          setSplitting(false);
          return;
        }
        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(srcDoc, indices);
        pages.forEach((p) => newDoc.addPage(p));
        const outBytes = await newDoc.save();
        const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${baseName}_pages.pdf`;
        a.click();
        URL.revokeObjectURL(url);

      } else if (mode === "every") {
        const n = Math.max(1, Math.floor(everyN));
        let part = 1;
        for (let start = 0; start < pageCount; start += n) {
          const end = Math.min(start + n, pageCount);
          const indices = Array.from({ length: end - start }, (_, i) => start + i);
          const newDoc = await PDFDocument.create();
          const pages = await newDoc.copyPages(srcDoc, indices);
          pages.forEach((p) => newDoc.addPage(p));
          const outBytes = await newDoc.save();
          const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${baseName}_part${part}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
          part++;
          await new Promise<void>((r) => setTimeout(r, 100));
        }

      } else {
        const indices = parsePageList(extractPages || `1-${pageCount}`, pageCount);
        if (!indices) {
          setError(isEs ? "Lista de páginas inválida." : "Invalid page list.");
          setSplitting(false);
          return;
        }
        for (const idx of indices) {
          const newDoc = await PDFDocument.create();
          const [page] = await newDoc.copyPages(srcDoc, [idx]);
          newDoc.addPage(page);
          const outBytes = await newDoc.save();
          const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${baseName}_page${idx + 1}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
          await new Promise<void>((r) => setTimeout(r, 80));
        }
      }
    } catch (err) {
      console.error(err);
      setError(isEs ? "Error al dividir el PDF." : "Error splitting the PDF.");
    } finally {
      setSplitting(false);
    }
  }, [pdfFile, pageCount, mode, rangeInput, everyN, extractPages, isEs]);

  return (
    <div className="flex flex-col gap-4">
      {!pdfFile ? (
        <div
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type === "application/pdf") loadPdf(f); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/40 bg-surface/20 p-10 transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <MdPictureAsPdf className="text-4xl text-text-muted/60" />
          <div className="text-center">
            <p className="text-sm font-medium text-text-muted">
              {isEs ? "Arrastra tu PDF aquí o haz clic para seleccionarlo" : "Drag your PDF here or click to select it"}
            </p>
            <p className="mt-1 text-xs text-text-muted/50">PDF</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-border/30 bg-surface/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <MdPictureAsPdf className="text-2xl text-primary" />
            <div>
              <p className="text-sm font-medium text-text">{pdfFile.name}</p>
              <p className="text-xs text-text-muted/60">
                {pageCount} {isEs ? "páginas" : "pages"} · {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => { setPdfFile(null); setPageCount(0); setError(null); }}
            className="rounded-lg border border-border/40 px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <FiX className="inline text-xs" /> {isEs ? "Cambiar" : "Change"}
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) loadPdf(f); e.target.value = ""; }}
      />

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {pdfFile && pageCount > 0 && (
        <>
          <div className="flex items-center rounded-lg border border-border/40 overflow-hidden text-sm w-fit">
            {([
              { id: "range", labelEs: "Rango de páginas", labelEn: "Page range" },
              { id: "every", labelEs: "Cada N páginas", labelEn: "Every N pages" },
              { id: "extract", labelEs: "Página por página", labelEn: "Page by page" },
            ] as { id: SplitMode; labelEs: string; labelEn: string }[]).map((m) => (
              <button
                key={m.id}
                onClick={() => { setMode(m.id); setError(null); }}
                className={`px-4 py-2 transition-colors ${
                  mode === m.id ? "bg-primary/20 text-primary" : "bg-surface/60 text-text-muted hover:text-text"
                }`}
              >
                {isEs ? m.labelEs : m.labelEn}
              </button>
            ))}
          </div>

          {mode === "range" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted">
                {isEs ? `Páginas a extraer (1–${pageCount}):` : `Pages to extract (1–${pageCount}):`}
              </label>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder={isEs ? "Ej: 1-3, 5, 7-9" : "E.g.: 1-3, 5, 7-9"}
                className="w-full rounded-xl border border-border/30 bg-surface/60 px-4 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-primary/50"
              />
              <p className="text-xs text-text-muted/50">
                {isEs ? "Genera un PDF con exactamente esas páginas." : "Generates a PDF with exactly those pages."}
              </p>
            </div>
          )}

          {mode === "every" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted">
                {isEs ? "Dividir cada N páginas:" : "Split every N pages:"}
              </label>
              <input
                type="number"
                min={1}
                max={pageCount}
                value={everyN}
                onChange={(e) => setEveryN(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-32 rounded-xl border border-border/30 bg-surface/60 px-4 py-2.5 text-sm text-text outline-none focus:border-primary/50"
              />
              <p className="text-xs text-text-muted/50">
                {isEs
                  ? `Genera ${Math.ceil(pageCount / Math.max(1, everyN))} archivo${Math.ceil(pageCount / Math.max(1, everyN)) !== 1 ? "s" : ""} de ${everyN} página${everyN !== 1 ? "s" : ""} cada uno.`
                  : `Generates ${Math.ceil(pageCount / Math.max(1, everyN))} file${Math.ceil(pageCount / Math.max(1, everyN)) !== 1 ? "s" : ""} of ${everyN} page${everyN !== 1 ? "s" : ""} each.`}
              </p>
            </div>
          )}

          {mode === "extract" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted">
                {isEs ? `Páginas a extraer individualmente (dejar vacío = todas):` : `Pages to extract individually (leave empty = all):`}
              </label>
              <input
                type="text"
                value={extractPages}
                onChange={(e) => setExtractPages(e.target.value)}
                placeholder={isEs ? `Ej: 1, 3, 5 — o vacío para las ${pageCount} páginas` : `E.g.: 1, 3, 5 — or empty for all ${pageCount} pages`}
                className="w-full rounded-xl border border-border/30 bg-surface/60 px-4 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-primary/50"
              />
              <p className="text-xs text-text-muted/50">
                {isEs ? "Cada página se descarga como un PDF independiente." : "Each page is downloaded as a separate PDF."}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={split}
              disabled={splitting || (mode === "range" && !rangeInput.trim())}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <FiDownload />
              {splitting ? (isEs ? "Dividiendo…" : "Splitting…") : (isEs ? "Dividir PDF" : "Split PDF")}
            </button>
          </div>
        </>
      )}

      {!pdfFile && !error && (
        <p className="text-center text-sm text-text-muted/40">
          {isEs ? "Sube un PDF para elegir cómo dividirlo." : "Upload a PDF to choose how to split it."}
        </p>
      )}
    </div>
  );
}
