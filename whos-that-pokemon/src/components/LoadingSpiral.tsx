import { LoaderCircle } from "lucide-react";

function LoadingSpiral({size}: {size: number}) {
    return <div className="animate-spin">
        <LoaderCircle className="animate-[fadeIn_.25s_ease-in-out]" size={64}/>
    </div>
}

export default LoadingSpiral;
