import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/login');
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">BuildLedger</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </header>
  );
}