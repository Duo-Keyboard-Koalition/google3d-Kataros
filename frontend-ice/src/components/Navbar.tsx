type NavbarProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Navbar({ ctaHref = '/signin', ctaLabel = 'Sign In' }: NavbarProps) {
  return (
    <header className="navShell">
      <nav className="navBar">
        <a className="brand" href="/">
          SkyPortal
        </a>
        <div className="navLinks">
          <a href="/">Home</a>
          <a href="/signup">Sign Up</a>
          <a href="/signin">Sign In</a>
        </div>
        <a className="btn btnPrimary" href={ctaHref}>
          {ctaLabel}
        </a>
      </nav>
    </header>
  );
}
