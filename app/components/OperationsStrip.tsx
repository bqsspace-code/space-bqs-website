import Link from "next/link";
import styles from "./OperationsStrip.module.css";

const stations = [
  { title: "Local data hosting", text: "Need survey records to stay in a specific region? Confirm hosting and data residency options before rollout.", href: "/services/deployment" },
  { title: "On-premises setup", text: "Prefer your own servers? Review network, access and backup requirements with our deployment team.", href: "/services/deployment" },
  { title: "24/7 support enquiries", text: "Send a support request any time, from sea or shore. Ask our team about coverage and response times for your rollout.", href: "/contact" },
  { title: "Security & audit", text: "Review how Space BQS handles survey records and reports, and ask for the access controls your team needs to verify.", href: "/security-audit" },
];

function Scene({ index }: { index: number }) {
  return <svg className={styles.scene} viewBox="0 0 144 88" fill="none" stroke="#163d60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="72" cy="47" rx="54" ry="31" fill="#e9f6fa" stroke="none" />
    {index === 0 && <>
      <path d="M18 62h108M26 68h31m8 0h16" stroke="#9ccfd9" />
      {[24, 38, 52].map(y => <g key={y}><rect x="50" y={y} width="44" height="12" rx="3" fill="white" /><path d={`M57 ${y + 6}h13`} /><circle cx="86" cy={y + 6} r="2" fill="#15a5b3" stroke="none" /></g>)}
      <g className={styles.pin}><path d="M106 32s-9-9-9-15a9 9 0 1 1 18 0c0 6-9 15-9 15Z" fill="#126a96" /><circle cx="106" cy="17" r="3" fill="white" stroke="none" /></g>
    </>}
    {index === 1 && <>
      <path d="M21 64h101M36 60V39l19-12 19 12v21Z" fill="white" />
      <path d="M34 39l21-14 22 14M43 43h8v8h-8zM59 60V46h8v14" />
      <rect x="86" y="26" width="19" height="30" rx="3" fill="#caeaf0" /><path d="M91 33h9m-9 6h9m-9 6h9"/>
      <path className={styles.cable} d="M68 61h22q6 0 6-5" stroke="#098997" strokeWidth="3" />
    </>}
    {index === 2 && <>
      <path d="M21 65q7-4 14 0t14 0t14 0t14 0t14 0t14 0t14 0" stroke="#58aebe" />
      <g className={styles.boat}><path d="M22 51h49l-10 10H32Z" fill="#176887"/><path d="M33 51l4-12h16l6 12Z" fill="white"/><path d="M46 39V28m-5 15h7" /></g>
      <path d="M90 61l3-27h10l4 27Zm0-28h16l-8-8Zm5 8h6" fill="white" />
      <g className={styles.signal} stroke="#0994a5"><path d="M55 27q8 1 9 9m-8-16q13 2 15 15m-14-22q20 2 22 21" /></g>
    </>}
    {index === 3 && <>
      <path d="M40 22h43l10 11v32H40Z" fill="white"/><path d="M82 23v11h10M48 35h20m-20 9h24m-24 9h17" stroke="#72a6b7"/>
      <path d="M90 36q9 6 18 6v10q0 12-18 20-17-8-17-20V42q9 0 17-6Z" fill="#146680"/>
      <path className={styles.check} d="m81 53 6 6 12-14" stroke="white" strokeWidth="3"/>
    </>}
  </svg>;
}

export default function OperationsStrip() {
  return <section className={styles.section} aria-labelledby="operations-heading">
    <div>
      <h2 id="operations-heading" className="font-display text-2xl font-bold tracking-tight text-[#031038] sm:text-3xl">Hosting, support &amp; security</h2>
      <div className={styles.grid}>{stations.map((station, index) =>
        <Link className={styles.station} href={station.href} key={station.title}>
          <Scene index={index} />
          <div><h3>{station.title}</h3><p>{station.text}</p></div>
        </Link>
      )}</div>
    </div>
  </section>;
}
