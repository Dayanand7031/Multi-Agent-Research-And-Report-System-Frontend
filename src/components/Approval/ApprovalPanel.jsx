import { useState } from "react";

import {
    FaClipboardCheck,
    FaInfoCircle
} from "react-icons/fa";

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

    loadingType,
    setLoadingType,

    setReport,
    setMetadata,
    setSelectedReportId
}) {

    const [showFeedback, setShowFeedback] = useState(false);

    // ----------------------------------------
    // Approve Report
    // ----------------------------------------
    const handleApprove = async () => {

        try {

            setLoadingType("approve");

            await approveReport(reportId);

            setApproved(true);

        }

        catch (err) {

            console.error(err);

            alert("Unable to approve report.");

        }

        finally {

           setLoadingType(null);

        }

    };

    // ----------------------------------------
    // Regenerate Report
    // ----------------------------------------
    const handleRegenerate = async (feedback) => {

        try {

            setLoadingType("regenerate");

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

            setApproved(false);

            setShowFeedback(false);

        }

        catch (err) {

            console.error(err);

            alert("Unable to regenerate report.");

        }

        finally {

            setLoadingType(null);

        }

    };

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            {/* Header */}

            <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center">

                    <FaClipboardCheck className="text-green-600 text-lg" />

                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">

                        Human Review

                    </h2>

                    <p className="text-sm text-gray-500">

                        Review the generated report before final approval.

                    </p>

                </div>

            </div>

            {/* Info Box */}

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 flex gap-3">

                <FaInfoCircle className="text-blue-600 mt-1 shrink-0" />

                <div>

                    <p className="font-medium text-blue-800">

                        Review Required

                    </p>

                    <p className="text-sm text-blue-700 mt-1">

                        Verify the report quality before approving it.
                        If improvements are needed, request changes and
                        regenerate the report with feedback.

                    </p>

                </div>

            </div>

            {/* Approval Buttons */}

            <div className="mt-6">

                {/* <ApprovalActions
                    loading={loading}
                    approved={approved}
                    onApprove={handleApprove}
                    onReject={() =>
                        setShowFeedback(true)
                    }
                /> */}
                <ApprovalActions
                    loading={loadingType === "approve"}
                    approved={approved}
                    onApprove={handleApprove}
                    onReject={() => setShowFeedback(true)}
                />

            </div>

            {/* Feedback */}

            {

                showFeedback && (

                    <div className="mt-6">

                        <FeedbackForm
                            loading={loading}
                            onCancel={() =>
                                setShowFeedback(false)
                            }
                            onRegenerate={
                                handleRegenerate
                            }
                        />

                    </div>

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