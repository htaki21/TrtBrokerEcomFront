export default function StickyTest() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Spacer before sticky */}
      <div className="h-[800px] bg-yellow-100 flex items-center justify-center">
        <p className="text-xl">⬇️ Scroll down…</p>
      </div>

      {/* Sticky section */}
      <section className="relative bg-blue-100 min-h-[2000px] p-6">
        <div className="sticky top-0 bg-green-500 text-white font-bold p-6 shadow-lg">
          🌱 I am sticky (top-0)
        </div>
        <div className="mt-6 space-y-6">
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. (line{" "}
              {i + 1})
            </p>
          ))}
        </div>
      </section>

      {/* Spacer after sticky */}
      <div className="h-[800px] bg-pink-100 flex items-center justify-center">
        <p className="text-xl">End of page ✅</p>
      </div>
    </main>
  );
}
