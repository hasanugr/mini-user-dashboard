export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-slate-900">Loading...</p>
          <p className="text-sm text-slate-500">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    </div>
  );
}
