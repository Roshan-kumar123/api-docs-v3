import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0 mx-25">
          <p className="text-center text-sm leading-loose md:text-left ">
            Built by Your Company. The source code is available on GitHub.
          </p>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/about">About Us</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </nav>
      </div>
    </footer>
  );
}