export default function Loading({ size = "md", fullPage = false }) {
  const sizes = { sm: "h-4 w-4 border-2", md: "h-8 w-8 border-2", lg: "h-14 w-14 border-4" };

  const spinner = (
    <div className={`${sizes[size]} rounded-full border-slate-200 border-t-amber-500 animate-spin`} />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-60 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-10">{spinner}</div>;
}