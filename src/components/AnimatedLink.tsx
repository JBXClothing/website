import React from 'react';
import Link from 'next/link';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className="relative group pb-1">
        {children}
        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      </a>
    </Link>
  );
};

export default AnimatedLink;
