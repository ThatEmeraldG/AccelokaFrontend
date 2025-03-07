"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTransactions } from "@/lib/getTransactions";
import StatusBadge from "@/components/TransactionStatusBadge";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTransactions() {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching transactions...");

        const data = await fetchTransactions();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          console.log("Transactions found:", data);
          setTransactions(data);
        } else {
          console.log("No transactions returned.");
          setTransactions([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }

    getTransactions();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
      <Card>
        <CardContent>
          {loading ? (
            <p>Loading transactions...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : transactions.length === 0 ? (
            <p>No transactions recorded.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated By</TableHead>
                  <TableHead>Updated At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell>{transaction.transactionId}</TableCell>
                    <TableCell>Rp {new Intl.NumberFormat("id-ID").format(transaction.totalPrice)}</TableCell>
                    <TableCell><StatusBadge status="Pending" /></TableCell>
                    <TableCell>{new Date(transaction.transactionDate).toLocaleString("id-ID")}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>Rp {new Intl.NumberFormat("id-ID").format(transaction.totalPayment)}</TableCell>
                    <TableCell>{transaction.createdBy}</TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleString('en-US', {
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
                    <TableCell>{transaction.updatedBy}</TableCell>
                    <TableCell>
                      {new Date(transaction.updatedAt).toLocaleString('en-US', {
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage;