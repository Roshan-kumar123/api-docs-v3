import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordian';
import { useTheme } from "next-themes";
import { APIData, APIParameter, RequestBodyProperty } from './APIExplorer'; 


interface ResponseSectionProps {
  apiDetails: APIData;
}

export default function ResponseSection({ apiDetails }: ResponseSectionProps) {
  const { summary, description, security, tags, requestBody, parameters = [], responses } = apiDetails;
  const { theme } = useTheme();

  return (
    <div>
      <Accordion type="single" collapsible defaultValue="parameters">
        {/* Parameters Section */}
        <AccordionItem value="parameters">
          <AccordionTrigger>Parameters</AccordionTrigger>
          <AccordionContent>
            {parameters.length > 0 ? (
              <>
                <table className="w-full border-collapse mb-4">
                  <thead>
                    <tr>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">In</th>
                      <th className="border p-2">Type</th>
                      <th className="border p-2">Required</th>
                      <th className="border p-2">Description</th>
                      <th className="border p-2">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parameters.map((param: APIParameter, index: number) => (
                      <tr key={index}>
                        <td className="border p-2">{param.name}</td>
                        <td className="border p-2">{param.in}</td>
                        <td className="border p-2">{param.schema.type}</td>
                        <td className="border p-2">{param.required ? 'Yes' : 'No'}</td>
                        <td className="border p-2">{param.description}</td>
                        <td className="border p-2">{param.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* JSON Representation */}
                <div className="mt-4">
                  <h5 className="font-semibold">Parameters JSON:</h5>
                  <pre className={`p-4 rounded overflow-auto ${
                     theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                  }`}>
                    {JSON.stringify(parameters, null, 2)}
                  </pre>
                </div>
              </>
            ) : (
              <p>No parameters available.</p>
            )}
          </AccordionContent>
        </AccordionItem>
  
        {/* Request Body Section */}
        {requestBody?.content && (
          <AccordionItem value="requestBody">
            <AccordionTrigger>Request Body</AccordionTrigger>
            <AccordionContent>
              {Object.entries(requestBody.content).map(([mediaType, mediaContent], index) => (
                <div key={index}>
                  <h5 className="font-semibold mt-4 mb-2">Content Type: {mediaType}</h5>
                  <table className="w-full border-collapse mb-4">
                    <thead>
                      <tr>
                        <th className="border p-2">Property Name</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(mediaContent.schema.properties).map(
                        ([propertyName, propertyDetails], propIndex) => {
                          const details = propertyDetails as RequestBodyProperty;
                          return (
                            <tr key={propIndex}>
                              <td className="border p-2">{propertyName}</td>
                              <td className="border p-2">{details.type}</td>
                              <td className="border p-2">{details.description}</td>
                              <td className="border p-2">
                                {details.example !== undefined ? JSON.stringify(details.example) : 'N/A'}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  {/* JSON Representation */}
                  <div className="mt-4">
                    <h5 className="font-semibold">Request Body JSON:</h5>
                    <pre className={`p-4 rounded overflow-auto ${
                     theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                    }`}>
                      {JSON.stringify(mediaContent.schema, null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
  
        {/* Responses Section */}
        <AccordionItem value="responses">
          <AccordionTrigger>Responses</AccordionTrigger>
          <AccordionContent>
            {Object.keys(responses).length > 0 ? (
              Object.entries(responses).map(([statusCode, response], index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-semibold mb-2">Status Code: {statusCode}</h4>
                  <p className="mb-2">{response.description}</p>
  
                  {response.content && (
                    <>
                      {Object.entries(response.content).map(([mediaType, mediaContent], mediaIndex) => (
                        <div key={mediaIndex}>
                          <h5 className="font-semibold">Content Type: {mediaType}</h5>
  
                          <h6 className="font-semibold mt-4 mb-2">Schema:</h6>
                          <table className="w-full border-collapse mb-4">
                            <thead>
                              <tr>
                                <th className="border p-2">Property Name</th>
                                <th className="border p-2">Type</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Example</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(mediaContent.schema.properties).map(
                                ([propertyName, propertyDetails], propIndex) => {
                                  const details = propertyDetails as RequestBodyProperty;
                                  return (
                                    <tr key={propIndex}>
                                      <td className="border p-2">{propertyName}</td>
                                      <td className="border p-2">{details.type}</td>
                                      <td className="border p-2">{details.description}</td>
                                      <td className="border p-2">
                                        {details.example !== undefined ? JSON.stringify(details.example) : 'N/A'}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                          {/* JSON Representation */}
                          <div className="mt-4">
                            <h5 className="font-semibold">Response {statusCode} JSON:</h5>
                            <pre className={`p-4 rounded overflow-auto ${
                             theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                    }`}>
                              {JSON.stringify(mediaContent.schema, null, 2)}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No response data available.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  
}
