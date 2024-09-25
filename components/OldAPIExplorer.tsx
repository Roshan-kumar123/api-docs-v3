"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for navigation
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APICard } from "@/components/APICard";
import { APICardSkeleton } from "@/components/APICardSkeleton";

export interface APIParameter {
  in: string;
  name: string;
  schema: { type: string };
  required: boolean;
  description: string;
  example: string;
}

// interface APIResponse {
//   statusCode: number;
//   description: string;
// }

interface ResponseProperty {
  type: string;
  description?: string;
  example?: any;
}

interface ResponseSchema {
  type: string;
  properties: {
    [key: string]: ResponseProperty;
  };
}

interface ResponseContent {
  [mediaType: string]: {
    schema: ResponseSchema;
  };
}

interface APIResponse {
  description: string;
  content?: ResponseContent;
}

export interface RequestBodyProperty {
  type: string;
  description?: string;
  example?: any;
  enum?: string[];
}

interface RequestBodySchema {
  type: string;
  properties: {
    [key: string]: RequestBodyProperty;
  };
}

interface RequestBodyContent {
  "application/json": {
    schema: RequestBodySchema;
  };
}

export interface APIData {
  id: number;
  name: string;
  path: string;
  description: string;
  method: string;
  parameters: APIParameter[];
  responses: APIResponse[];
  requestBody?: {
    required: boolean;
    content: RequestBodyContent;
  };
  tags: any[];
  category: string; // Added category
  subscribed: number; // Added subscribed
  latency: string | number | null; // Added latency
  createdAt: string; // Added createdAt
  summary: any;
  security: any;
}

export function APIExplorer() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name A-Z");
  const [jsonData, setJsonData] = useState<APIData[]>([]);

  useEffect(() => {
    const fetchOpenAPIData = async () => {
      try {
        const response = await fetch("/data/dummy-data.json");
        if (!response.ok) throw new Error("Failed to fetch JSON data");

        const data = await response.json();
        console.log("data-------------", data);

        const transformedData = transformOpenAPIData(data);
        setJsonData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading JSON file:", error);
        setLoading(false);
      }
    };

    fetchOpenAPIData();
  }, []);

  const transformOpenAPIData = (data: any): APIData[] => {
    const paths = data.paths;
    const apis: APIData[] = [];
    let idCounter = 1;

    for (const path in paths) {
      for (const method in paths[path]) {
        const endpoint = paths[path][method];
        const parameters =
          endpoint.parameters?.map((param: any) => ({
            name: param.name,
            in: param.in,
            description: param.description,
            example: param.example,
          })) || [];

        const responses = Object.keys(endpoint.responses).map((statusCode) => ({
          statusCode: parseInt(statusCode),
          description: endpoint.responses[statusCode].description,
        }));

        // Transform security to match expected type
        const security =
          endpoint.security?.map((sec: any) => ({
            bearerAuth: sec.bearerAuth || [], // Adjust according to actual structure
          })) || [];

        apis.push({
          id: endpoint.id || idCounter++,
          name: endpoint.summary || "Unnamed API",
          path: path,
          description: endpoint.description || "No description available",
          method: method.toUpperCase(),
          parameters: parameters,
          responses: responses,
          tags: endpoint.tags || [],
          summary: endpoint.summary || "No summary available",
          security: security,
          category: "",
          subscribed: 0,
          latency: null,
          createdAt: "",
        });
      }
    }

    return apis;
  };

  const filteredApis = jsonData.filter((api) =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedApis = [...filteredApis].sort((a, b) => {
    switch (sortBy) {
      case "Name A-Z":
        return a.name.localeCompare(b.name);
      case "Name Z-A":
        return b.name.localeCompare(a.name);
      case "Serial Number":
        return a.id - b.id; // Sort by serial number (id) in ascending order
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <Input
          type="text"
          placeholder="What API are you looking for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow md:max-w-md"
        />
        <Select onValueChange={setSortBy} defaultValue="Name A-Z">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue>{sortBy}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Name A-Z">Name A-Z</SelectItem>
            <SelectItem value="Name Z-A">Name Z-A</SelectItem>
            <SelectItem value="Serial Number">By Id</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => <APICardSkeleton key={index} />)
          : sortedApis.map((api) => (
              // <Link
              //   key={api.id}
              //   href={`/api/${api.id}`}
              //   className="transition-transform hover:scale-[1.02]"
              // >
              //   <APICard api={api as APIData} />
              // </Link>

              <APICard api={api as APIData} />
            ))}
      </div>
      {!loading && sortedApis.length === 0 && (
        <p className="text-center text-muted-foreground mt-12 text-lg">
          No results found
        </p>
      )}
    </div>
  );
}
