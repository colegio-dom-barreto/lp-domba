export default function ChevronBanner({
  left,
  right,
  colorLeft,
  colorRight,
}: {
  left: string;
  right: string;
  colorLeft: "red" | "navy";
  colorRight: "gold" | "skyblue";
}) {
  const leftBg = colorLeft === "red" ? "bg-red" : "bg-navy";
  const rightBg = colorRight === "gold" ? "bg-gold" : "bg-skyblue";
  const rightText = colorRight === "gold" ? "text-navy" : "text-white";

  return (
    <div className="flex w-full text-sm font-semibold uppercase tracking-wide sm:text-base">
      <div
        className={`${leftBg} relative flex-1 py-3 pl-4 pr-6 text-white sm:pl-8`}
       
      >
        {left}
      </div>
      <div className={`${rightBg} ${rightText} flex-1 py-3 pl-6 pr-4 sm:pr-8`}>
        {right}
      </div>
    </div>
  );
}// style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)" }}
