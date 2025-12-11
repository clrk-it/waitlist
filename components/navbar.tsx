export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-center border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <span className="text-lg font-bold text-primary">U</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">
              UTD Club Store
            </span>
            <span className="text-xs text-muted-foreground">
              Official Marketplace
            </span>
          </div>
        </div>

        {/* Navigation Items (Placeholder for future) */}
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
