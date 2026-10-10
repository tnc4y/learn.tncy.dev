"use client";

import { useEffect, useRef, useState } from "react";

interface MonacoEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  minimap?: boolean;
  className?: string;
  height?: string;
}

// Global Monaco Yükleme Durumu (Singleton)
let monacoPromise: Promise<any> | null = null;

function loadMonaco(): Promise<any> {
  if (monacoPromise) return monacoPromise;

  monacoPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject("Server-side rendering");
    }

    // Eğer monaco zaten yüklüyse doğrudan dön
    if ((window as any).monaco) {
      return resolve((window as any).monaco);
    }

    const scriptId = "monaco-loader-script";
    let loaderScript = document.getElementById(scriptId) as HTMLScriptElement;

    const onLoaderReady = () => {
      const amdRequire = (window as any).require;
      if (!amdRequire) {
        return reject("Monaco AMD require bulunamadı");
      }

      amdRequire.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs",
        },
      });

      amdRequire(["vs/editor/editor.main"], (monacoInstance: any) => {
        // SystemVerilog Dili ve Renklendiricisi Kaydı
        try {
          registerSystemVerilog(monacoInstance);
        } catch (e) {
          console.warn("SystemVerilog dili kaydı:", e);
        }

        resolve(monacoInstance);
      });
    };

    if (!loaderScript) {
      loaderScript = document.createElement("script");
      loaderScript.id = scriptId;
      loaderScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js";
      loaderScript.async = true;
      loaderScript.onload = onLoaderReady;
      loaderScript.onerror = (err) => {
        monacoPromise = null;
        reject(err);
      };
      document.body.appendChild(loaderScript);
    } else {
      if ((window as any).require) {
        onLoaderReady();
      } else {
        loaderScript.addEventListener("load", onLoaderReady);
      }
    }
  });

  return monacoPromise;
}

