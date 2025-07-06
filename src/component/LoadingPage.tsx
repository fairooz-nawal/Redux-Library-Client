

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Text */}
      <h2 className="text-2xl font-semibold animate-fadeIn">Loading, please wait...</h2>
    </div>
  );
};

export default LoadingPage;
