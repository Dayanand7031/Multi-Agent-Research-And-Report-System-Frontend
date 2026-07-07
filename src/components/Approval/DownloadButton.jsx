import { useState } from "react";

import {
    FaDownload,
    FaSpinner,
    FaLock
} from "react-icons/fa";

import { downloadPDF } from "../../api/reportApi";

export default function DownloadButton({
    reportId,
    topic,
    approved
}) {

    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {

        if (!approved) return;

        try {

            setDownloading(true);

            const response = await downloadPDF(
                reportId
            );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download = `${topic}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert(
                "Unable to download PDF."
            );

        }

        finally {

            setDownloading(false);

        }

    };

    return (

        <button

            onClick={handleDownload}

            disabled={!approved || downloading}

            className={`
                w-full
                flex
                items-center
                justify-center
                gap-3
                rounded-lg
                py-3
                font-semibold
                transition-all
                duration-200

                ${
                    approved
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }

                ${
                    downloading
                        ? "opacity-80 cursor-wait"
                        : ""
                }
            `}

        >

            {

                downloading ? (

                    <>

                        <FaSpinner className="animate-spin" />

                        <span>

                            Downloading PDF...

                        </span>

                    </>

                ) : approved ? (

                    <>

                        <FaDownload />

                        <span>

                            Download PDF

                        </span>

                    </>

                ) : (

                    <>

                        <FaLock />

                        <span>

                            Approve Report to Download

                        </span>

                    </>

                )

            }

        </button>

    );

}