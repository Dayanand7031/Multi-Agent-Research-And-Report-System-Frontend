import { useEffect, useState } from "react";

import {
    FaProjectDiagram,
    FaSearch,
    FaChartBar,
    FaPenFancy,
    FaShieldAlt,
    FaCheckCircle
} from "react-icons/fa";

const steps = [
    {
        title: "Orchestrator Agent",
        description: "Planning research workflow...",
        icon: FaProjectDiagram,
    },
    {
        title: "Research Agent",
        description: "Searching and collecting information...",
        icon: FaSearch,
    },
    {
        title: "Analyst Agent",
        description: "Extracting insights from sources...",
        icon: FaChartBar,
    },
    {
        title: "Writer Agent",
        description: "Generating structured report...",
        icon: FaPenFancy,
    },
    {
        title: "Fact Checker",
        description: "Validating generated content...",
        icon: FaShieldAlt,
    },
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

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-[620px] max-w-[90%] p-8">

                {/* Spinner */}

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
                    />

                </div>

                {/* Heading */}

                <div className="text-center mt-6">

                    <h2 className="text-2xl font-bold text-gray-800">

                        Generating Research Report

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Multiple AI agents are collaborating to produce a
                        comprehensive research report.

                    </p>

                </div>

                {/* Progress */}

                <div className="mt-8 space-y-4">

                    {

                        steps.map((step, index) => {

                            const Icon = step.icon;

                            return (

                                <div

                                    key={index}

                                    className={`
                                        flex
                                        items-center
                                        gap-4
                                        rounded-xl
                                        border
                                        p-4
                                        transition-all
                                        duration-300
                                        ${
                                            index < currentStep
                                                ? "border-green-200 bg-green-50"
                                                : index === currentStep
                                                ? "border-blue-300 bg-blue-50 shadow"
                                                : "border-gray-200 bg-gray-50"
                                        }
                                    `}

                                >

                                    {/* Status */}

                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow">

                                        {

                                            index < currentStep ? (

                                                <FaCheckCircle className="text-green-600" />

                                            ) : (

                                                <Icon
                                                    className={
                                                        index === currentStep
                                                            ? "text-blue-600"
                                                            : "text-gray-400"
                                                    }
                                                />

                                            )

                                        }

                                    </div>

                                    {/* Text */}

                                    <div className="flex-1">

                                        <h3 className="font-semibold text-gray-800">

                                            {step.title}

                                        </h3>

                                        <p className="text-sm text-gray-500">

                                            {step.description}

                                        </p>

                                    </div>

                                    {/* Spinner */}

                                    {

                                        index === currentStep && (

                                            <div
                                                className="
                                                    w-5
                                                    h-5
                                                    border-2
                                                    border-blue-500
                                                    border-t-transparent
                                                    rounded-full
                                                    animate-spin
                                                "
                                            />

                                        )

                                    }

                                </div>

                            );

                        })

                    }

                </div>

                {/* Footer */}

                <div className="mt-8">

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{
                                width: `${((currentStep + 1) / steps.length) * 100}%`,
                            }}
                        />

                    </div>

                    <p className="text-center text-sm text-gray-500 mt-3">

                        Step {currentStep + 1} of {steps.length}

                    </p>

                </div>

            </div>

        </div>

    );

}