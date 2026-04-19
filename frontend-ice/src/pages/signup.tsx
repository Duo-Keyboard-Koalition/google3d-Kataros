import { FormEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import { signIn } from '../utils/auth';

export default function SignUpPage() {
  const [name, setName] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn(name.trim() || 'User');
    window.location.href = '/dashboard';
  }

  return (
    <>
      <Navbar ctaHref="/signin" ctaLabel="Already have an account?" />
      <main className="page">
        <section className="card">
          <h2>Create account</h2>
          <p className="muted">This is a simple demo sign-up flow.</p>
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
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="jane@site.com" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Create a password" required />
            </div>
            <button className="btn btnPrimary" type="submit">
              Sign up
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
