import { Metadata } from "next";
import { Header, Footer } from "@/src/components";
import { auth } from "@/src/auth.config";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "App Sales ",
  description: "Aplicacion sistema gestion de ventas",
};

export default async function SalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) redirect("/auth/login");

  return (
    <>
      <SessionProvider session={session}>
        <Header />
        {children}
        <Footer />
      </SessionProvider>
    </>
  );
}
