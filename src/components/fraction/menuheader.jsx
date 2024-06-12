import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsChatText } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { Input } from '@/components/design/input';
import { Button } from '@/components/design/button';
import { Loader } from '@/components/design/loader';
import { Dropdown } from '@/components/design/dropdown';
import { toast } from '@/components/design/toast';
import { Avatar } from '@/components/design/avatar';
import { authUserThunks } from '@/states/authuser';
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';

export function MenuHeader({ isStoreInitialized }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const leaderboard = useSelector((state) => state.leaderboard);
  const userPoints = authUser
    ? leaderboard?.find((item) => item.user.id === authUser.id)?.score ?? 0
    : 0;

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const handleLogout = async () => {
    try {
      await dispatch(authUserThunks.asyncLogout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearchChange = (newKeyword) => {
    if (location.pathname !== '/' && !location.pathname.includes('/nr')) {
      navigate('/');
    }
    setSearchParams({ keyword: newKeyword });
  };

  return (
    <header className="container mx-auto max-w-4xl sticky top-0 z-20 flex items-center justify-between gap-2 bg-transparant py-4 md:gap-4 px-4">
      {/* Logo */}
      <h4 className="font-extrabold leading-tight text-royalblue">
        <Link to="/" className="flex items-center gap-1 text-royalblue">
          <span className="hidden md:inline"></span>
        </Link>
      </h4>

      {/* Search Bar */}
      <Input
        pill
        type="search"
        value={keyword ?? ''}
        onChange={handleSearchChange}
        placeholder="Penelusuran..."
        className="grow center"
      />

      {/* User Section */}
      <div>
        {!isStoreInitialized ? (
          <Loader amount={1} className="h-11 w-24 rounded-3xl px-4 py-2" />
        ) : !authUser ? (
          <Button pill to="/login">
            Masuk
          </Button>
        ) : (
          <Dropdown open={isUserMenuOpen} onToggle={setIsUserMenuOpen}>
            <Dropdown.Trigger>
              <Button
                pill
                variant="outline-primary"
                size="small"
                className="flex items-center gap-2"
              >
                <Avatar
                  image={authUser.avatar}
                  name={authUser.name}
                  className="size-10 border border-royalblue ring-10"
                />
                <p className="max-w-32 truncate">{authUser.name}</p>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Body>
              <Dropdown.Item disabled className="font-bold text-black">
                <MdOutlineLeaderboard size={20} />
                {`${userPoints} point`}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                <AiOutlineLogin size={20} />
                Keluar
              </Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
        )}
      </div>

      {/* Logo */}
      <h4 className="font-extrabold leading-tight text-royalblue mx-auto">
        <Link to="/" className="flex items-center gap-1 text-black">
          <BsChatText size={25} />
          <span className="hidden md:inline">DICODING FORUM</span>
        </Link>
      </h4>
    </header>
  );
}

MenuHeader.propTypes = {
  isStoreInitialized: PropTypes.bool.isRequired,
};
