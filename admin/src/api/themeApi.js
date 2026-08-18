import API from "../config/axios";

export const themeApi = {
    getTheme: async () => {
        const { data } = await API.get("/theme");
        return data.theme;
    },

    updateTheme: async (themeData) => {
        const { data } = await API.put("/theme", themeData);
        return data.theme;
    },
};
