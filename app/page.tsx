"use client";

import { useState } from "react";
import type { PackageResponse } from "@/types/package";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<PackageResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchPackage() {
    setLoading(true);
    setError("");

    const response = await fetch(`/api/packages/search?q=${query}`);

    const data = await response.json();

    if (!response.ok) {
      setResult(null);
      setError(data.error);
      setLoading(false);
      return;
    }

    setResult(data);
    setLoading(false);
  }

  return (
    <main>
      <h1>Package Search</h1>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search package..."
      />

      <button onClick={searchPackage}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {result && (
        <div>
          <h2>{result.name}</h2>

          <p>{result.description}</p>

          <p>Latest Version: {result.versions[0]?.version ?? "Unknown"}</p>
        </div>
      )}
    </main>
  );
}
