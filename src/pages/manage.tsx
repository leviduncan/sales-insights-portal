import { useState, useEffect, useCallback } from "react";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { FinancialRecordWithId, FinancialRecordInput } from "@/types/financial";
import Navbar from "@/components/Navbar";
import RecordFormModal from "@/components/RecordFormModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
}

interface PaginatedResponse {
  data: FinancialRecordWithId[];
  total: number;
  page: number;
  totalPages: number;
}

function parseMoney(val: string): number {
  return parseFloat(val.replace(/[$,]/g, "")) || 0;
}

function recordToInput(record: FinancialRecordWithId): FinancialRecordInput {
  const [month, day, year] = record.Date.split("/");
  return {
    segment: record.Segment,
    country: record.Country,
    product: record.Product,
    discountBand: record["Discount Band"],
    unitsSold: parseMoney(record["Units Sold"]),
    manufacturingPrice: parseMoney(record["Manufacturing Price"]),
    salePrice: parseMoney(record["Sale Price"]),
    grossSales: parseMoney(record["Gross Sales"]),
    discounts: parseMoney(record.Discounts),
    sales: parseMoney(record.Sales),
    cogs: parseMoney(record.COGS),
    profit: parseMoney(record.Profit),
    date: `${year}-${month}-${day}`,
  };
}

export default function ManagePage() {
  const [records, setRecords] = useState<FinancialRecordWithId[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] =
    useState<FinancialRecordInput | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchRecords = useCallback(async (p: number) => {
    setLoading(true);
    const res = await fetch(`/api/records?page=${p}&limit=50`);
    const data: PaginatedResponse = await res.json();
    setRecords(data.data);
    setTotalPages(data.totalPages);
    setTotal(data.total);
    setPage(data.page);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRecords(page);
  }, [fetchRecords, page]);

  const handleCreate = () => {
    setEditingRecord(null);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (record: FinancialRecordWithId) => {
    setEditingRecord(recordToInput(record));
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleSave = async (data: FinancialRecordInput) => {
    const url = editingId ? `/api/records/${editingId}` : "/api/records";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setShowForm(false);
      fetchRecords(page);
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    const res = await fetch(`/api/records/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setDeleteId(null);
      fetchRecords(page);
    }
  };

  const thClass =
    "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider";
  const tdClass =
    "px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Manage Records
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {total} total records
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
          >
            + Add Record
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className={thClass}>Date</th>
                <th className={thClass}>Segment</th>
                <th className={thClass}>Country</th>
                <th className={thClass}>Product</th>
                <th className={thClass}>Sales</th>
                <th className={thClass}>Profit</th>
                <th className={thClass}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <td className={tdClass}>{record.Date}</td>
                    <td className={tdClass}>{record.Segment}</td>
                    <td className={tdClass}>{record.Country}</td>
                    <td className={tdClass}>{record.Product}</td>
                    <td className={tdClass}>{record.Sales}</td>
                    <td className={tdClass}>{record.Profit}</td>
                    <td className={`${tdClass} flex gap-2`}>
                      <button
                        onClick={() => handleEdit(record)}
                        className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(record.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <RecordFormModal
          initial={editingRecord}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {deleteId !== null && (
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
