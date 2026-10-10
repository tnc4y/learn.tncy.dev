"use client";

// WebAssembly (Pyodide CPython 3.12) Tarayıcı İçi Gerçek Python Çalıştırıcı
let pyodidePromise: Promise<any> | null = null;

export async function getPyodideInstance(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("Pyodide yalnızca tarayıcı ortamında çalışır.");
  }

  const win = window as any;
  if (win.pyodideInstance) {
    return win.pyodideInstance;
  }

  if (pyodidePromise) {
    return pyodidePromise;
  }

  pyodidePromise = new Promise(async (resolve, reject) => {
    try {
      if (!win.loadPyodide) {
        const scriptId = "pyodide-cdn-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
          script = document.createElement("script");
          script.id = scriptId;
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.async = true;

          await new Promise((res, rej) => {
            script.onload = res;
            script.onerror = rej;
            document.head.appendChild(script);
          });
        }
      }

      // Pyodide Çekirdeğini Başlat
      const pyodide = await win.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });

      // Python ortamına dahili hafif 'rclpy' modülü enjekte et
      // Bu sayede ROS 2 düğüm kodları (import rclpy) gerçek Python içinde hatasız çalışır!
      await pyodide.runPythonAsync(`
import sys
import types
import json
import time

# Gerçek Python içine sanal rclpy modülü tanımlama
rclpy_mod = types.ModuleType("rclpy")
node_mod = types.ModuleType("rclpy.node")
duration_mod = types.ModuleType("rclpy.duration")
std_msgs_mod = types.ModuleType("std_msgs")
std_msgs_msg_mod = types.ModuleType("std_msgs.msg")

class StringMsg:
    def __init__(self, data=""):
        self.data = data

std_msgs_msg_mod.String = StringMsg

class Node:
    def __init__(self, node_name):
        self.node_name = node_name
        self._publishers = []
        self._subscriptions = []
        self._timers = []
        print(f"[BOOT] rclpy.Node başlatıldı: '{node_name}' (Domain: 0)")

    def create_publisher(self, msg_type, topic_name, qos_profile=10):
        pub = types.SimpleNamespace(topic=topic_name, publish=lambda msg: print(f"[@PUB] Topic: {topic_name} -> {getattr(msg, 'data', msg)}"))
        self._publishers.append(pub)
        return pub

    def create_subscription(self, msg_type, topic_name, callback, qos_profile=10):
        sub = types.SimpleNamespace(topic=topic_name, callback=callback)
        self._subscriptions.append(sub)
        print(f"[INFO] '{topic_name}' konusu dinleniyor...")
        return sub

    def create_timer(self, timer_period_sec, callback):
        timer = types.SimpleNamespace(period=timer_period_sec, callback=callback)
        self._timers.append(timer)
        return timer

    def get_logger(self):
        return types.SimpleNamespace(
            info=lambda msg: print(f"[INFO] [{self.node_name}]: {msg}"),
            warn=lambda msg: print(f"[WARN] [{self.node_name}]: {msg}"),
            error=lambda msg: print(f"[ERROR] [{self.node_name}]: {msg}")
        )

    def destroy_node(self):
        print(f"[SHUTDOWN] '{self.node_name}' sonlandırıldı.")

node_mod.Node = Node
rclpy_mod.node = node_mod
rclpy_mod.init = lambda args=None: print("[INIT] ROS 2 (rclpy Wasm) Çekirdeği Hazırlandı.")
rclpy_mod.shutdown = lambda: print("[FINISH] rclpy kapatıldı.")
rclpy_mod.spin = lambda node: [t.callback() for t in getattr(node, '_timers', [])][:3] # 3 adım döngü işlet

sys.modules["rclpy"] = rclpy_mod
sys.modules["rclpy.node"] = node_mod
sys.modules["std_msgs"] = std_msgs_mod
sys.modules["std_msgs.msg"] = std_msgs_msg_mod
`);

      win.pyodideInstance = pyodide;
      resolve(pyodide);
    } catch (err) {
      pyodidePromise = null;
      reject(err);
    }
  });

  return pyodidePromise;
}

export interface PythonExecutionResult {
  success: boolean;
  logs: string[];
  executionTimeMs: number;
}

export async function executePythonCode(code: string): Promise<PythonExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];

  try {
    const pyodide = await getPyodideInstance();

    // stdout ve stderr yönlendirme
    pyodide.setStdout({
      batched: (text: string) => {
        if (text) {
          // Satırlara ayır ve ekle
          const lines = text.split("\n");
          lines.forEach((line) => {
            if (line.trim()) logs.push(line);
          });
        }
      },
    });

    pyodide.setStderr({
      batched: (text: string) => {
        if (text) {
          const lines = text.split("\n");
          lines.forEach((line) => {
            if (line.trim()) logs.push(`[STDERR] ${line}`);
          });
        }
      },
    });

    // Kodu Gerçek CPython WebAssembly'de Çalıştır
    await pyodide.runPythonAsync(code);
    const executionTimeMs = Math.round(performance.now() - startTime);

    return {
      success: true,
      logs: logs.length > 0 ? logs : ["[INFO] Python betiği hatasız çalıştı (Çıktı üretilmedi)."],
      executionTimeMs,
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    const rawError = err?.message || String(err);

    // Python Traceback'ini terminale temiz biçimde aktar
    const errorLines = rawError.split("\n").filter((l: string) => l.trim().length > 0);

    return {
      success: false,
      logs: [
        ...logs,
        "[PYTHON HATA AYIKLAMA / TRACEBACK]",
        ...errorLines,
      ],
      executionTimeMs,
    };
  }
}
