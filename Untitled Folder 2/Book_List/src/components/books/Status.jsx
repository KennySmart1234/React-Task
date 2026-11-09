export const Loading = ({ text = "Loading…" }) => (
  <p role="status" className="py-16 text-center text-stone-500">{text}</p>
);

export const ErrorBox = ({ message, onRetry }) => (
  <div role="alert" className="my-8 rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-800">
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="mt-4 rounded-md bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 cursor-pointer">
        Try again
      </button>
    )}
  </div>
);
