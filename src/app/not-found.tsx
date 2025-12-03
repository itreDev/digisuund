import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-bold">404 - Lehekülge ei leitud</h1>
      <Link
        href="/"
        className="text-primary px-4 py-2 rounded-md w-36 h-10 text-sm flex items-center justify-center"
      >
        Tagasi avalehele
      </Link>
    </div>
  );
}
