import { downloadPDF } from "../../api/reportApi";

export default function DownloadButton({
    reportId,
    topic,
    approved
}) {

    const handleDownload = async () => {

        if (!approved) {
            alert("Please approve the report before downloading.");
            return;
        }

        try {

            const response = await downloadPDF(
                reportId
            );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const url = window.URL.createObjectURL(
                blob
            );

            const link =
                document.createElement("a");

            link.href = url;

            link.download = `${topic}.pdf`;

            document.body.appendChild(
                link
            );

            link.click();

            document.body.removeChild(
                link
            );

            window.URL.revokeObjectURL(
                url
            );

        }

        catch (err) {

            console.error(err);

            alert(
                "Unable to download PDF."
            );

        }

    };

    return (

        <button
            onClick={handleDownload}
            disabled={!approved}
            className={`
                w-full
                rounded-lg
                py-3
                font-semibold
                text-white
                transition

                ${
                    approved
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                }
            `}
        >

            {
                approved
                    ? "📥 Download PDF"
                    : "📄 Download (Approve First)"
            }

        </button>

    );

}