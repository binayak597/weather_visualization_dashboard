
import './globals.css';

export const metadata = {
  title: "Weather Dashboard",
  description: "View historical weather data interactively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
