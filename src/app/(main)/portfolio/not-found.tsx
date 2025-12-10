
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px' }}>
      <h1>404 - Project Not Found (Custom)</h1>
      <p style={{ marginBottom: '24px' }}>I can see the project page, but I couldn't find the specific project data.</p>
      <Button asChild>
        <Link href="/portfolio">Back to Portfolio</Link>
      </Button>
    </div>
  );
}
