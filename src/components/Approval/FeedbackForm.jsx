import { useState } from "react";

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

        <div className="mt-6 border-t pt-6">

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Improve the Report
            </h3>

            <p className="text-sm text-gray-500 mb-4">
                Tell the AI what should be improved before regenerating the report.
            </p>

            <textarea
                rows={5}
                value={feedback}
                onChange={(e) =>
                    setFeedback(e.target.value)
                }
                placeholder="Example: Add more statistics, improve market analysis, include recent trends..."
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    p-3
                    resize-none
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-500
                "
            />

            <div className="flex justify-end gap-3 mt-4">

                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        px-5
                        py-2
                        rounded-lg
                        border
                        border-gray-300
                        hover:bg-gray-100
                        transition
                    "
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                        px-5
                        py-2
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
                        loading
                            ? "Generating..."
                            : "🔄 Regenerate Report"
                    }
                </button>

            </div>

        </div>

    );

}