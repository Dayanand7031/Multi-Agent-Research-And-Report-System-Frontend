export default function MetadataCard({ metadata }) {

    if (!metadata) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    📊 Report Metadata
                </h2>

                <p className="text-gray-500">
                    No report selected.
                </p>
            </div>
        );
    }

    const cards = [
        {
            title: "Confidence",
            value: `${metadata.confidence ?? 0}%`,
            icon: "🎯"
        },
        {
            title: "Coverage",
            value: `${metadata.coverage ?? 0}%`,
            icon: "📊"
        },
        {
            title: "Quality",
            value: metadata.quality ?? "-",
            icon: "⭐"
        },
        {
            title: "Execution Time",
            value: `${metadata.execution_time ?? 0}s`,
            icon: "⏱️"
        },
        {
            title: "Verified",
            value: metadata.verified ?? 0,
            icon: "✔️"
        },
        {
            title: "Unverified",
            value: metadata.unverified ?? 0,
            icon: "⚠️"
        },
        {
            title: "Contradicted",
            value: metadata.contradicted ?? 0,
            icon: "❌"
        },
        {
            title: "Sources",
            value: metadata.sources ?? 0,
            icon: "📚"
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
                📊 Report Metadata
            </h2>

            <div className="grid grid-cols-2 gap-4">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="
                            border
                            rounded-xl
                            p-4
                            bg-gray-50
                            hover:bg-blue-50
                            transition
                        "
                    >

                        <div className="text-2xl">
                            {card.icon}
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                            {card.title}
                        </p>

                        <p className="text-xl font-bold text-gray-800 mt-1">
                            {card.value}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}