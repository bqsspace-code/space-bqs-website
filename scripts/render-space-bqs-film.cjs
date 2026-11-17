/** Render the BQS editorial film from supplied footage, an app capture, and original graphics.
 * Run: node scripts/render-space-bqs-film.cjs
 * Requires FFmpeg on PATH; sharp is supplied by this Next.js installation.
 * Outputs are deliberately not overwritten. */
const { spawnSync } = require('node:child_process');
const { mkdtempSync } = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'public/assets/videos');
const temporary = mkdtempSync(path.join(os.tmpdir(), 'opencode', 'bqs-film-'));

const backdrop = `<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#06152b"/><stop offset=".65" stop-color="#0b3a58"/><stop offset="1" stop-color="#13506b"/></linearGradient></defs><rect width="960" height="540" fill="url(#bg)"/><g fill="none" stroke="#8bdce8" stroke-opacity=".14"><path d="M-80 430C200 200 350 600 640 330S890 160 1080 230"/><path d="M-80 445C200 215 350 615 640 345S890 175 1080 245"/><path d="M-80 460C200 230 350 630 640 360S890 190 1080 260"/></g>`;
const calculation = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><g font-family="Arial, sans-serif">${backdrop}
<g transform="rotate(-4 560 300)"><rect x="370" y="140" width="380" height="300" rx="20" fill="#eef7fc" stroke="#d4e9f5"/><rect x="370" y="140" width="380" height="42" rx="20" fill="#d5eaf5"/><circle cx="391" cy="160" r="4" fill="#6c9dbb"/><circle cx="405" cy="160" r="4" fill="#6c9dbb"/><circle cx="419" cy="160" r="4" fill="#6c9dbb"/>
<text x="394" y="214" font-size="12" letter-spacing="1.2" fill="#456a85">SPACE BQS / CALCULATION</text><text x="394" y="249" font-size="23" font-weight="700" fill="#031038">The working stays visible.</text>
<g font-size="14" fill="#31516d"><text x="414" y="292">Tank readings</text><text x="414" y="331">Correction factors</text><text x="414" y="370">Calculated quantity</text></g>
<g fill="#19b5c9"><circle cx="397" cy="287" r="5"/><circle cx="397" cy="326" r="5"/><circle cx="397" cy="365" r="5"/></g><g stroke="#cadfe9"><path d="M394 305H718"/><path d="M394 344H718"/></g><text x="394" y="413" font-size="9" fill="#657e92" letter-spacing=".8">ILLUSTRATIVE WORKFLOW / APP CAPTURE AT RIGHT</text></g>
<rect x="690" y="50" width="224" height="480" rx="28" fill="#102337" stroke="#adc9db" stroke-width="2"/><rect x="698" y="60" width="208" height="456" rx="20" fill="#e9f7ff"/>
</g></svg>`;
const proof = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><g font-family="Arial, sans-serif">${backdrop}
<g transform="rotate(7 610 340)"><rect x="425" y="185" width="360" height="290" rx="16" fill="#d1e9e5" stroke="#dff7f3"/><text x="450" y="222" font-size="12" font-weight="700" fill="#1d625e">AUDIT WORKBOOK / 4 SHEETS</text><rect x="450" y="245" width="310" height="168" rx="5" fill="#f7fcfb"/><g stroke="#b5d6d2"><path d="M450 278H760M450 312H760M450 346H760M450 380H760"/><path d="M528 245V413M605 245V413M682 245V413"/></g><text x="450" y="449" font-size="11" fill="#326d6a">Readings · Factors · Totals · Audit detail</text></g>
<g transform="rotate(-5 722 265)"><rect x="565" y="36" width="320" height="462" rx="13" fill="#f8fcff" stroke="#fff"/><path d="M590 72q12-8 24 0t24 0M590 80q12-8 24 0t24 0" fill="none" stroke="#032aac" stroke-width="2"/><text x="650" y="81" font-size="17" font-weight="700" fill="#032aac">Space BQS</text><path d="M590 105H860" stroke="#cbdeec"/><text x="590" y="145" font-size="23" font-weight="700" fill="#031038">Quantity certificate</text><text x="590" y="169" font-size="10" fill="#698096" letter-spacing="1">ILLUSTRATIVE DOCUMENT</text>
<g stroke="#d1e2ee"><path d="M590 202H838M590 218H802M590 234H824"/><path d="M590 332H838M590 348H810M590 364H830"/></g><rect x="590" y="259" width="270" height="49" rx="8" fill="#e6f2fb"/><text x="608" y="289" font-size="16" font-weight="700" fill="#032aac">Reviewed. Locked. Ready to share.</text>
<rect x="741" y="390" width="118" height="39" rx="7" fill="#e9f9f4" stroke="#4ba997"/><text x="758" y="415" font-size="14" font-weight="700" fill="#167768">FINALISED</text><path d="M590 451H860" stroke="#cbdeec"/><text x="590" y="476" font-size="10" fill="#698096">PDF certificate + supporting Excel workbook</text></g>
</g></svg>`;

function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-n', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`FFmpeg failed (${result.status})`);
}

(async () => {
  const calculatePng = path.join(temporary, 'calculate.png');
  const proofPng = path.join(temporary, 'proof.png');
  const phone = await sharp(path.join(root, 'public/assets/mobile_image/WhatsApp Image 2026-10-09 at 11.09.07 PM (8).jpeg')).resize(392, 872).toBuffer();
  await sharp(Buffer.from(calculation), { density: 144 }).composite([{ input: phone, left: 1408, top: 136 }]).png().toFile(calculatePng);
  await sharp(Buffer.from(proof), { density: 144 }).png().toFile(proofPng);
  const scenes = [0, 1, 2, 3].map(i => path.join(temporary, `scene-${i}.mp4`));
  const encode = ['-c:v', 'libx264', '-preset', 'fast', '-crf', '19', '-pix_fmt', 'yuv420p', '-an'];
  const photoFilter = 'crop=1664:936:0:0,scale=960:540,minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,tpad=stop_mode=clone:stop_duration=0.1';
  ffmpeg(['-ss', '0.5', '-i', path.join(assets, 'Drone_flying_over_oil_tanker_1080p_20261027163505.mp4'), '-t', '4', '-vf', photoFilter, ...encode, scenes[0]]);
  ffmpeg(['-ss', '0.6', '-i', path.join(assets, 'bqs-app-beingused.mp4'), '-t', '4', '-vf', photoFilter, ...encode, scenes[1]]);
  for (const [index, source] of [[2, calculatePng], [3, proofPng]]) {
    ffmpeg(['-i', source, '-vf', "zoompan=z='1.015+on*0.00015':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=240:s=960x540:fps=60", '-t', '4', ...encode, scenes[index]]);
  }
  const output = path.join(assets, 'space-bqs-survey-journey.mp4');
  ffmpeg([...scenes.flatMap(scene => ['-i', scene]), '-filter_complex', '[0:v][1:v]xfade=transition=fade:duration=0.5:offset=3.5[a];[a][2:v]xfade=transition=fade:duration=0.5:offset=7[b];[b][3:v]xfade=transition=fade:duration=0.5:offset=10.5[out]', '-map', '[out]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-g', '1', '-keyint_min', '1', '-bf', '0', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', output]);
  for (const [index, time] of [1, 5, 9, 13].entries()) {
    ffmpeg(['-ss', String(time), '-i', output, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '88', path.join(assets, `space-bqs-survey-0${index + 1}.webp`)]);
  }
  console.log('Created the BQS survey film and four chapter posters.');
})().catch(error => { console.error(error); process.exitCode = 1; });
