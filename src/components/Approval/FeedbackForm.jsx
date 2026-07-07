import { useState } from "react";

import {
    FaCommentDots,
    FaArrowRotateRight,
    FaSpinner,
    FaTimes
} from "react-icons/fa";

export default function FeedbackForm({
    loading,
    onRegenerate,
    onCancel
}) {

    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {

        if (!feedback.trim()) {
            alert("Please enter feedback.");
            return;
        }

        onRegenerate(feedback);

        setFeedback("");

    };

    return (

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">

            {/* Header */}

            <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">

                    <FaCommentDots className="text-orange-600" />

                </div>

                <div>

                    <h3 className="text-lg font-semibold text-gray-800">

                        Request Changes

                    </h3>

                    <p className="text-sm text-gray-500">

                        Describe what should be improved before generating a new report.

                    </p>

                </div>

            </div>

            {/* Textarea */}

            <textarea

                rows={6}

                value={feedback}

                onChange={(e) =>
                    setFeedback(e.target.value)
                }

                placeholder="Example:
• Include more recent market statistics
• Improve competitor analysis
• Add references from academic sources
• Expand the conclusion"

                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    p-4
                    resize-none
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-500
                    transition
                "

            />

            <div className="flex justify-between items-center mt-2">

                <span className="text-xs text-gray-500">

                    {feedback.length} characters

                </span>

                <span className="text-xs text-gray-400">

                    Provide clear instructions for better results.

                </span>

            </div>

            {/* Actions */}

            <div className="flex justify-end gap-3 mt-6">

                <button

                    onClick={onCancel}

                    disabled={loading}

                    className="
                        flex
                        items-center
                        gap-2
                        px-5
                        py-2.5
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        hover:bg-gray-100
                        transition
                        disabled:opacity-60
                    "

                >

                    <FaTimes />

                    Cancel

                </button>

                <button

                    onClick={handleSubmit}

                    disabled={loading}

                    className="
                        flex
                        items-center
                        gap-2
                        px-5
                        py-2.5
                        rounded-lg
                        bg-orange-600
                        hover:bg-orange-700
                        text-white
                        font-semibold
                        transition
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                    "

                >

                    {

                        loading ? (

                            <>

                                <FaSpinner className="animate-spin" />

                                Regenerating...

                            </>

                        ) : (

                            <>

                                <FaArrowRotateRight />

                                Regenerate Report

                            </>

                        )

                    }

                </button>

            </div>

        </div>

    );

}