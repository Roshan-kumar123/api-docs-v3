"use client";
import React from "react";
import { APIExplorer } from "@/components/APIExplorer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-start mb-8">
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Discover Our API that suits you best
          </h1>
        </header>
        <main>
          <APIExplorer />
        </main>
      </div>
    </div>
  );
}
