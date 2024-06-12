import React from 'react';
import { Link } from 'react-router-dom';
import { BsChatText } from "react-icons/bs";
import { Input } from '@/components/design/input';
import { Button } from '@/components/design/button';
import PropTypes from 'prop-types';

export function RegisterForm({ onSubmit }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const isSubmitDisabled = !email || !password;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password, name });
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
          <h1>DAFTAR</h1>
          <p>Mari bergabung di <strong className="font-bold text-royalblue">React App.</strong></p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <Input
            type="text"
            value={name}
            onChange={setName}
            placeholder="Lee Jeno"
          />

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
          Daftar
        </Button>

        <div className="flex justify-center gap-1">
          <span className="text-sm">Sudah punya akun?</span>
          <Button className="p-0 text-sm" to="/login" variant="link">
            Masuk di sini.
          </Button>
        </div>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};