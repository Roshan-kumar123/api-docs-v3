'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordian';
import RequestSection from '@/components/RequestSection';
import ResponseSection from '@/components/ResponseSection';
import { useTheme } from "next-themes";
import { APIData } from '@/components/APIExplorer';



export default function APIDetailPage() {
  const [apiDetails, setApiDetails] = useState<APIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('method');
  const { id } = useParams(); // Get id from the URL
  const { theme } = useTheme();
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch('/data/dummy-data.json'); // Replace with your correct data endpoint
          if (!response.ok) throw new Error('Failed to fetch API data');
  
          const data = await response.json();
          const apiDetail = findApiById(data, id);
          setApiDetails(apiDetail);
         
        } catch (err) {
          setError('Error fetching API details');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const findApiById = (data: any, id: string | string[]): APIData | null => {
    const numericId = parseInt(Array.isArray(id) ? id[0] : id); // Ensure id is a string or extract from array
  
    for (const path in data.paths) {
      if (data.paths.hasOwnProperty(path)) {
        for (const method in data.paths[path]) {
          if (data.paths[path].hasOwnProperty(method)) {
            const api = data.paths[path][method];
  
            // Check if the API object has the 'id' property and compare with the numericId
            if (api && api.id === numericId) {
              return {
                ...api,
                path: path,
                method: method.toUpperCase(),
                security: api.security || [],
              };
            }
          }
        }
      }
    }
    
    return null;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!apiDetails) return <div>No details available</div>;
  console.log('apiDetails',apiDetails)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{apiDetails.name}</h1>
      <p className="mb-6">{apiDetails.description}</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="method">Api-Method</TabsTrigger>
          <TabsTrigger value="apiDetails">Api-Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="method">
              <div>
              <h3 className='mb-5 mt-4 font-semibold'>Api Method</h3>
                
                <p>{apiDetails.method}</p>
                <p>{apiDetails?.path}</p></div>
        </TabsContent>

        <TabsContent value="apiDetails">
        <ResponseSection apiDetails={apiDetails as APIData} />
          
         
        </TabsContent>

        <TabsContent value="security">

        <h3 className='mb-5 mt-4 font-semibold'>Security</h3>

          {
            apiDetails?.security ?
          
             <pre className={`p-4 rounded overflow-auto ${
                             theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                    }`}>
                              {JSON.stringify(apiDetails?.security, null, 2)}
                            </pre>:'No security information available'


           }
        </TabsContent>
      </Tabs>
    </div>
  );
}
