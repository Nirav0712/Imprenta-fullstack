import { useEffect, useState } from "react";
import api from "../services/api";

const ThemeProvider = ({ children }) => {
  const [themeStyle, setThemeStyle] = useState("");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await api.get("/theme");
        if (response.data && response.data.theme) {
          const t = response.data.theme;
          const css = `
            :root {
              --theme-primary: ${t.colors.primary};
              --theme-secondary: ${t.colors.secondary};
              --theme-accent: ${t.colors.accent};
              --theme-heading: ${t.colors.heading};
              --theme-text: ${t.colors.paragraph};
              --theme-background: ${t.colors.background};
              --theme-surface: ${t.colors.surface};
              --theme-border: ${t.colors.border};
              --theme-button: ${t.colors.button};
              --theme-button-hover: ${t.colors.buttonHover};
              --theme-gradient-start: ${t.colors.gradientStart};
              --theme-gradient-end: ${t.colors.gradientEnd};
              
              --theme-radius: ${t.design.radius};
              --theme-shadow: ${t.design.shadow === 'none' ? 'none' :
              t.design.shadow === 'subtle' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' :
                t.design.shadow === 'medium' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' :
                  t.design.shadow === 'strong' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' :
                    '0 0 20px 0 rgba(11, 95, 165, 0.3)' /* luxury-glow */
            };
              
              --theme-heading-font: '${t.typography.headingFont}', sans-serif;
              --theme-body-font: '${t.typography.bodyFont}', sans-serif;
            }

            body {
              font-family: var(--theme-body-font) !important;
              background-color: var(--theme-background) !important;
              color: var(--theme-text) !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: var(--theme-heading-font) !important;
              color: var(--theme-heading) !important;
            }

            /* Google Fonts injection mapping for commonly used fonts */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
          `;
          setThemeStyle(css);
        }
      } catch (error) {
        console.error("Failed to fetch theme, using defaults.", error);
        // Default Imprenta Ocean 
        setThemeStyle(`
          :root {
              --theme-primary: #0B5FA5;
              --theme-secondary: #123B73;
              --theme-accent: #00AEEF;
              --theme-heading: #FFFFFF;
              --theme-text: #9FB3C8;
              --theme-background: #061525;
              --theme-surface: #12263A;
              --theme-border: #29435C;
              --theme-button: #00AEEF;
              --theme-button-hover: #0095D1;
              --theme-gradient-start: #123B73;
              --theme-gradient-end: #00AEEF;
              --theme-radius: 12px;
              --theme-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              --theme-heading-font: 'Poppins', sans-serif;
              --theme-body-font: 'Inter', sans-serif;
          }
          body {
            font-family: var(--theme-body-font) !important;
            background-color: var(--theme-background) !important;
            color: var(--theme-text) !important;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--theme-heading-font) !important;
            color: var(--theme-heading) !important;
          }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        `);
      }
    };
    fetchTheme();
  }, []);

  return (
    <>
      <style>{themeStyle}</style>
      {children}
    </>
  );
};

export default ThemeProvider;
