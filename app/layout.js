import "./globals.css";

export const metadata = {
  title: "EMD — Generador de Contenido",
  description:
    "Formulario para la generación de imágenes y vídeo con IA mediante flujos automatizados.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
