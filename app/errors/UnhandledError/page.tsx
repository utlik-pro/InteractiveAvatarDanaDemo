// app/errors/UnhandledError/page.tsx
export default function UnhandledErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">Something went wrong</h1>
      <p className="text-lg">An unexpected error occurred. Please try again later or contact support.</p>
    </div>
  );
}
