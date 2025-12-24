import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Step 1: detect client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 2: redirect after mount
  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      router.replace('/login');
    }
  }, [mounted, user, router]);

  // Step 3: SAME output on server & first client render
  if (!mounted || !user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
