import VideoSchema from "./VideoSchema";

const VIDEO_ID = "Ujdoubsh9ws";
const VIDEO_TITLE = "Space WMS – Smart Warehouse Management System | Dashboard & Features Overview";

export default function WmsVideoSection({ pagePath = "/solutions/cargo-wms" }: { pagePath?: string }) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}`;

  return (
    <section
      id="space-wms-video"
      aria-labelledby="space-wms-video-title"
      className="bg-gradient-to-br from-[#f7fbfd] via-[#edf7fc] to-[#e2edff] px-6 py-16 sm:py-20 lg:py-24"
    >
      <VideoSchema
        pagePath={pagePath}
        id="space-wms-overview"
        name={VIDEO_TITLE}
        description="A video overview of Space WMS, a warehouse management system, featuring its dashboard and product features."
        thumbnailUrl={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
        embedUrl={embedUrl}
        duration="PT3M9S"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#032aac]">Space WMS · Video overview</p>
          <h2 id="space-wms-video-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-[#031038] sm:text-4xl">
            See the Space WMS dashboard and features
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#52657c] sm:text-base">
            Watch the Space WMS warehouse management system overview, then discuss how a WMS implementation could fit your operation.
          </p>
        </div>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#d3e9f3] bg-[#031038] shadow-[0_24px_60px_-20px_rgba(3,16,56,0.3)]">
          <iframe
            className="aspect-video w-full"
            src={embedUrl}
            title={VIDEO_TITLE}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-center text-xs text-[#60748a]">
          Video hosted on YouTube. <a className="font-semibold text-[#032aac] underline" href={`https://youtu.be/${VIDEO_ID}`} target="_blank" rel="noreferrer">Watch on YouTube</a>
        </p>
      </div>
    </section>
  );
}
