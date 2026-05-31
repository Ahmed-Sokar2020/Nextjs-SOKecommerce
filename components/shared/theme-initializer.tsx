export const themeInitializerScript = `
  (function() {
    try {
      const storeData = localStorage.getItem('accent-color');
      if (storeData) {
        const parsed = JSON.parse(storeData);
        const savedColor = parsed.state?.color;
        if (savedColor) {
          document.documentElement.setAttribute('data-theme', savedColor);
          return;
        }
      }
      document.documentElement.setAttribute('data-theme', 'gold');
    } catch (e) {
      console.error("Accent color initialization failed:", e);
    }
  })();
`;
