import React, { useState, useEffect } from "react";
import {
  FaFileInvoiceDollar,
  FaCreditCard,
  FaReceipt,
  FaSearch,
} from "react-icons/fa";
import { format } from "date-fns";

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedView, setSelectedView] = useState("invoices");

  // Mock data - replace with API call in production
  useEffect(() => {
    const fetchBills = async () => {
      try {
        // TODO: Replace with actual API call
        const mockBills = [
          {
            id: "INV-2023-001",
            date: "2023-06-10",
            dueDate: "2023-07-10",
            amount: 250.75,
            status: "paid",
            type: "invoice",
            description: "Annual Physical Exam",
            provider: "City Medical Group",
            paymentMethod: "Visa ending in 4242",
          },
          {
            id: "INV-2023-002",
            date: "2023-06-15",
            dueDate: "2023-07-15",
            amount: 89.5,
            status: "pending",
            type: "invoice",
            description: "Lab Work - Blood Test",
            provider: "LabCorp Diagnostics",
          },
          {
            id: "PAY-2023-001",
            date: "2023-05-28",
            amount: 50.0,
            status: "processed",
            type: "payment",
            description: "Payment",
            paymentMethod: "Visa ending in 4242",
          },
        ];

        setBills(mockBills);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching billing information:", error);
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.provider?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || bill.status === selectedStatus;

    const matchesView =
      selectedView === "all" ||
      (selectedView === "invoices" && bill.type === "invoice") ||
      (selectedView === "payments" && bill.type === "payment");

    return matchesSearch && matchesStatus && matchesView;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      processed: "bg-blue-100 text-blue-800",
      refunded: "bg-purple-100 text-purple-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Billing & Payments</h2>
        <p className="mt-1 text-sm text-gray-600">
          View and manage your medical bills and payment history
        </p>
      </div>

      {/* Billing Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FaFileInvoiceDollar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Balance
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(340.25)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <FaReceipt className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(89.5)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FaCreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Paid This Year
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(300.75)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedView("invoices")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedView === "invoices"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Invoices
              </button>
              <button
                onClick={() => setSelectedView("payments")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedView === "payments"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Payment History
              </button>
              <button
                onClick={() => setSelectedView("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedView === "all"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                View All
              </button>
            </div>

            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {filteredBills.length === 0 ? (
          <div className="p-8 text-center">
            <FaFileInvoiceDollar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No {selectedView === "all" ? "records" : selectedView} found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : `You don't have any ${selectedView} at this time.`}
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredBills.map((bill) => (
                <li
                  key={bill.id}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {bill.type === "invoice" ? (
                          <FaFileInvoiceDollar className="h-8 w-8 text-blue-500" />
                        ) : (
                          <FaCreditCard className="h-8 w-8 text-green-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {bill.id}
                          </p>
                          <div className="ml-2">
                            {getStatusBadge(bill.status)}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {bill.description}
                          {bill.provider && ` • ${bill.provider}`}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {bill.type === "invoice" ? (
                            <>
                              <span>
                                Issued:{" "}
                                {format(new Date(bill.date), "MMM d, yyyy")}
                              </span>
                              {bill.dueDate && (
                                <span className="ml-2">
                                  • Due:{" "}
                                  {format(
                                    new Date(bill.dueDate),
                                    "MMM d, yyyy"
                                  )}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>
                              Processed:{" "}
                              {format(new Date(bill.date), "MMM d, yyyy")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-semibold ${
                          bill.type === "payment"
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {bill.type === "payment" ? "-" : ""}
                        {formatCurrency(bill.amount)}
                      </div>
                      {bill.paymentMethod && (
                        <div className="text-xs text-gray-500">
                          {bill.paymentMethod}
                        </div>
                      )}
                      <div className="mt-2">
                        {bill.type === "invoice" &&
                        bill.status === "pending" ? (
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Pay Now
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Payment Methods
          </h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                    <FaCreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      Visa ending in 4242
                    </div>
                    <div className="text-sm text-gray-500">Expires 04/2025</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
