import {
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner
} from "react-icons/fa";

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
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-200

                    ${
                        approved
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    }

                    ${
                        loading
                            ? "opacity-70 cursor-not-allowed"
                            : ""
                    }
                `}

            >

                {

                    loading ? (

                        <>

                            <FaSpinner className="animate-spin" />

                            <span>
                                Approving...
                            </span>

                        </>

                    ) : approved ? (

                        <>

                            <FaCheckCircle />

                            <span>
                                Approved
                            </span>

                        </>

                    ) : (

                        <>

                            <FaCheckCircle />

                            <span>
                                Approve Report
                            </span>

                        </>

                    )

                }

            </button>

            {/* Reject */}

            <button

                onClick={onReject}

                disabled={loading || approved}

                className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    py-3
                    font-semibold
                    text-white
                    bg-red-600
                    hover:bg-red-700
                    transition-all
                    duration-200
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                "

            >

                <FaTimesCircle />

                <span>
                    Request Changes
                </span>

            </button>

        </div>

    );

}