import Link from "next/link";

import useWishlistState from "../hooks/useWishlistState";
import useSnipcartCount from "../hooks/useSnipcartCount";
import { useEffect, useState } from "react";
import { Heart, ShoppingCartIcon, UserIcon } from "lucide-react";
import AnimatedLink from "./AnimatedLink";

const Layout = ({ children }) => {
  const { hasItems } = useWishlistState();
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <header className="py-4 md:py-6 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <nav className="flex items-center justify-start space-x-4 mb-4 md:mb-0">
              <AnimatedLink href="/about">About</AnimatedLink>
              <AnimatedLink href="/terms-of-sale">Terms of Sale</AnimatedLink>
            </nav>

            <div className="flex-1 flex items-center justify-center space-x-4 mb-4 md:mb-0">
              <AnimatedLink href="/">Home</AnimatedLink>
            </div>

            <div className="flex items-center space-x-3">
              <button
                className="p-2 text-gray-800 hover:text-blue-600 rounded-md transition"
                aria-label="User login"
              >
                <UserIcon />
              </button>
              <Link href="/wishlist" legacyBehavior>
                <a
                  className="relative p-2 text-gray-800 hover:text-blue-600 rounded-md transition"
                  aria-label="Wishlist"
                >
                  {hasItems && (
                    <span className="absolute bg-red-500 rounded-full w-2 h-2 top-0 right-0 -mt-1 -mr-1"></span>
                  )}
                  <Heart />
                </a>
              </Link>
              <button
                className="snipcart-checkout relative p-2 text-gray-800 hover:text-blue-600 rounded-md transition"
                aria-label="Cart"
              >
                {cartHasItems && (
                  <span className="absolute bg-blue-600 rounded-full w-2 h-2 top-0 right-0 -mt-1 -mr-1"></span>
                )}
                <ShoppingCartIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-6 md:py-12">
        <div className="max-w-6xl mx-auto px-6">{children}</div>
      </main>
      <footer className="max-w-6xl mx-auto px-6">
        <div className="py-6 border-t border-gray-100 text-center flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm">
            Built by{" "}
            <a
              href="https://twitter.com/jbxclothing"
              title="Follow the creator on Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0.5 text-gray-800 hover:text-blue-600"
            >
              @jbxclothing
            </a>
          </p>
          <nav className="flex items-center justify-end space-x-3 md:space-x-6">
            <Link href="/about" legacyBehavior>
              <a className="text-gray-800 hover:text-blue-600 p-1 transition text-sm">
                FAQ
              </a>
            </Link>
            <Link href="/terms-of-sale" legacyBehavior>
              <a className="text-gray-800 hover:text-blue-600 p-1 transition text-sm">
                Terms of Sale
              </a>
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Layout;
