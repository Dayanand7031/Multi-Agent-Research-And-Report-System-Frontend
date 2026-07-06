import { useEffect, useState } from "react";

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

        } catch (err) {

            console.error(
                "Failed to load reports:",
                err
            );

        }

    };

    // ---------------------------------
    // Load Selected Report
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

            // NEW
            setApproved(
                response.data.approved
            );

        } catch (err) {

            console.error(
                "Failed to load report:",
                err
            );

        }

    };

    // ---------------------------------
    // Delete Report
    // ---------------------------------
    const handleDelete = async (reportId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this report?"
        );

        if (!confirmDelete) return;

        try {

            await deleteReport(
                reportId
            );

            await loadReports();

            setReport("");

            setMetadata(null);

            setSelectedReportId(null);

            setTopic("");

            // NEW
            setApproved(false);

        } catch (err) {

            console.error(
                "Failed to delete report:",
                err
            );

            alert(
                "Unable to delete report."
            );

        }

    };

    return (

        <div className="flex-1 overflow-auto">

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                📚 Report History
            </h3>

            {
                reports.length === 0 ? (

                    <p className="text-sm text-gray-500">
                        No reports found.
                    </p>

                ) : (

                    <div className="space-y-3">

                        {
                            reports.map((report) => (

                                <div
                                    key={report.report_id}
                                    className="
                                        border
                                        rounded-lg
                                        p-3
                                        hover:bg-blue-50
                                        transition
                                    "
                                >

                                    <div className="flex justify-between items-start gap-3">

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

                                            <p className="font-semibold text-gray-800">
                                                {report.topic}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">

                                                {report.quality}

                                                {" • "}

                                                {
                                                    new Date(
                                                        report.created_at
                                                    ).toLocaleString()
                                                }

                                            </p>

                                        </div>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    report.report_id
                                                )
                                            }
                                            className="
                                                text-red-500
                                                hover:text-red-700
                                                text-lg
                                                font-bold
                                            "
                                            title="Delete Report"
                                        >
                                            🗑️
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