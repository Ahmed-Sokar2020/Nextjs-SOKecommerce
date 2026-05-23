"use html";

export default function ThemeInitializer() {
  const code = `
    (function() {
      try {
        // 1. Read your exact localStorage key
        const storeData = localStorage.getItem('accent-color');
        if (storeData) {
          const parsed = JSON.parse(storeData);
          // 2. Safely grab the saved accent color from Zustand's state wrapper
          const savedColor = parsed.state?.color;

          if (savedColor) {
            // 3. Set the data-theme attribute on <html> before the body renders
            document.documentElement.setAttribute('data-theme', savedColor);
          }
        } else {
          // Fallback to default if no storage exists yet
          document.documentElement.setAttribute('data-theme', 'gold');
        }
      } catch (e) {
        console.error("Accent color initialization failed:", e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
