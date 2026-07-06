import { useState } from "react";
import ReportHistory from "./ReportHistory";
import { generateReport } from "../api/researchApi";

export default function Sidebar({
    setReport,
    setMetadata,
    setSelectedReportId,
    setTopic,
    setApproved,
    loading,
    setLoading
}) {

    const [topicInput, setTopicInput] = useState("");

    const handleGenerate = async () => {

        if (!topicInput.trim()) {
            alert("Please enter a research topic.");
            return;
        }

        try {

            setLoading(true);

            const response = await generateReport(
                topicInput
            );

            setReport(
                response.data.report
            );

            setMetadata(
                response.data.metadata
            );

            setSelectedReportId(
                response.data.metadata.report_id
            );

            setTopic(
                topicInput
            );

            // Every new report starts as draft
            setApproved(false);

            setTopicInput("");

        } catch (error) {

            console.error(error);

            alert("Failed to generate report.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-xl shadow-lg h-full p-6 flex flex-col">

            {/* Heading */}
            <div>

                <h2 className="text-2xl font-bold text-gray-800">
                    🤖 Multi-Agent Research
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Generate AI-powered research reports
                </p>

            </div>

            {/* Input */}
            <div className="mt-8">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Topic
                </label>

                <textarea
                    rows={4}
                    value={topicInput}
                    onChange={(e) =>
                        setTopicInput(e.target.value)
                    }
                    placeholder="Example: Artificial Intelligence in Healthcare"
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        p-3
                        resize-none
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className={`
                        w-full
                        mt-4
                        rounded-lg
                        py-3
                        font-semibold
                        text-white
                        transition
                        ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }
                    `}
                >
                    {
                        loading
                            ? "⏳ Generating..."
                            : "🚀 Generate Report"
                    }
                </button>

            </div>

            {/* Divider */}
            <div className="my-8 border-t"></div>

            {/* History */}
            <ReportHistory
                setReport={setReport}
                setMetadata={setMetadata}
                setSelectedReportId={setSelectedReportId}
                setTopic={setTopic}
                setApproved={setApproved}
            />

        </div>

    );

}