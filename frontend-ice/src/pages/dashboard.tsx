import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getStoredUser, isAuthenticated, signOut } from '../utils/auth';

export default function DashboardPage() {
  const [name, setName] = useState('User');

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/signin';
      return;
    }

    setName(getStoredUser());
  }, []);

  function onSignOut() {
    signOut();
    window.location.href = '/signin';
  }

  return (
    <>
      <Navbar ctaHref="/" ctaLabel="Back to home" />
      <main className="page">
        <h1>Dashboard</h1>
        <p className="muted">Welcome back, {name}.</p>

        <section className="dashboardShell">
          <h2>Generic dashboard</h2>
          <p className="muted">You are logged in. This is a simple placeholder dashboard view.</p>
          <div className="ctaRow">
            <a className="btn btnSecondary" href="/">
              Go to landing page
            </a>
            <button className="btn btnPrimary" onClick={onSignOut} type="button">
              Sign out
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
