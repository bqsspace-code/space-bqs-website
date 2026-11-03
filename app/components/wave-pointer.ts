/** Attach only to visible waves on fine-pointer devices. Idle waves do no JS work. */
export function attachWavePointer(element: HTMLElement, curve: string, flip: boolean) {
  const layers = Array.from(element.querySelectorAll<SVGSVGElement>(".wave-transition-layer"));
  const fills = layers.map(layer => layer.querySelector<SVGPathElement>("path")!);
  const foam = element.querySelector<SVGPathElement>(".wave-transition-foam");
  const geometry = document.createElementNS("http://www.w3.org/2000/svg", "path");
  geometry.setAttribute("d", curve);
  const length = geometry.getTotalLength();
  const points = Array.from({ length: 73 }, (_, i) => {
    const point = geometry.getPointAtLength(length * i / 72);
    return { x: point.x, y: point.y };
  });
  let frame = 0;
  let previousTime = 0;
  let pointer: { x: number; y: number } | null = null;
  let center = 0;
  let strength = 0;
  let deformed = false;

  const restore = () => {
    if (!deformed) return;
    fills.forEach(fill => fill.setAttribute("d", `${curve} L1520 160 L-80 160 Z`));
    foam?.setAttribute("d", curve);
    element.removeAttribute("data-interacting");
    deformed = false;
  };

  const tick = (now: number) => {
    frame = 0;
    const dt = Math.min(now - (previousTime || now - 16), 40);
    previousTime = now;
    // Batch geometry reads before any path writes.
    const bounds = element.getBoundingClientRect();
    const distance = pointer ? Math.abs(pointer.y - (bounds.top + bounds.height * .5)) : Infinity;
    const target = Math.max(0, 1 - distance / (bounds.height * .5 + 120));
    const rects = layers.map(layer => layer.getBoundingClientRect());
    strength += (target - strength) * (1 - Math.exp(-dt / 95));
    if (pointer) center += (pointer.x - center) * (1 - Math.exp(-dt / 75));

    if (strength < .003 && target === 0) {
      strength = 0;
      previousTime = 0;
      restore();
      return;
    }

    rects.forEach((rect, index) => {
      if (!rect.width) return;
      const x = (flip ? rect.right - center : center - rect.left) / rect.width * 1440;
      const radius = Math.max(90, Math.min(210, 170 / rect.width * 1440));
      const amplitude = strength * [17, 23, 29][index];
      // A local swell and softer trough follow the pointer, leaving distant water untouched.
      const displaced = points.map(point => {
        const delta = (point.x - x) / radius;
        const swell = Math.exp(-delta * delta * .5);
        const shoulder = Math.exp(-((Math.abs(delta) - 2) ** 2) * 1.8) * .14;
        return { x: point.x, y: point.y - Math.min(amplitude * swell, Math.max(0, point.y - 23)) + amplitude * shoulder };
      });
      let path = `M${displaced[0].x.toFixed(1)} ${displaced[0].y.toFixed(1)}`;
      for (let i = 1; i < displaced.length - 1; i++) {
        const a = displaced[i];
        const b = displaced[i + 1];
        path += ` Q${a.x.toFixed(1)} ${a.y.toFixed(1)} ${((a.x + b.x) / 2).toFixed(1)} ${((a.y + b.y) / 2).toFixed(1)}`;
      }
      const end = displaced[displaced.length - 1];
      path += ` T${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
      fills[index].setAttribute("d", `${path} L1520 160 L-80 160 Z`);
      if (index === 2) foam?.setAttribute("d", path);
    });
    deformed = true;
    element.dataset.interacting = "true";
    frame = requestAnimationFrame(tick);
  };

  const schedule = () => { if (!frame) frame = requestAnimationFrame(tick); };
  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    if (!pointer && !strength) center = event.clientX;
    pointer = { x: event.clientX, y: event.clientY };
    schedule();
  };
  const release = () => {
    pointer = null;
    if (strength) schedule();
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("scroll", release, { passive: true });
  window.addEventListener("blur", release);
  document.addEventListener("pointerleave", release);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", release);
    window.removeEventListener("blur", release);
    document.removeEventListener("pointerleave", release);
    restore();
  };
}
