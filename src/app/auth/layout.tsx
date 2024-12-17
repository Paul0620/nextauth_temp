export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center bg-white text-black h-screen">
      {children}
    </div>
  );
}
