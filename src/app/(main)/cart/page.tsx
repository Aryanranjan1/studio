
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-8 font-headline text-4xl font-bold">
            Your Shopping Cart
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your cart is currently empty. Add some items to get started!
          </p>
          <Button asChild className="mt-8">
            <Link href="/store">Continue Shopping</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
