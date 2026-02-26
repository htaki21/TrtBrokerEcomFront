import Footer from "../components/footer/footer";
import Header from "../components/header/header";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content" className="pt-[88px] max-mobile:pt-[72px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
