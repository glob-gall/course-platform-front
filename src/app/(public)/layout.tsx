// import type { Metadata } from "next";
import ModeToggle from "@/components/ModeToggle";


// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <main className="w-full">
        {children}
      </main>
      <div className="absolute top-4 right-4">
        <ModeToggle/>
      </div>
    </div>
  );
}
