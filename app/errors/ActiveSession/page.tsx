// app/errors/ActiveSession/page.tsx
export default function ActiveSessionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-yellow-600">Session already active</h1>
      <p className="text-lg">You already have an active avatar session. Please refresh or restart the session.</p>
    </div>
  );
}
