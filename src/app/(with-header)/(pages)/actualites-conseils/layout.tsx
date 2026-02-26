// Enable ISR - revalidate every 30 minutes for blog listing page
export const revalidate = 1800;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
