import { Button } from '@/components/ui/button';

const ErrorView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-4">Error</h2>
        <p className="text-lg mb-4">Something went wrong. Please try again.</p>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorView