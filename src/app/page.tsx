import { SearchInput } from "@/components/search-input";

export default function Home() {
  return (
    <main className="">
      {/* Hero */}
      <section className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 mt-24 text-center">
        <h1 className="text-6xl font-bold">Sentiment Analysis Tracker</h1>

        <SearchInput />
      </section>
    </main>
  );
}
