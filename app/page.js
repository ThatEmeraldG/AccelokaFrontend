"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import { fetchTickets } from "@/lib/getTickets";
import { Plus } from "lucide-react";
import Dropdown from "@/components/Dropdown";

const pageSizeOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 }
];

const orderByOptions = [
  { label: "Ticket Code", value: "ticketCode" },
  { label: "Ticket Name", value: "ticketName" },
  { label: "Price", value: "price" },
  { label: "Event Date", value: "eventDate" }
];

const orderDirectionOptions = [
  { label: "Ascending", value: "ASC" },
  { label: "Descending", value: "DESC" }
]

const Dashboard = () => {
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [orderBy, setOrderBy] = useState("ticketCode");
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const pageNumber = parseInt(searchParams.get("page")) || 1;
  const [filters, setFilters] = useState({
    OrderBy: orderBy,
    OrderDirection: orderDirection,
  });

  useEffect(() => {
    async function getTickets() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchTickets(pageNumber, pageSize, filters);

        if (data && data.data) {
          setTickets(data.data);
          setTotalRecords(data.totalRecords);
        } else {
          setTickets([]);
          setTotalRecords(0);
        }
      } catch (err) {
        setError(err.message);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    }

    getTickets();
  }, [pageNumber, pageSize, filters]);

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Available Tickets</h2>
        <div className="flex space-x-4">
          {/* Page Size Dropdown */}
          <Dropdown
            value={pageSize}
            options={pageSizeOptions}
            onChange={setPageSize}
            label="Items per page" />

          {/* Order By Dropdown */}
          <Dropdown
            value={orderBy}
            options={orderByOptions}
            onChange={(val) => {
              setOrderBy(val);
              setFilters((prev) => ({ ...prev, OrderBy: val }));
            }}
            label="Order By" />

          {/* Order Direction Dropdown */}
          <Dropdown
            value={orderDirection}
            options={orderDirectionOptions}
            onChange={(val) => {
              setOrderDirection(val);
              setFilters((prev) => ({ ...prev, OrderDirection: val }));
            }}
            label="Order Direction" />
        </div>

        <Button
          variant={"secondary"}
          size="lg"
          className="bg-primary text-white text-md capitalize flex justify-center items-center gap-2 hover:cursor-pointer"
          onClick={() => window.open("/tickets/create", "_self")}
        >
          <Plus strokeWidth={2.5} />Create New Ticket
        </Button>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <p>Loading tickets...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : tickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket Code</TableHead>
                    <TableHead>Ticket Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quota</TableHead>
                    <TableHead>EventStart</TableHead>
                    <TableHead>EventEnd</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow
                      key={ticket.ticketCode}
                      className="hover:cursor-pointer"
                      onClick={() => router.push(`/tickets/${ticket.ticketCode}`)}>
                      <TableCell>{ticket.ticketCode}</TableCell>
                      <TableCell>{ticket.ticketName}</TableCell>
                      <TableCell>{ticket.categoryName}</TableCell>
                      <TableCell>
                        Rp {new Intl.NumberFormat("id-ID").format(ticket.price)}
                      </TableCell>
                      <TableCell>{ticket.quota}</TableCell>
                      <TableCell>
                        {new Date(ticket.eventStart).toLocaleString('en-US', {
                          timeZone: 'Asia/Bangkok',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })} GMT+7
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.eventEnd).toLocaleString('en-US', {
                          timeZone: 'Asia/Bangkok',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false,
                        })} GMT+7
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Pagination
                itemCount={totalRecords}
                pageSize={pageSize}
                currentPage={pageNumber}
                onPageChange={changePage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;