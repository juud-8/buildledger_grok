import { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { Button } from '@/components/ui/button';
   import { Input } from '@/components/ui/input';
   import { signIn } from '@/lib/auth';

   export default function LoginPage() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       try {
         await signIn(email, password);
         navigate('/dashboard');
       } catch (err: any) {
         setError(err.message);
       }
     };

     return (
       <div className="flex min-h-screen items-center justify-center bg-background">
         <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-800 p-8">
           <h2 className="text-center text-2xl font-bold">BuildLedger Login</h2>
           {error && <p className="text-red-500">{error}</p>}
           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <label htmlFor="email" className="block text-sm font-medium">
                 Email
               </label>
               <Input
                 id="email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 className="mt-1"
               />
             </div>
             <div>
               <label htmlFor="password" className="block text-sm font-medium">
                 Password
               </label>
               <Input
                 id="password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 className="mt-1"
               />
             </div>
             <Button type="submit" className="w-full">
               Sign In
             </Button>
           </form>
         </div>
       </div>
     );
   }