import { useState } from "react";

import ApprovalActions from "./ApprovalActions";
import FeedbackForm from "./FeedbackForm";
import DownloadButton from "./DownloadButton";

import { approveReport } from "../../api/reportApi";
import { generateReport } from "../../api/researchApi";

export default function ApprovalPanel({
    reportId,
    topic,

    approved,
    setApproved,

    loading,
    setLoading,

    setReport,
    setMetadata,
    setSelectedReportId
}) {

    const [showFeedback, setShowFeedback] = useState(false);

    // ---------------------------------------
    // Approve Report
    // ---------------------------------------
    const handleApprove = async () => {

        try {

            setLoading(true);

            await approveReport(reportId);

            setApproved(true);

            alert("✅ Report Approved Successfully!");

        } catch (err) {

            console.error(err);

            alert("Failed to approve report.");

        } finally {

            setLoading(false);

        }

    };

    // ---------------------------------------
    // Regenerate Report
    // ---------------------------------------
    const handleRegenerate = async (feedback) => {

        try {

            setLoading(true);

            const response = await generateReport(
                topic,
                feedback
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

            // New report is always draft
            setApproved(false);

            setShowFeedback(false);

            alert(
                "✅ Report regenerated successfully!"
            );

        } catch (err) {

            console.error(err);

            alert(
                "Unable to regenerate report."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800">
                Human Review
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
                Review the generated report before approving it.
            </p>

            {/* Approval Buttons */}

            <ApprovalActions
                loading={loading}
                approved={approved}
                onApprove={handleApprove}
                onReject={() =>
                    setShowFeedback(true)
                }
            />

            {/* Feedback */}

            {
                showFeedback && (

                    <FeedbackForm
                        loading={loading}
                        onCancel={() =>
                            setShowFeedback(false)
                        }
                        onRegenerate={
                            handleRegenerate
                        }
                    />

                )
            }

            {/* Download */}

            <div className="mt-6">

                <DownloadButton
                    reportId={reportId}
                    topic={topic}
                    approved={approved}
                />

            </div>

        </div>

    );

}