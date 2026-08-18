import { themeApi } from "../api/themeApi";

export const themeService = {
    getTheme() {
        return themeApi.getTheme();
    },

    updateTheme(data) {
        return themeApi.updateTheme(data);
    },
};
