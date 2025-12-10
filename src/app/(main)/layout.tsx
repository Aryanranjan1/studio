
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* The Header component is removed to allow for a full-width layout */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
