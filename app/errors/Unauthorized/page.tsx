// app/errors/Unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Unauthorized</h1>
      <p className="text-lg">Invalid or expired API token. Please check your credentials and try again.</p>
    </div>
  );
}
