// @/app/login/page.tsx

// "use client";

// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from "@/hooks/use-toast";

// export default function LoginPage() {
//   const { toast } = useToast();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Aquí iría la lógica de autenticación cuando se implemente
//     toast({
//       title: "Login Attempt",
//       description: "Login functionality is not implemented yet.",
//     });
//   };

//   return (
//     <div className="flex items-center justify-center py-12">
//       <Card className="w-full max-w-md shadow-xl">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gradient-custom">Login to Houzze Tec</CardTitle>
//           <CardDescription>Enter your credentials to access your account.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="you@example.com" required />
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>
//                 <Link href="#" className="text-sm text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>
//               <Input id="password" type="password" required />
//             </div>
//             <Button type="submit" className="w-full bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:opacity-90 text-primary-foreground">
//               Login
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col items-center space-y-2">
//           <p className="text-sm text-muted-foreground">
//             Don't have an account?{' '}
//             <Button variant="link" asChild className="text-primary p-0 h-auto">
//               <Link href="/register">Sign up</Link>
//             </Button>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

