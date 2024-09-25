import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataTable = () => {
  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border p-2">Element Name</TableHead>
          <TableHead className="border p-2">Data Type</TableHead>
          <TableHead className="border p-2">Mandatory/Optional</TableHead>
          <TableHead className="border p-2">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border p-2">transaction</TableCell>
          <TableCell className="border p-2">String</TableCell>
          <TableCell className="border p-2">Mandatory</TableCell>
          <TableCell className="border p-2">MSISDN starts with 62</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border p-2">msisdn</TableCell>
          <TableCell className="border p-2">String</TableCell>
          <TableCell className="border p-2">Mandatory</TableCell>
          <TableCell className="border p-2">MSISDN starts with 62</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border p-2">consent</TableCell>
          <TableCell className="border p-2">String</TableCell>
          <TableCell className="border p-2">Mandatory</TableCell>
          <TableCell className="border p-2">Customer's consent id</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border p-2">partner_id</TableCell>
          <TableCell className="border p-2">String</TableCell>
          <TableCell className="border p-2">Optional</TableCell>
          <TableCell className="border p-2">Given by Telkomsel</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default function RequestSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Resource Name</h4>
            <p>API tScore</p>
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <p>API tScore</p>
          </div>
          <div>
            <h4 className="font-semibold">HTTP Method</h4>
            <p>POST</p>
          </div>
          <div>
            <h4 className="font-semibold">Content Type</h4>
            <p>application/json</p>
          </div>
          <div>
            <h4 className="font-semibold">Encryption Type</h4>
            <p>Synchronous</p>
          </div>
          <div>
            <h4 className="font-semibold">Request Headers</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Header Field Name</TableHead>
                  <TableHead>Acceptable Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Content-Type</TableCell>
                  <TableCell>application/json</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>X-API-KEY</TableCell>
                  <TableCell>string (min: 1, max: 50 characters)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <DataTable />
        </div>
        <div>
          <h4 className="font-semibold">Request Body Example</h4>
          <pre className="bg-white-100 p-4 rounded">
            {JSON.stringify(
              {
                transaction: {
                  transaction_id: "1234567890123456789012345",
                },
                msisdn: "6281234567890",
                consent: "consent_id",
                partner_id: "partner_id_1234",
              },
              null,
              2
            )}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
