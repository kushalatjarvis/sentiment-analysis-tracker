"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LOCATION_SUGGESTIONS } from "@/data";
import { ILocationSuggestion } from "@/types";
import Image from "next/image";
import { Search } from "lucide-react";

export const SearchInput = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [search, setSearch] = useState<string>("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ILocationSuggestion[]>();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch((e.target as HTMLInputElement).value);
    setIsSuggestionsOpen(true);
  };

  useEffect(() => {
    if (search.length > 2) {
      setIsSuggestionsOpen(true);
      if (search.toLowerCase().startsWith("uni")) {
        timerRef.current = setTimeout(() => {
          setSuggestions(
            LOCATION_SUGGESTIONS as unknown as ILocationSuggestion[]
          );
        }, 1000);
      }
    } else {
      setIsSuggestionsOpen(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        setSuggestions([]);
      }
    };
  }, [search]);

  console.log(suggestions);

  return (
    <form
      onSubmit={handleSearch}
      className="w-full my-4 flex items-center justify-center gap-4 my-container"
    >
      <div className="flex items-center justify-center gap-4 w-full relative">
        <Search
          className="absolute left-4 max-sm:text-base text-gray-400"
          size={24}
        />

        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-black rounded-full p-4 pl-12"
          type="text"
          placeholder="Places to go, experiences to have..."
        />
        {suggestions && suggestions?.length > 0 ? null : (
          <Button
            className="absolute right-2 rounded-full p-6 text-black font-semibold"
            type="submit"
          >
            Search
          </Button>
        )}

        {/* Suggestions  */}
        {isSuggestionsOpen && (
          <ul className="absolute top-18 left-0 w-full bg-white rounded-lg border-2 border-black min-h-16 z-50">
            {suggestions && suggestions?.length > 0 ? (
              suggestions?.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="w-full flex flex-col items-start text-left"
                >
                  <Link
                    href={`/${suggestion.slug}`}
                    className="w-full py-4 hover:bg-gray-100 cursor-pointer px-4 flex items-center justify-start gap-4"
                  >
                    {suggestion.image && (
                      <Image
                        onError={(e) => {
                          e.currentTarget.src = "/location/none.jpg";
                        }}
                        src={suggestion.image?.[0] || ""}
                        alt={`${suggestion.name} image`}
                        className="size-20 rounded-sm aspect-square object-cover bg-gray-100 border shadow-sm"
                        width={100}
                        height={100}
                      />
                    )}
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-lg font-bold">{suggestion.name}</p>
                      <p className="text-sm text-gray-800">
                        {suggestion.city}, {suggestion.country}
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-lg text-left p-4">searching...</p>
            )}
          </ul>
        )}
      </div>
    </form>
  );
};
