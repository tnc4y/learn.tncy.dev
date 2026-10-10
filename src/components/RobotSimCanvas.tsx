"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Compass, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ShieldAlert, Zap } from "lucide-react";

interface RobotState {
  x: number;
  y: number;
  theta: number; // Radyan cinsinden açı
  v: number;     // Çizgisel hız (m/s)
  w: number;     // Açısal hız (rad/s)
  battery: number;
}

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function RobotSimCanvas({
  onLaserScanUpdate,
}: {
  onLaserScanUpdate?: (minDist: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [autoDrive, setAutoDrive] = useState(true);
  const [telemetry, setTelemetry] = useState<{
    x: number;
    y: number;
    yawDeg: number;
    speed: number;
    minLidarDist: number;
    obstacleAlert: boolean;
    battery: number;
  }>({
    x: 0,
    y: 0,
    yawDeg: 0,
    speed: 0,
    minLidarDist: 2.5,
    obstacleAlert: false,
    battery: 98,
  });

  // Robot ve Ortam Durumu Ref
  const stateRef = useRef<RobotState>({
    x: 100,
    y: 120,
    theta: 0,
    v: 0.6,
    w: 0.0,
    battery: 98,
  });

  const pathTrailRef = useRef<{ x: number; y: number }[]>([]);

  // Haritadaki Engeller (Obstacles)
  const obstacles: Obstacle[] = [
    { x: 220, y: 50, w: 70, h: 60 },
    { x: 380, y: 130, w: 80, h: 70 },
    { x: 150, y: 170, w: 90, h: 50 },
  ];

  // Robotu Sıfırla
  const resetRobot = () => {
    stateRef.current = {
      x: 80,
      y: 100,
      theta: 0.2,
      v: 0.6,
      w: 0.0,
      battery: 98,
    };
    pathTrailRef.current = [];
  };

  // Manuel Yönlendirme Komutları
  const driveManual = (v: number, w: number) => {
    setAutoDrive(false);
    stateRef.current.v = v;
    stateRef.current.w = w;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const state = stateRef.current;

      // 1. FİZİK & HAREKET GÜNCELLEMESİ
      if (isRunning) {
        state.theta += state.w * 0.05;
        state.x += Math.cos(state.theta) * state.v * 1.5;
        state.y += Math.sin(state.theta) * state.v * 1.5;

        // Ekran sınırlarından sekme (Duvar Çarpışması)
        const margin = 24;
        if (state.x < margin) {
          state.x = margin;
          state.theta = Math.PI - state.theta + (Math.random() - 0.5);
        } else if (state.x > width - margin) {
          state.x = width - margin;
          state.theta = Math.PI - state.theta + (Math.random() - 0.5);
        }

        if (state.y < margin) {
          state.y = margin;
          state.theta = -state.theta + (Math.random() - 0.5);
        } else if (state.y > height - margin) {
          state.y = height - margin;
          state.theta = -state.theta + (Math.random() - 0.5);
        }

        // İz çizgisine ekle (maks 40 nokta)
        pathTrailRef.current.push({ x: state.x, y: state.y });
        if (pathTrailRef.current.length > 50) {
          pathTrailRef.current.shift();
        }
      }

      // 2. ÇİZİM BAŞLANGICI
      ctx.clearRect(0, 0, width, height);

      // A) Izgara Zemin Çizgileri
      ctx.strokeStyle = "#172033";
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // B) Engelleri Çiz
      obstacles.forEach((obs) => {
        ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        // Engel üzerindeki çapraz uyarı çizgileri
        ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
        ctx.stroke();
      });

      // C) Robotun Geçmiş İzi (Trail)
      if (pathTrailRef.current.length > 1) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        pathTrailRef.current.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }

      // D) 360° LIDAR IŞINLARI (RAYCASTING)
      const numRays = 24;
      const maxLidarRange = 140; // Piksel menzili
      let minDistancePixels = maxLidarRange;

      for (let i = 0; i < numRays; i++) {
        const rayAngle = state.theta + (i * (2 * Math.PI)) / numRays;
        let rayDist = maxLidarRange;

        // Duvarlarla Kesişim
        const rayCos = Math.cos(rayAngle);
        const raySin = Math.sin(rayAngle);

        // Basit engel ve duvar mesafe kontrolü
        for (let d = 5; d < maxLidarRange; d += 4) {
          const checkX = state.x + rayCos * d;
          const checkY = state.y + raySin * d;

          // Dış duvarlara çarpma
          if (checkX <= 15 || checkX >= width - 15 || checkY <= 15 || checkY >= height - 15) {
            rayDist = d;
            break;
          }

          // Engellere çarpma
          const hitObstacle = obstacles.some(
            (o) => checkX >= o.x && checkX <= o.x + o.w && checkY >= o.y && checkY <= o.y + o.h
          );
          if (hitObstacle) {
            rayDist = d;
            break;
          }
        }

        if (rayDist < minDistancePixels) {
          minDistancePixels = rayDist;
        }

        // Işını Çiz
        const hitX = state.x + rayCos * rayDist;
        const hitY = state.y + raySin * rayDist;

        ctx.strokeStyle = rayDist < 45 ? "rgba(244, 63, 94, 0.6)" : "rgba(6, 182, 212, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(state.x, state.y);
        ctx.lineTo(hitX, hitY);
        ctx.stroke();

        // Çarpma Noktası (Laser Dot)
        ctx.fillStyle = rayDist < 45 ? "#f43f5e" : "#22d3ee";
        ctx.beginPath();
        ctx.arc(hitX, hitY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // OTONOM ENGEL KAÇINMA (NAV2 / REACTIVE AVOIDANCE)
      const realMinDistMeters = parseFloat((minDistancePixels / 35).toFixed(2));
      const hasAlert = realMinDistMeters < 0.6;

      if (autoDrive && isRunning) {
        if (hasAlert) {
          // Engel çok yakınsa dön ve rotayı değiştir
          state.w = 1.6;
          state.v = 0.2;
        } else {
          // Yol açıksa ileri sür
          state.w = 0.05 * Math.sin(Date.now() / 800); // Hafif gezinme
          state.v = 0.6;
        }
      }

      // E) ROBOT GÖVDESİ & YÖN GÖSTERGESİ
      ctx.save();
      ctx.translate(state.x, state.y);
      ctx.rotate(state.theta);

      // Sol ve Sağ Tekerlekler
      ctx.fillStyle = "#334155";
      ctx.fillRect(-12, -15, 24, 5);
      ctx.fillRect(-12, 10, 24, 5);

      // Ana Robot Şasisi (Yuvarlak)
      ctx.fillStyle = hasAlert ? "rgba(239, 68, 68, 0.2)" : "rgba(14, 165, 233, 0.25)";
      ctx.strokeStyle = hasAlert ? "#ef4444" : "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ön Yön Oku (Heading)
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(16, 0);
      ctx.stroke();

      // LiDAR Sensör Merkezi
      ctx.fillStyle = hasAlert ? "#ef4444" : "#f59e0b";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Telemetriyi React State'ine Aktar
      setTelemetry({
        x: parseFloat((state.x / 40).toFixed(2)),
        y: parseFloat((state.y / 40).toFixed(2)),
        yawDeg: Math.round(((state.theta * 180) / Math.PI) % 360),
        speed: parseFloat(state.v.toFixed(2)),
        minLidarDist: realMinDistMeters,
        obstacleAlert: hasAlert,
        battery: state.battery,
      });

      if (onLaserScanUpdate) {
        onLaserScanUpdate(realMinDistMeters);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRunning, autoDrive]);

  return (
    <div className="h-full flex flex-col bg-[#0b0f19] text-xs font-mono select-none overflow-hidden">
      {/* 1. ÜST TELEMETRİ HUD VE DURUM ÇUBUĞU */}
      <div className="h-9 px-3 bg-[#111827] border-b border-[#1e293b] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <Compass className="w-4 h-4 text-primary" />
            <span>2D Mobil Robot &amp; LiDAR Arenası</span>
          </div>

          <span className="hidden sm:inline text-[#64748b]">|</span>

          {/* Konum & Açı */}
          <span className="text-[#94a3b8] hidden sm:inline">
            Pose: ({telemetry.x}m, {telemetry.y}m) θ:{telemetry.yawDeg}°
          </span>
        </div>

        {/* Canlı Lidar Alarmı & Butonlar */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] transition-colors ${
              telemetry.obstacleAlert
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
            }`}
          >
            {telemetry.obstacleAlert ? (
              <>
                <ShieldAlert className="w-3 h-3 text-rose-400" />
                <span>ENGEL YAKIN ({telemetry.minLidarDist}m)</span>
              </>
            ) : (
              <>
                <span>LiDAR: {telemetry.minLidarDist}m (GÜVENLİ)</span>
              </>
            )}
          </div>

          <button
            onClick={() => setAutoDrive(!autoDrive)}
            className={`btn btn-xs font-mono text-[10px] rounded-lg ${
              autoDrive ? "btn-primary font-bold shadow-xs" : "btn-ghost text-[#858585]"
            }`}
          >
            {autoDrive ? "Otonom Sürüş: AÇIK" : "Manuel Sürüş"}
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 hover:bg-[#1e293b] rounded text-[#94a3b8] hover:text-white"
            title={isRunning ? "Durdur" : "Başlat"}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetRobot}
            className="p-1 hover:bg-[#1e293b] rounded text-[#94a3b8] hover:text-white"
            title="Robotu Başlangıç Noktasına Sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. CANLI TUVAL (CANVAS) VE YAN MANUEL KONTROL PANELİ */}
      <div className="flex-1 flex overflow-hidden relative">
        <canvas
          ref={canvasRef}
          width={640}
          height={210}
          className="flex-1 w-full h-full block bg-[#0b0f19]"
        />

        {/* Sağ Alt Köşe: Manuel Teleop Kontrol Tuşları */}
        {!autoDrive && (
          <div className="absolute bottom-2 right-2 bg-[#0f172a]/90 backdrop-blur-md p-2 rounded-xl border border-[#334155] flex flex-col items-center gap-1 shadow-xl">
            <span className="text-[9px] text-[#94a3b8] font-bold">MANUEL TELEOP</span>
            <button
              onClick={() => driveManual(0.8, 0)}
              className="p-1.5 bg-[#1e293b] hover:bg-[#38bdf8] hover:text-black rounded-lg transition-colors"
              title="İleri"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => driveManual(0.3, -1.4)}
                className="p-1.5 bg-[#1e293b] hover:bg-[#38bdf8] hover:text-black rounded-lg transition-colors"
                title="Sola Dön"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => driveManual(0, 0)}
                className="px-2 py-1 bg-rose-500/20 text-rose-400 font-bold text-[10px] rounded-lg border border-rose-500/40"
                title="Fren"
              >
                DUR
              </button>
              <button
                onClick={() => driveManual(0.3, 1.4)}
                className="p-1.5 bg-[#1e293b] hover:bg-[#38bdf8] hover:text-black rounded-lg transition-colors"
                title="Sağa Dön"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={() => driveManual(-0.6, 0)}
              className="p-1.5 bg-[#1e293b] hover:bg-[#38bdf8] hover:text-black rounded-lg transition-colors"
              title="Geri"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Sol Alt Köşe: ROS 2 Topic Göstergesi */}
        <div className="absolute bottom-2 left-2 bg-[#0f172a]/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-[#1e293b] text-[10px] space-y-0.5 pointer-events-none">
          <div className="flex items-center gap-1.5 text-[#38bdf8]">
            <Zap className="w-3 h-3" />
            <span>Topic: /cmd_vel (v: {telemetry.speed}m/s)</span>
          </div>
          <div className="text-[#94a3b8]">
            Topic: /scan (360° Raycast Lidar @ 20Hz)
          </div>
        </div>
      </div>
    </div>
  );
}
