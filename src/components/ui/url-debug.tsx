import { useSearchParams } from "next/navigation";

interface URLDebugProps {
  show: boolean;
}

export function URLDebugInfo({ show }: URLDebugProps) {
  const searchParams = useSearchParams();

  if (!show) return null;

  const page = searchParams.get("page") || "1";
  const status = searchParams.get("status") || "all";

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white text-xs p-3 rounded-lg shadow-lg z-50">
      <div className="font-semibold mb-1">URL Debug Info:</div>
      <div>Page: {page}</div>
      <div>Status: {status}</div>
      <div className="mt-1 text-gray-300">
        URL:{" "}
        {typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : ""}
      </div>
    </div>
  );
}
