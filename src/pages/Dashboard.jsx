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

    const [loading, setLoading] = useState(false);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Loading Overlay */}
            {loading && <LoadingSpinner />}

            {/* Header */}
            <header className="bg-white shadow-sm border-b">

                <div className="max-w-screen-2xl mx-auto px-8 py-5">

                    <h1 className="text-3xl font-bold text-gray-800">
                        🤖 Multi-Agent Research & Report System
                    </h1>

                    <p className="text-gray-500 mt-1">
                        AI-powered autonomous research using multiple specialized agents.
                    </p>

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
                        loading={loading}
                        setLoading={setLoading}
                    />

                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col gap-6">

                    {/* Report */}
                    <ReportViewer
                        report={report}
                    />

                    {/* Metadata */}
                    <MetadataCard
                        metadata={metadata}
                    />

                    {/* Human Approval */}
                    {selectedReportId && (

                        <ApprovalPanel
                            reportId={selectedReportId}
                            topic={topic}
                            approved={approved}
                            setApproved={setApproved}
                            loading={loading}
                            setLoading={setLoading}
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