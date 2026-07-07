import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
    FaFileAlt,
    FaRobot
} from "react-icons/fa";

export default function ReportViewer({ report }) {

    return (

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">

                        <FaFileAlt className="text-blue-600 text-lg" />

                    </div>

                    <div>

                        <h2 className="text-2xl font-semibold text-gray-800">
                            Research Report
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Generated using the Multi-Agent Research System
                        </p>

                    </div>

                </div>

                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">

                    <FaRobot />

                    <span>AI Generated</span>

                </div>

            </div>

            {/* Report */}

            <div className="overflow-y-auto h-[calc(100vh-250px)] px-8 py-8 bg-gray-50">

                {

                    report ? (

                        <article
                            className="
                                prose
                                prose-lg
                                max-w-none

                                prose-headings:text-gray-800
                                prose-headings:font-bold

                                prose-p:text-gray-700
                                prose-p:leading-8

                                prose-li:text-gray-700

                                prose-strong:text-gray-900

                                prose-code:text-blue-700
                                prose-code:bg-blue-50
                                prose-code:px-1
                                prose-code:rounded

                                prose-pre:bg-gray-900
                                prose-pre:text-gray-100

                                prose-table:border
                                prose-th:bg-gray-100
                                prose-th:text-gray-800
                                prose-td:text-gray-700

                                prose-a:text-blue-600
                                prose-a:no-underline
                                hover:prose-a:underline
                            "
                        >

                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                            >
                                {report}
                            </ReactMarkdown>

                        </article>

                    ) : (

                        <div className="h-full flex flex-col items-center justify-center text-center">

                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                                <FaFileAlt className="text-blue-600 text-2xl" />

                            </div>

                            <h3 className="mt-6 text-xl font-semibold text-gray-700">
                                No Report Selected
                            </h3>

                            <p className="mt-2 text-gray-500 max-w-md">

                                Generate a new research report or select one from
                                the report history to view its contents.

                            </p>

                        </div>

                    )

                }

            </div>

        </div>

    );

}