// SystemVerilog (IEEE 1800-2017) Sözdizimi Tanımlaması
function registerSystemVerilog(monaco: any) {
  const languages = monaco.languages.getLanguages();
  const hasSV = languages.some((l: any) => l.id === "systemverilog");
  if (hasSV) return;

  monaco.languages.register({ id: "systemverilog" });

  monaco.languages.setMonarchTokensProvider("systemverilog", {
    defaultToken: "",
    tokenPostfix: ".sv",

    keywords: [
      "module", "endmodule", "logic", "bit", "byte", "int", "integer", "longint",
      "shortint", "real", "shortreal", "time", "reg", "wire", "input", "output",
      "inout", "always", "always_ff", "always_comb", "always_latch", "assign",
      "initial", "final", "begin", "end", "if", "else", "case", "endcase", "casex",
      "casez", "default", "for", "while", "repeat", "forever", "function", "endfunction",
      "task", "endtask", "typedef", "enum", "struct", "union", "packed", "package",
      "endpackage", "import", "export", "interface", "endinterface", "modport",
      "generate", "endgenerate", "genvar", "localparam", "parameter", "posedge",
      "negedge", "assert", "assume", "cover", "property", "endproperty", "sequence",
      "endsequence", "clocking", "endclocking", "return", "break", "continue", "virtual",
      "class", "endclass", "new", "this", "super", "extends", "null", "fork", "join",
      "join_any", "join_none"
    ],

    operators: [
      "=", "<=", "==", "!=", "===", "!==", "<", "<=", ">", ">=",
      "+", "-", "*", "/", "%", "&&", "||", "!", "~", "&", "|", "^",
      "~&", "~|", "~^", "^~", "<<", ">>", ">>>", "<<<", "?", ":"
    ],

    systemFunctions: [
      "$display", "$write", "$strobe", "$monitor", "$time", "$stime", "$realtime",
      "$finish", "$stop", "$fatal", "$error", "$warning", "$info", "$random",
      "$urandom", "$urandom_range", "$readmemb", "$readmemh", "$dumpfile", "$dumpvars"
    ],

    tokenizer: {
      root: [
        // Sistem fonksiyonları ($display vb.)
        [/\$[a-zA-Z_]\w*/, "support.function"],

        // Komut direktifleri (`timescale, `define vb.)
        [/`[a-zA-Z_]\w*/, "constant.other"],

        // Anahtar kelimeler
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],

        // Yorumlar (// ve /* */)
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],

        // String dize
        [/"([^"\\]|\\.)*"/, "string"],

        // Hex, Bin ve Dec sayılar (örn: 4'hF, 8'b1010, 100)
        [/[0-9]+'[bB][0-1_xXzZ]+/, "number.binary"],
        [/[0-9]+'[hH][0-9a-fA-F_xXzZ]+/, "number.hex"],
        [/[0-9]+'[dD][0-9_]+/, "number"],
        [/\d+/, "number"],

        // Operatörler
        [/[<>=!+\-*\/%&|^~?:]+/, "operator"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],
    },
  });

  // SystemVerilog Otomatik Parantez ve Yorum Yapılandırması
  monaco.languages.setLanguageConfiguration("systemverilog", {
    comments: {
      lineComment: "//",
      blockComment: ["/*", "*/"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["begin", "end"],
      ["module", "endmodule"],
      ["case", "endcase"],
      ["function", "endfunction"],
      ["task", "endtask"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "begin", close: "end" },
    ],
  });
}

export default function MonacoEditor({
  value,
  onChange,
  language = "systemverilog",
  readOnly = false,
  minimap = true,
  className = "",
  height = "100%",
}: MonacoEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Dil eşleme
  const resolveLanguage = (lang: string) => {
    const l = lang.toLowerCase();
    if (l === "systemverilog" || l === "sv") return "systemverilog";
    if (l === "verilog" || l === "v") return "verilog";
    if (l === "html") return "html";
    if (l === "css") return "css";
    if (l === "javascript" || l === "js") return "javascript";
    if (l === "python" || l === "py") return "python";
    if (l === "c") return "c";
    if (l === "cpp") return "cpp";
    if (l === "xml") return "xml";
    if (l === "json") return "json";
    return "plaintext";
  };

  useEffect(() => {
    let isCancelled = false;

    loadMonaco()
      .then((monaco) => {
        if (isCancelled || !containerRef.current) return;

        // Var olan editör varsa temizle
        if (editorRef.current) {
          editorRef.current.dispose();
        }

        const editorInstance = monaco.editor.create(containerRef.current, {
          value: value,
          language: resolveLanguage(language),
          theme: "vs-dark",
          readOnly: readOnly,
          minimap: {
            enabled: minimap,
            side: "right",
            maxColumn: 80,
            renderCharacters: false,
          },
          fontSize: 13,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontLigatures: true,
          lineNumbers: "on",
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          tabSize: language === "systemverilog" || language === "verilog" ? 4 : 2,
          wordWrap: "off",
          padding: { top: 12, bottom: 12 },
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        });

        // Değişiklik dinleyici
        editorInstance.onDidChangeModelContent(() => {
          if (onChange) {
            onChange(editorInstance.getValue());
          }
        });

        editorRef.current = editorInstance;
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Monaco Editor yüklenemedi:", err);
        setLoadError(true);
      });

    return () => {
      isCancelled = true;
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []); // İlk yüklemede mount et

  // Dil veya salt-okunur değiştiğinde güncelle
  useEffect(() => {
    if (editorRef.current && (window as any).monaco) {
      const monaco = (window as any).monaco;
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, resolveLanguage(language));
      }
      editorRef.current.updateOptions({
        readOnly: readOnly,
        minimap: { enabled: minimap },
      });
    }
  }, [language, readOnly, minimap]);

  // Dışarıdan gelen `value` değiştiğinde (örneğin Reset veya Template değiştiğinde)
  useEffect(() => {
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== value) {
        const position = editorRef.current.getPosition();
        editorRef.current.setValue(value);
        if (position) {
          editorRef.current.setPosition(position);
        }
      }
    }
  }, [value]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Monaco DOM Konteyneri */}
      <div ref={containerRef} className="w-full h-full" style={{ height }} />

      {/* Yüklenirken veya Hata durumunda Fallback Textarea */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#1e1e1e] flex flex-col items-center justify-center p-4">
          {loadError ? (
            <div className="w-full h-full flex flex-col space-y-2">
              <span className="text-[11px] font-mono text-amber-400">
                Monaco CDN yüklenemedi (Yerel yedek editör aktif):
              </span>
              <textarea
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                readOnly={readOnly}
                className="w-full flex-1 bg-transparent text-[#d4d4d4] font-mono text-xs p-3 resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-[#858585]">
              <div className="w-3.5 h-3.5 border-2 border-[#007acc] border-t-transparent rounded-full animate-spin" />
              <span>Microsoft Monaco Editor (VS Code Motoru) Başlatılıyor...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
