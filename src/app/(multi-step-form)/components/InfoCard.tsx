import infoSvg from "@/lib/svg/infoSvg";

interface InfoCardProps {
  text: string;
  className?: string;
  bgColor?: string;
  textOpacity?: string;
}

function IconsFilled({ opacity }: { opacity?: string }) {
  if (opacity) {
    // SVG with 50% opacity - using rgba with 0.5 alpha
    return (
      <div className="relative shrink-0 size-7" data-name="Icons Filled">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g id="Icons Filled">
            <path d={infoSvg.p10937d00} fill="rgba(226, 239, 206, 0.5)" id="Vector" />
          </g>
        </svg>
      </div>
    );
  }
  
  // Default SVG with full opacity
  return (
    <div className="relative shrink-0 size-7" data-name="Icons Filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icons Filled">
          <path d={infoSvg.p10937d00} fill="var(--fill-0, #E2EFCE)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function InfoCard({ text, className = "", bgColor, textOpacity }: InfoCardProps) {
  return (
    <div className={`${bgColor || 'bg-[rgba(93,93,93,0.25)]'} relative rounded-2xl size-full shadow-lg ${className}`}>
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start overflow-clip p-[12px] relative size-full">
          <IconsFilled opacity={textOpacity} />
          <div className={`Button-M relative shrink-0 text-white text-nowrap ${textOpacity || ''}`}>
            <p className="whitespace-pre">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
