import {
  FaCalendar,
  FaSearch,
  FaPen,
  FaRegSave,
  FaWindows,
  FaMoneyBill,
} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { MdDelete, MdDesignServices } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function LogisticsPage({ activeFeature }) {
  // Move useTranslation to the top level
  const { t } = useTranslation();

  // State hooks at top level
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedContainerRow, setSelectedContainerRow] = useState(null);

  // Receive Loaded tab content
  const renderReceiveLoadedTab = () => {
    const statusOptions = [
      { key: "confirmed", label: t("status2.confirmed", "Confirmed") },
      { key: "paid", label: t("status2.paid", "Paid") },
      { key: "incurred", label: t("status2.incurred", "Incurred costs") },
      { key: "delivering", label: t("status2.delivering", "Delivering") },
      { key: "delivered", label: t("status2.delivered", "Delivered") },
    ];

    const lotData = [
      {
        lot_no: "111",
        bill_no: "123ABC",
        house_bill_no: "1A2B3C",
        status: "status2.confirmed",
      },
      {
        lot_no: "222",
        bill_no: "456DEF",
        house_bill_no: "4D5E6F",
        status: "status2.paid",
      },
      {
        lot_no: "333",
        bill_no: "789GHI",
        house_bill_no: "7G8H9I",
        status: "status2.incurred",
      },
      {
        lot_no: "444",
        bill_no: "012JKL",
        house_bill_no: "0J1K2L",
        status: "status2.delivering",
      },
      {
        lot_no: "555",
        bill_no: "345MNO",
        house_bill_no: "3M4N5O",
        status: "status2.delivered",
      },
    ];

    const containerData = Array(5).fill({
      status: selectedRow
        ? statusOptions.find((s) => s.key === selectedRow.status.split(".")[1])
            ?.label
        : "",
      container_no: "H2U5Y1Y1",
      owner: "VICT",
      deadline: "01/01/2025",
    });

    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.receive_loaded", "Receive loaded container")}
        </h2>
        <div className="grid grid-cols-6 gap-2 items-end pb-5 border-b-2 border-black">
          <input
            placeholder={t("feature.lot_no", "Lot no")}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <input
            placeholder={t("feature.bill_no", "Bill no")}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <input
            placeholder={t("feature.house_bill_no", "House bill no")}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <input
            placeholder={t("feature.container_no", "Container no")}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <select className="border border-gray-300 rounded px-2 py-1">
            {statusOptions.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <div className="flex space-x-2">
            <button className="flex items-center justify-center w-16 h-8 bg-blue-700 text-sky-100 rounded hover:bg-blue-900 active:bg-blue-900">
              <FaSearch className="mr-1" />
              <span className="text-sm"></span>
            </button>
            <button className="flex items-center justify-center w-8 h-8 bg-white border border-black rounded hover:bg-gray-200 active:bg-gray-200">
              <FiRefreshCcw />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Section */}
          <div className="space-y-2">
            <div className="flex space-x-2">
              <button className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded hover:bg-green-800 active:bg-green-800">
                <TiPlus />
              </button>
              <button
                disabled={!selectedRow}
                className={`flex items-center justify-center w-8 h-8 text-white rounded ${
                  selectedRow
                    ? "bg-amber-400 hover:bg-amber-600 active:bg-amber-600"
                    : "bg-amber-200 cursor-not-allowed"
                }`}
              >
                <FaPen />
              </button>
              <button
                disabled={!selectedRow}
                className={`flex items-center justify-center w-8 h-8 text-white rounded ${
                  selectedRow
                    ? "bg-red-500 hover:bg-red-700 active:bg-red-700"
                    : "bg-red-300 cursor-not-allowed"
                }`}
              >
                <MdDelete />
              </button>
            </div>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-black font-bold text-center w-12">
                      Select
                    </th>
                    <th className="px-4 py-2 text-black font-bold text-center">
                      {t("feature.lot_no", "Lot no")}
                    </th>
                    <th className="px-4 py-2 text-black font-bold text-center">
                      {t("feature.bill_no", "Bill no")}
                    </th>
                    <th className="px-4 py-2 text-black font-bold text-center">
                      {t("feature.house_bill_no", "House bill no")}
                    </th>
                    <th className="px-4 py-2 text-black font-bold text-center">
                      {t("Trạng thái")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lotData.map((row, index) => (
                    <tr
                      key={row.lot_no}
                      className={`cursor-pointer ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } ${
                        selectedRow?.lot_no === row.lot_no ? "bg-blue-100" : ""
                      }`}
                    >
                      <td className="px-4 py-2 text-black text-center">
                        <input
                          type="checkbox"
                          checked={selectedRow?.lot_no === row.lot_no}
                          onChange={() => {
                            if (selectedRow?.lot_no === row.lot_no) {
                              setSelectedRow(null);
                              setSelectedContainerRow(null);
                            } else {
                              setSelectedRow(row);
                              setSelectedContainerRow(null);
                            }
                          }}
                        />
                      </td>
                      <td className="px-4 py-2 text-black text-center">
                        {row.lot_no}
                      </td>
                      <td className="px-4 py-2 text-black text-center">
                        {row.bill_no}
                      </td>
                      <td className="px-4 py-2 text-black text-center">
                        {row.house_bill_no}
                      </td>
                      <td className="px-4 py-2 text-black text-center">
                        {
                          statusOptions.find(
                            (s) => s.key === row.status.split(".")[1]
                          )?.label
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Right Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-black">
                {selectedRow ? (
                  <>
                    <p>
                      <span className="font-normal">Lot no:</span>{" "}
                      <span className="font-bold">{selectedRow.lot_no}</span>
                    </p>
                    <p>
                      <span className="font-normal">Bill no:</span>{" "}
                      <span className="font-bold">{selectedRow.bill_no}</span>
                    </p>
                  </>
                ) : (
                  <p className="text-black">No row selected</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  disabled={selectedContainerRow === null}
                  className={`flex items-center justify-center w-8 h-8 text-white rounded ${
                    selectedContainerRow !== null
                      ? "bg-cyan-500 hover:bg-cyan-700 active:bg-cyan-700"
                      : "bg-cyan-300 cursor-not-allowed"
                  }`}
                >
                  <FaRegSave />
                </button>
                <button
                  disabled={selectedContainerRow === null}
                  className={`flex items-center justify-center w-8 h-8 text-white rounded ${
                    selectedContainerRow !== null
                      ? "bg-green-600 hover:bg-green-800 active:bg-green-800"
                      : "bg-green-400 cursor-not-allowed"
                  }`}
                >
                  <MdDesignServices />
                </button>
                <button
                  disabled={selectedContainerRow === null}
                  className={`flex items-center justify-center w-8 h-8 text-white rounded ${
                    selectedContainerRow !== null
                      ? "bg-stone-400 hover:bg-stone-600 active:bg-stone-600"
                      : "bg-stone-300 cursor-not-allowed"
                  }`}
                >
                  <FaWindows />
                </button>
                <button
                  disabled={selectedContainerRow === null}
                  className={`flex items-center justify-center w-8 h-8 text-white rounded ${
                    selectedContainerRow !== null
                      ? "bg-green-600 hover:bg-green-800 active:bg-green-800"
                      : "bg-green-400 cursor-not-allowed"
                  }`}
                >
                  <FaMoneyBill />
                </button>
                <button
                  disabled={selectedContainerRow === null}
                  className={`flex items-center justify-center w-8 h-8 text-white rounded ${
                    selectedContainerRow !== null
                      ? "bg-cyan-500 hover:bg-cyan-700 active:bg-cyan-700"
                      : "bg-cyan-300 cursor-not-allowed"
                  }`}
                >
                  <LuShieldCheck />
                </button>
              </div>
            </div>
            {selectedRow && (
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full border-collapse min-w-[600px]">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-black font-bold text-center w-12">
                        Select
                      </th>
                      <th className="px-4 py-2 text-black font-bold text-center">
                        Trạng thái
                      </th>
                      <th className="px-4 py-2 text-black font-bold text-center">
                        Số container
                      </th>
                      <th className="px-4 py-2 text-black font-bold text-center">
                        Chủ hàng
                      </th>
                      <th className="px-4 py-2 text-black font-bold text-center">
                        Hạn lệnh
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {containerData.map((row, index) => (
                      <tr
                        key={index}
                        className={`cursor-pointer ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } ${
                          selectedContainerRow === index ? "bg-blue-100" : ""
                        }`}
                      >
                        <td className="px-4 py-2 text-black text-center">
                          <input
                            type="checkbox"
                            checked={selectedContainerRow === index}
                            onChange={() => {
                              if (selectedContainerRow === index) {
                                setSelectedContainerRow(null);
                              } else {
                                setSelectedContainerRow(index);
                              }
                            }}
                          />
                        </td>
                        <td className="px-4 py-2 text-black text-center">
                          {row.status}
                        </td>
                        <td className="px-4 py-2 text-black text-center">
                          {row.container_no}
                        </td>
                        <td className="px-4 py-2 text-black text-center">
                          {row.owner}
                        </td>
                        <td className="px-4 py-2 text-black text-center">
                          {row.deadline}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Notification tab content
  const renderNotificationTab = () => {
    const notifications = [
      {
        date: "01/01/2025",
        line1: t("notifications.maintenance"),
      },
      {
        date: "01/01/2025",
        line2: t("notifications.invoice"),
      },
      {
        date: "01/01/2025",
        line1: t("notifications.maintenance"),
      },
      {
        date: "01/01/2025",
        line2: t("notifications.invoice"),
      },
      {
        date: "01/01/2025",
        line1: t("notifications.maintenance"),
      },
      {
        date: "01/01/2025",
        line2: t("notifications.invoice"),
      },
      {
        date: "01/01/2025",
        line1: t("notifications.maintenance"),
      },
      {
        date: "01/01/2025",
        line2: t("notifications.invoice"),
      },
      {
        date: "01/01/2025",
        line1: t("notifications.maintenance"),
      },
      {
        date: "01/01/2025",
        line2: t("notifications.invoice"),
      },
      {
        date: "01/01/2025",
        line1: t("notifications.maintenance"),
      },
      {
        date: "01/01/2025",
        line2: t("notifications.invoice"),
      },
      {
        date: "01/01/2025",
        line1: t("notifications.maintenance"),
      },
      {
        date: "01/01/2025",
        line2: t("notifications.invoice"),
      },
    ];

    return (
      <div className="space-y-4 p-4">
        {notifications.map((n, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-4 p-2 bg-gray-50 rounded shadow-sm"
          >
            <div className="flex-shrink-0 w-28 h-8 bg-blue-300 text-blue-700 rounded flex items-center justify-center">
              <FaCalendar className="mr-1" />
              <span className="text-sm">{n.date}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center text-sm">
              <p>{n.line1}</p>
              <p>{n.line2}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Container Yard Dropoff tab content
  const renderContainerYardDropoffTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.container_yard_dropoff", "Container yard dropoff")}
        </h2>
        <p>
          Content for Container Yard Dropoff feature will be implemented here.
        </p>
      </div>
    );
  };

  // Receive Empty tab content
  const renderReceiveEmptyTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.receive_empty", "Receive empty")}
        </h2>
        <p>Content for Receive Empty feature will be implemented here.</p>
      </div>
    );
  };

  // Container Yard Pickup tab content
  const renderContainerYardPickupTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.container_yard_pickup", "Container yard pickup")}
        </h2>
        <p>
          Content for Container Yard Pickup feature will be implemented here.
        </p>
      </div>
    );
  };

  // FCL Stuffing tab content
  const renderFclStuffingTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.fcl_stuffing", "FCL stuffing")}
        </h2>
        <p>Content for FCL Stuffing feature will be implemented here.</p>
      </div>
    );
  };

  // FCL Unstuffing tab content
  const renderFclUnstuffingTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.fcl_unstuffing", "FCL unstuffing")}
        </h2>
        <p>Content for FCL Unstuffing feature will be implemented here.</p>
      </div>
    );
  };

  // Container Transshipment tab content
  const renderContainerTransshipmentTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.container_transshipment", "Container transshipment")}
        </h2>
        <p>
          Content for Container Transshipment feature will be implemented here.
        </p>
      </div>
    );
  };

  // Customs Inspection tab content
  const renderCustomsInspectionTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.customs_inspection", "Customs inspection")}
        </h2>
        <p>Content for Customs Inspection feature will be implemented here.</p>
      </div>
    );
  };

  // Operations tab content
  const renderOperationsTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.operations", "Operations")}
        </h2>
        <p>Content for Operations feature will be implemented here.</p>
      </div>
    );
  };

  // Lookup tab content
  const renderLookupTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.lookup", "Lookup")}
        </h2>
        <p>Content for Lookup feature will be implemented here.</p>
      </div>
    );
  };

  // Split Bill tab content
  const renderSplitBillTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.split_bill", "Split bill")}
        </h2>
        <p>Content for Split Bill feature will be implemented here.</p>
      </div>
    );
  };

  // Electronic Invoice tab content
  const renderElectronicInvoiceTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-black text-lg">
          {t("features.electronic_invoice", "Electronic invoice")}
        </h2>
        <p>Content for Electronic Invoice feature will be implemented here.</p>
      </div>
    );
  };

  // Default content when no tabs are active
  const renderDefaultTab = () => {
    return (
      <div className="p-4">
        <h2 className="font-bold text-black text-lg">
          {t("no_active_feature")}
        </h2>
        <p>{t("select_feature")}</p>
      </div>
    );
  };

  // Render content based on active feature
  const renderTabContent = () => {
    if (!activeFeature) {
      return renderDefaultTab();
    }

    switch (activeFeature) {
      case "notification":
        return renderNotificationTab();
      case "receive_loaded":
        return renderReceiveLoadedTab();
      case "container_yard_dropoff":
        return renderContainerYardDropoffTab();
      case "receive_empty":
        return renderReceiveEmptyTab();
      case "container_yard_pickup":
        return renderContainerYardPickupTab();
      case "fcl_stuffing":
        return renderFclStuffingTab();
      case "fcl_unstuffing":
        return renderFclUnstuffingTab();
      case "container_transshipment":
        return renderContainerTransshipmentTab();
      case "customs_inspection":
        return renderCustomsInspectionTab();
      case "operations":
        return renderOperationsTab();
      case "lookup":
        return renderLookupTab();
      case "split_bill":
        return renderSplitBillTab();
      case "electronic_invoice":
        return renderElectronicInvoiceTab();
      default:
        return renderDefaultTab();
    }
  };

  return (
    <div className="p-4">
      <div>{renderTabContent()}</div>
    </div>
  );
}
