export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center bg-black text-white h-screen">
      {children}
    </div>
  );
}
