import { FormEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import { signIn } from '../utils/auth';

export default function SignInPage() {
  const [name, setName] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn(name.trim() || 'User');
    window.location.href = '/dashboard';
  }

  return (
    <>
      <Navbar ctaHref="/signup" ctaLabel="Create account" />
      <main className="page">
        <section className="card">
          <h2>Sign In</h2>
          <p className="muted">Use any username and password to continue.</p>
          <form className="formGrid" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name">Username</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="jane.doe"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" required />
            </div>
            <button className="btn btnPrimary" type="submit">
              Log in
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
