import { useEffect, useState } from "react";

const steps = [
    "🧠 Orchestrator Agent is planning research...",
    "🔍 Research Agent is searching the web...",
    "📊 Analyst Agent is extracting insights...",
    "✍️ Writer Agent is generating the report...",
    "✅ Fact Checker Agent is verifying claims..."
];

export default function LoadingSpinner() {

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentStep((prev) => {

                if (prev < steps.length - 1) {
                    return prev + 1;
                }

                return prev;

            });

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-[500px] p-8">

                <div className="flex justify-center">

                    <div
                        className="
                            w-16
                            h-16
                            border-4
                            border-blue-200
                            border-t-blue-600
                            rounded-full
                            animate-spin
                        "
                    ></div>

                </div>

                <h2 className="text-2xl font-bold text-center mt-6">

                    Generating Research Report...

                </h2>

                <p className="text-center text-gray-500 mt-2">

                    Please wait while our AI agents collaborate.

                </p>

                <div className="mt-8 space-y-3">

                    {steps.map((step, index) => (

                        <div
                            key={index}
                            className={`
                                flex
                                items-center
                                gap-3
                                rounded-lg
                                p-3
                                transition
                                ${
                                    index <= currentStep
                                        ? "bg-blue-50 text-blue-700"
                                        : "bg-gray-100 text-gray-400"
                                }
                            `}
                        >

                            {index < currentStep ? (
                                <span>✅</span>
                            ) : index === currentStep ? (
                                <div
                                    className="
                                        w-4
                                        h-4
                                        border-2
                                        border-blue-500
                                        border-t-transparent
                                        rounded-full
                                        animate-spin
                                    "
                                />
                            ) : (
                                <span>⏳</span>
                            )}

                            <span className="font-medium">
                                {step}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}