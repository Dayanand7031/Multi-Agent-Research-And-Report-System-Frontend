export default function ApprovalActions({
    loading,
    approved,
    onApprove,
    onReject
}) {

    return (

        <div className="flex gap-4">

            {/* Approve */}
            <button
                onClick={onApprove}
                disabled={loading || approved}
                className={`
                    flex-1
                    rounded-lg
                    py-3
                    font-semibold
                    text-white
                    transition

                    ${
                        approved
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    }

                    ${
                        loading
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                    }
                `}
            >

                {
                    approved
                        ? "✔ Approved"
                        : "✅ Approve"
                }

            </button>

            {/* Reject */}
            <button
                onClick={onReject}
                disabled={loading}
                className="
                    flex-1
                    rounded-lg
                    py-3
                    font-semibold
                    text-white
                    bg-red-600
                    hover:bg-red-700
                    transition
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                "
            >

                ❌ Reject

            </button>

        </div>

    );

}