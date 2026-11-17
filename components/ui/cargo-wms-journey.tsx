"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Package, Ship, Warehouse, Receipt, ShieldCheck, Truck } from "lucide-react";

const STEPS = [
  { title: "Plan arrivals", icon: Ship, description: "Register manifests before arrival and give operations and sales the same expected-cargo view.", items: ["Excel or manual manifests, up to three months ahead", "Expected versus arrived cargo", "Manifest lines linked to receipt"] },
  { title: "Receive & destuff", icon: Package, description: "Work from the manifest, record exceptions, and prioritise containers that need attention.", items: ["Inbound records and inspection notes", "Destuffing priorities and completion tracking", "Damage photos with expiring share links"] },
  { title: "Locate & track", icon: Warehouse, description: "Keep location and movement history alongside each cargo record.", items: ["Zones, racks, and capacity allocation", "Putaway print sheets with blank location fields", "Cargo tracking and warehouse utilisation"] },
  { title: "Calculate charges", icon: Receipt, description: "Explain each bill using the selected tariff version, period, and charge inputs.", items: ["Storage, handling, destuffing, and overstay tariffs", "Configured free days and charge review", "Discount approvals and unreleased-only conditional charges"] },
  { title: "Approve release", icon: ShieldCheck, description: "Make the release requirements visible before goods leave the warehouse.", items: ["Customer appointment tokens after destuffing", "Original BL and payment collection gates", "Receiver ID details and handover signature"] },
  { title: "Handover & report", icon: Truck, description: "Close the operation with documents, a movement trail, and the reports each role needs.", items: ["Delivery notes, passes, labels, and packing records", "Customer tracking and secure document access", "Filtered PDF/Excel reports, notifications, and audit history"] },
];

export default function CargoWmsJourney() {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const step = STEPS[active];
  const Icon = step.icon;
  const onKeys = (event: KeyboardEvent<HTMLElement>) => {
    const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (active + 1) % STEPS.length
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (active + STEPS.length - 1) % STEPS.length
      : event.key === "Home" ? 0 : event.key === "End" ? STEPS.length - 1 : null;
    if (next === null) return;
    event.preventDefault(); setActive(next); buttons.current[next]?.focus();
  };
  return <div className="cargo-stage-explorer">
    <div className="cargo-stage-navigation">
      <nav role="tablist" aria-label="Warehouse lifecycle stages" className="cargo-stage-tabs" onKeyDown={onKeys}>
        {STEPS.map((item, index) => <button key={item.title} ref={el => { buttons.current[index] = el; }} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)}>
          <div className="cargo-stage-tab-top"><item.icon aria-hidden="true" /><span>0{index + 1}</span></div><span className="cargo-stage-tab-title">{item.title}</span>
        </button>)}
      </nav>
      <p className="cargo-stage-nav-note">Six handoffs. One operational record.</p>
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="cargo-stage-panel">
      <div className="cargo-stage-panel-meta"><span><Icon aria-hidden="true" />Proposed Workflow</span><span>0{active + 1} / 06</span></div>
      <div key={active} className="cargo-stage-content">
        <h3>{step.title}</h3><p>{step.description}</p>
        <ul>{step.items.map(item => <li key={item}><span><Check aria-hidden="true" /></span>{item}</li>)}</ul>
      </div>
      <div className="cargo-stage-footer">
        <button type="button" disabled={active === 0} onClick={() => setActive(value => value - 1)} aria-label="Previous warehouse stage" className="cargo-stage-previous"><ArrowLeft aria-hidden="true" /></button>
        <button type="button" onClick={() => setActive(value => (value + 1) % STEPS.length)} className="cargo-stage-next">{active === 5 ? "Back to arrivals" : "Next operational step"}<ArrowRight aria-hidden="true" /></button>
      </div>
      <div className="cargo-stage-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / STEPS.length})` }} /></div>
    </div>
  </div>;
}
