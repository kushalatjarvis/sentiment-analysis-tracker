import { ImageCarousel } from "@/components/image-carousel";
import { SearchInput } from "@/components/search-input";

export default function Home() {
  return (
    <main className="py-12 ">
      {/* Hero */}
      <section className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 mt-16 text-center">
        <h1 className="text-4xl sm:text-7xl font-black sm:mt-2 mt-12">
          Sentiment Analysis Tracker
        </h1>

        <SearchInput />
      </section>
      <div className="mx-auto px-4">
        <ImageCarousel />
      </div>
    </main>
  );
}
