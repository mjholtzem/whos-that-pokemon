import type { ReactNode } from "react";
import tvUrl from "../assets/tv.svg";
import CRTEffect from "vault66-crt-effect";
import "vault66-crt-effect/dist/vault66-crt-effect.css";

function TvContainer({ children }: { children: ReactNode }) {
  // Treat the import like a source path
  return (
    <div className="relative inline-block">
      <img src={tvUrl} alt="TV Frame" className="block"></img>
      <div className="bg-slate-500 rounded-[5%] overflow-hidden absolute align-left align-top w-[61.8%] h-[62.4%] top-[15.55%] left-[10.3%] @container">
        <CRTEffect preset={"minimal"}>
            <div className="w-[100cqw] h-[67cqw] flex justify-center items-center">
                {children}
            </div>
        </CRTEffect>
      </div>
    </div>
  );
}

export default TvContainer;
