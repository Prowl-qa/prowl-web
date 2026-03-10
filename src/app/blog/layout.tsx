import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>
      <Footer />
    </>
  );
}
