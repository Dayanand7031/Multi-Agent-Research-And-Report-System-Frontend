import api from "./api";

export const getReports = () => {
    return api.get("/research/reports");
};

export const getReport = (reportId) => {
    return api.get(`/research/reports/${reportId}`);
};

export const approveReport = (reportId) => {
    return api.patch(`/research/reports/${reportId}/approve`);
};

export const deleteReport = (reportId) => {
    return api.delete(`/research/reports/${reportId}`);

};

export const downloadPDF = (reportId) => {

    return api.get(

        `/research/reports/${reportId}/pdf`,

        {
            responseType: "blob"
        }

    );

};