import { useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface TimeDisplay {
  h: number;
  m: number;
  s: number;
  cs: number;
}

interface Lap {
  n: number;
  t: string;
}

const Stopwatch = () => {
  const [display, setDisplay] = useState<TimeDisplay>({ h: 0, m: 0, s: 0, cs: 0 });
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");
  const [laps, setLaps] = useState<Lap[]>([]);  // ✅ typed — was inferred as never[]

  // ✅ useRef typed as number | undefined — setInterval returns number in the browser
  const timerRef   = useRef<number | undefined>(undefined);
  const startRef   = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  // ✅ explicit parameter types — were implicitly any
  function pad(n: number): string {
    return String(Math.floor(n)).padStart(2, "0");
  }

  function msToTime(ms: number): TimeDisplay {
    const totalSec = Math.floor(ms / 1000);
    return {
      h:  Math.floor(totalSec / 3600),
      m:  Math.floor((totalSec % 3600) / 60),
      s:  totalSec % 60,
      cs: Math.floor((ms % 1000) / 10),
    };
  }

  function handleStart() {
    if (status === "running") return;

    startRef.current = Date.now() - elapsedRef.current;
    // ✅ setInterval returns number in browser — no longer typed as null
    timerRef.current = setInterval(() => {
      elapsedRef.current = Date.now() - startRef.current;
      setDisplay(msToTime(elapsedRef.current));
    }, 16);

    setStatus("running");
  }

  function handlePause() {
    if (status !== "running") return;
    // ✅ clearInterval accepts number | undefined — no null mismatch
    clearInterval(timerRef.current);
    timerRef.current   = undefined;
    elapsedRef.current = Date.now() - startRef.current;
    setStatus("paused");
  }

  function handleReset() {
    clearInterval(timerRef.current);
    timerRef.current   = undefined;
    startRef.current   = 0;
    elapsedRef.current = 0;
    setDisplay({ h: 0, m: 0, s: 0, cs: 0 });
    setStatus("idle");
    setLaps([]);
  }

  function handleLap() {
    if (status !== "running") return;
    const { h, m, s, cs } = msToTime(elapsedRef.current);
    const timeStr =
      (h > 0 ? pad(h) + ":" : "") + pad(m) + ":" + pad(s) + "." + pad(cs);
    // ✅ prev is now correctly inferred as Lap[] — no more never[]
    setLaps((prev) => [{ n: prev.length + 1, t: timeStr }, ...prev]);
  }

  const timeStr =
    (display.h > 0 ? pad(display.h) + ":" : "") +
    pad(display.m) + ":" +
    pad(display.s);

  return (
    <div style={{ fontFamily: "monospace", textAlign: "center", padding: "2rem" }}>
      <h2 style={{ fontSize: "3rem", letterSpacing: "0.05em", margin: 0 }}>
        {timeStr}
        <span style={{ fontSize: "1.5rem", opacity: 0.5 }}>.{pad(display.cs)}</span>
      </h2>

      <p style={{ textTransform: "uppercase", fontSize: "0.75rem", opacity: 0.5 }}>
        {status}
      </p>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", margin: "1rem 0" }}>
        <button onClick={handleStart} disabled={status === "running"}>
          {status === "paused" ? "Resume" : "Start"}
        </button>
        <button onClick={handlePause} disabled={status !== "running"}>Pause</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap}   disabled={status !== "running"}>Lap</button>
      </div>

      {laps.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, maxHeight: 200, overflowY: "auto" }}>
          {laps.map((lap) => (
            // ✅ lap.n and lap.t exist now that Lap[] is the inferred type
            <li
              key={lap.n}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 1rem",
                fontSize: "0.85rem",
                opacity: 0.75,
              }}
            >
              <span>Lap {lap.n}</span>
              <span>{lap.t}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stopwatch;