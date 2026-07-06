import api from "./api";

export const generateReport = (topic, feedback = "") => {
    return api.post("/research", {
        topic,
        feedback,
    });
};