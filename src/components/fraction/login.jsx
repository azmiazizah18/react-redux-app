import React from 'react';
import { Link } from 'react-router-dom';
import { BsChatText } from "react-icons/bs";
import { Input } from '@/components/design/input';
import { Button } from '@/components/design/button';
import PropTypes from 'prop-types';

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const isSubmitDisabled = !email || !password;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <div className="container flex flex-col items-center max-w-md">
      <h4 className="font-extrabold leading-tight text-royalblue mb-6">
        <Link to="/" className="flex items-center gap-1 text-royalblue">
          <BsChatText size={25} />
          <span className="hidden md:inline">DICODING FORUM</span>
        </Link>
      </h4>
      <form className="container flex max-w-md flex-col items-center" onSubmit={handleSubmit}>
        <div className="mb-6 space-y-2 text-center">
          <h1>MASUK</h1>
          <p>Selamat datang di <strong className="font-bold text-royalblue">React App.</strong></p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="leejeno@gmail.com"
          />

          <Input
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="LeeJeno123"
          />
        </div>

        <Button type="submit" pill disabled={isSubmitDisabled} className="mb-2">
          Masuk
        </Button>

        <div className="flex justify-center gap-1">
          <span className="text-sm">Belum punya akun?</span>
          <Button className="p-0 text-sm" to="/register" variant="link">
            Daftar di sini.
          </Button>
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
