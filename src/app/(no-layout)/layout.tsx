
// This layout is for pages that should not have the main header/sidebar,
// like login, signup, or the admin panel.

export default function NoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
