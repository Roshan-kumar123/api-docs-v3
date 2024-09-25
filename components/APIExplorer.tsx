// "use client";

export interface APIParameter {
  in: string;
  name: string;
  schema: { type: string };
  required: boolean;
  description: string;
  example: string;
}

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

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResponseSection from "@/components/ResponseSection";
import Link from "next/link";
// import { APIData } from "./APIData";

export function APIExplorer() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name A-Z");
  const [jsonData, setJsonData] = useState<APIData[]>([]);
  const [selectedApi, setSelectedApi] = useState<APIData | null>(null);
  const [activeTab, setActiveTab] = useState("apiDetails");
  const [activeApiId, setActiveApiId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOpenAPIData = async () => {
      try {
        const response = await fetch("/data/dummy-data.json");
        if (!response.ok) throw new Error("Failed to fetch JSON data");
        const data = await response.json();
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

  useEffect(() => {
    if (!loading && jsonData.length > 0) {
      const sortedApis = [...jsonData].sort((a, b) => {
        switch (sortBy) {
          case "Name A-Z":
            return a.name.localeCompare(b.name);
          case "Name Z-A":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });

      // Set the first API in the sorted list as the default selected API
      if (sortedApis.length > 0) {
        setSelectedApi(sortedApis[0]);
        setActiveApiId(sortedApis[0].id);
      }
    }
  }, [jsonData, sortBy, loading]);

  const transformOpenAPIData = (data: any): APIData[] => {
    const paths = data.paths;
    const apis: APIData[] = [];
    let idCounter = 1;

    for (const path in paths) {
      for (const method in paths[path]) {
        const endpoint = paths[path][method];

        const transformedParameters = endpoint.parameters
          ? endpoint.parameters.map((param: any) => ({
              name: param.name,
              in: param.in,
              required: param.required,
              description: param.description || "No description",
              example: param.example || "No example",
              schema: param.schema || {},
            }))
          : [];

        const transformedResponses = endpoint.responses
          ? Object.keys(endpoint.responses).map((statusCode: string) => ({
              statusCode: statusCode,
              description:
                endpoint.responses[statusCode].description || "No description",
              content: endpoint.responses[statusCode].content || {},
            }))
          : [];

        apis.push({
          id: idCounter++,
          name: endpoint.summary || "Unnamed API",
          path: path,
          description: endpoint.description || "No description available",
          method: method.toUpperCase(),
          parameters: transformedParameters,
          responses: transformedResponses,
          requestBody: endpoint.requestBody || { required: false, content: {} },
          tags: endpoint.tags || [],
          category: "Uncategorized",
          subscribed: 0,
          latency: null,
          createdAt: new Date().toISOString(),
          summary: endpoint.summary || "No summary available",
          security: endpoint.security || [],
        });
      }
    }
    return apis;
  };

  const handleApiSelect = (api: APIData) => {
    setSelectedApi(api);
    setActiveApiId(api.id);
    setActiveTab("apiDetails");
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
      default:
        return 0;
    }
  });

  return (
    <div className="grid grid-cols-10 h-screen dark:bg-[#0e141b] dark:text-gray-200">
      {/* Sidebar */}
      <aside className="col-span-3 p-4 border-r bg-[#10192d] text-white">
        <Input
          type="text"
          placeholder="Search API"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 text-gray-900"
        />
        <Select onValueChange={setSortBy} defaultValue="Name A-Z">
          <SelectTrigger className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            <SelectValue>{sortBy}</SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            <SelectItem
              value="Name A-Z"
              className="hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Name A-Z
            </SelectItem>
            <SelectItem
              value="Name Z-A"
              className="hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Name Z-A
            </SelectItem>
          </SelectContent>
        </Select>

        <ul className="mt-4 space-y-2 text-gray-300">
          {loading ? (
            <p>Loading...</p>
          ) : (
            sortedApis.map((api) => (
              <li key={api.id}>
                <button
                  onClick={() => handleApiSelect(api)}
                  className={`block p-2 rounded w-full text-left ${
                    activeApiId === api.id
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-800 hover:text-gray-100"
                  }`}
                >
                  {api.name}
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* Content */}
      <div className="col-span-7 p-8 bg-white dark:bg-[#131a23] dark:text-gray-200 overflow-y-auto">
        {selectedApi ? (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {selectedApi.name}
            </h1>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {selectedApi.description}
            </p>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="bg-gray-200 dark:bg-gray-700 rounded mb-4">
                <TabsTrigger
                  value="method"
                  className="text-gray-700 dark:text-gray-300"
                >
                  API Method
                </TabsTrigger>
                <TabsTrigger
                  value="apiDetails"
                  className="text-gray-700 dark:text-gray-300"
                >
                  API Details
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="method">
                <div>
                  <h3 className="mb-5 mt-4 font-semibold text-gray-900 dark:text-white">
                    API Method
                  </h3>
                  <p className="dark:text-gray-300">{selectedApi.method}</p>
                  <p className="dark:text-gray-300">{selectedApi.path}</p>
                </div>
              </TabsContent>

              <TabsContent value="apiDetails">
                <ResponseSection apiDetails={selectedApi} />
              </TabsContent>

              <TabsContent value="security">
                <h3 className="mb-5 mt-4 font-semibold text-gray-900 dark:text-white">
                  Security
                </h3>
                {selectedApi.security.length > 0 ? (
                  <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-auto text-gray-800 dark:text-gray-200">
                    {JSON.stringify(selectedApi.security, null, 2)}
                  </pre>
                ) : (
                  <p className="dark:text-gray-300">
                    No security information available
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <p className="dark:text-gray-300">
            Select an API from the sidebar to see its details
          </p>
        )}
      </div>
    </div>
  );
}
