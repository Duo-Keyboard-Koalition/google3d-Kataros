import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar ctaHref="/signin" ctaLabel="Sign In" />
      <main className="page">
        <section className="hero">
          <h1>Welcome to SkyPortal</h1>
          <p>
            A simple React + TypeScript landing page with sign-in, sign-up, and a protected generic
            dashboard after login.
          </p>
          <div className="ctaRow">
            <a className="btn btnPrimary" href="/signin">
              Sign In
            </a>
            <a className="btn btnSecondary" href="/signup">
              Sign Up
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
