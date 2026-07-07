import { useEffect, useState } from "react";

import {
    FaHistory,
    FaTrashAlt,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

import {
    getReports,
    getReport,
    deleteReport
} from "../api/reportApi";

export default function ReportHistory({
    setReport,
    setMetadata,
    setSelectedReportId,
    setTopic,
    setApproved
}) {

    const [reports, setReports] = useState([]);

    useEffect(() => {
        loadReports();
    }, []);

    // ---------------------------------
    // Load Report History
    // ---------------------------------
    const loadReports = async () => {

        try {

            const response = await getReports();

            setReports(response.data);

        }

        catch (err) {

            console.error(err);

        }

    };

    // ---------------------------------
    // Load Report
    // ---------------------------------
    const handleSelectReport = async (report) => {

        try {

            const response = await getReport(
                report.report_id
            );

            setReport(
                response.data.report
            );

            setMetadata(
                response.data.metadata
            );

            setSelectedReportId(
                report.report_id
            );

            setTopic(
                response.data.topic
            );

            setApproved(
                response.data.approved
            );

        }

        catch (err) {

            console.error(err);

        }

    };

    // ---------------------------------
    // Delete Report
    // ---------------------------------
    const handleDelete = async (reportId) => {

        if (
            !window.confirm(
                "Delete this report permanently?"
            )
        ) {
            return;
        }

        try {

            await deleteReport(
                reportId
            );

            await loadReports();

            setReport("");

            setMetadata(null);

            setSelectedReportId(null);

            setTopic("");

            setApproved(false);

        }

        catch (err) {

            console.error(err);

            alert(
                "Unable to delete report."
            );

        }

    };

    return (

        <div className="flex-1 overflow-y-auto">

            {/* Header */}

            <div className="flex items-center gap-2 mb-5">

                <FaHistory className="text-blue-600" />

                <h3 className="text-lg font-semibold text-gray-800">
                    Report History
                </h3>

            </div>

            {

                reports.length === 0 ? (

                    <div className="text-center py-8">

                        <p className="text-sm text-gray-500">
                            No reports available.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {

                            reports.map((report) => (

                                <div

                                    key={report.report_id}

                                    className="
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        p-4
                                        transition
                                        hover:border-blue-400
                                        hover:shadow-md
                                    "

                                >

                                    <div className="flex justify-between gap-3">

                                        {/* Report */}

                                        <div

                                            onClick={() =>
                                                handleSelectReport(
                                                    report
                                                )
                                            }

                                            className="
                                                flex-1
                                                cursor-pointer
                                            "

                                        >

                                            <h4 className="font-semibold text-gray-800 line-clamp-2">

                                                {report.topic}

                                            </h4>

                                            <p className="text-xs text-gray-500 mt-2">

                                                {

                                                    new Date(
                                                        report.created_at
                                                    ).toLocaleString()

                                                }

                                            </p>

                                            <div className="flex items-center gap-2 mt-3">

                                                <span
                                                    className="
                                                        text-xs
                                                        px-2
                                                        py-1
                                                        rounded-full
                                                        bg-blue-100
                                                        text-blue-700
                                                    "
                                                >
                                                    {report.quality}
                                                </span>

                                                {

                                                    report.approved ? (

                                                        <span className="flex items-center gap-1 text-xs text-green-600">

                                                            <FaCheckCircle />

                                                            Approved

                                                        </span>

                                                    ) : (

                                                        <span className="flex items-center gap-1 text-xs text-orange-500">

                                                            <FaClock />

                                                            Draft

                                                        </span>

                                                    )

                                                }

                                            </div>

                                        </div>

                                        {/* Delete */}

                                        <button

                                            onClick={() =>
                                                handleDelete(
                                                    report.report_id
                                                )
                                            }

                                            className="
                                                h-9
                                                w-9
                                                rounded-lg
                                                flex
                                                items-center
                                                justify-center
                                                text-red-500
                                                hover:bg-red-50
                                                hover:text-red-700
                                                transition
                                            "

                                            title="Delete Report"

                                        >

                                            <FaTrashAlt />

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}