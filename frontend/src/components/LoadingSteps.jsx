function LoadingSteps() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

      <h3 className="text-lg font-semibold mb-4">
        Processing Documents
      </h3>

      <div className="space-y-3">

        <div className="flex items-center gap-2">
          <span>✅</span>
          <span>Uploading Documents</span>
        </div>

        <div className="flex items-center gap-2">
          <span>✅</span>
          <span>Extracting Text</span>
        </div>

        <div className="flex items-center gap-2">
          <span>⏳</span>
          <span>Analyzing Travel Data</span>
        </div>

        <div className="flex items-center gap-2">
          <span>🤖</span>
          <span>Generating AI Itinerary</span>
        </div>

      </div>

    </div>
  );
}

export default LoadingSteps;