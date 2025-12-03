export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-chip text-card hover:bg-chip/80 font-light">
      {children}
    </div>
  );
};
