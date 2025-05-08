// app/errors/MissingToken/page.tsx
export default function MissingTokenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Token is missing</h1>
      <p className="text-lg">Please provide your API token in the environment variables.</p>
    </div>
  );
}
