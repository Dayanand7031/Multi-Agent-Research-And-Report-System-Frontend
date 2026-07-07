

import { FaRobot } from "react-icons/fa";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ReportViewer from "../components/ReportViewer";
import MetadataCard from "../components/MetadataCard";
import LoadingSpinner from "../components/LoadingSpinner";

import { ApprovalPanel } from "../components/Approval";

export default function Dashboard() {

    // ----------------------------------------
    // Dashboard State
    // ----------------------------------------
    const [report, setReport] = useState("");

    const [metadata, setMetadata] = useState(null);

    const [selectedReportId, setSelectedReportId] = useState(null);

    const [topic, setTopic] = useState("");

    const [approved, setApproved] = useState(false);

    // null | "generate" | "regenerate" | "approve"
    const [loadingType, setLoadingType] = useState(null);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Show workflow loader only while generating/regenerating */}
            {(loadingType === "generate" ||
                loadingType === "regenerate") && (
                <LoadingSpinner />
            )}

            {/* Header */}
            <header className="bg-white shadow-sm border-b">

                                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                        <FaRobot className="text-blue-600 text-xl" />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Multi-Agent Research System
                        </h1>

                        <p className="text-gray-500">
                            AI-powered autonomous research using specialized agents.
                        </p>

                    </div>

                </div>

            </header>

            {/* Main Layout */}
            <div className="max-w-screen-2xl mx-auto flex gap-6 p-6">

                {/* Sidebar */}
                <aside className="w-80 shrink-0">

                    <Sidebar
                        setReport={setReport}
                        setMetadata={setMetadata}
                        setSelectedReportId={setSelectedReportId}
                        setTopic={setTopic}
                        setApproved={setApproved}
                        loading={loadingType === "generate"}
                        setLoadingType={setLoadingType}
                    />

                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col gap-6">

                    <ReportViewer
                        report={report}
                    />

                    <MetadataCard
                        metadata={metadata}
                    />

                    {selectedReportId && (

                        <ApprovalPanel
                            reportId={selectedReportId}
                            topic={topic}

                            approved={approved}
                            setApproved={setApproved}

                            loadingType={loadingType}
                            setLoadingType={setLoadingType}

                            setReport={setReport}
                            setMetadata={setMetadata}
                            setSelectedReportId={setSelectedReportId}
                        />

                    )}

                </main>

            </div>

        </div>

    );

}