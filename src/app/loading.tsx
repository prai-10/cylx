export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-[#18224b] border-t-[#f8d613] rounded-full animate-spin" />
      <span className="text-xs font-mono tracking-widest text-[#9aaecf] uppercase">
        Loading Clyx...
      </span>
    </div>
  );
}
