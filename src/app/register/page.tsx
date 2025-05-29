// @/app/register/page.tsx
// "use client"; // Habilita funcionalidades del lado del cliente (como hooks y eventos)

// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from "@/hooks/use-toast";

// export default function RegisterPage() {
//   const { toast } = useToast(); // Hook para mostrar notificaciones (toasts)

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Acción al enviar el formulario de registro
//     toast({
//       title: "Registration Attempt",
//       description: "Registration functionality is not implemented yet.",
//     });
//   };

//   return (
//     <div className="flex items-center justify-center py-12">
//       {/* Tarjeta del formulario */}
//       <Card className="w-full max-w-md shadow-xl">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold text-gradient-custom">Create an Account</CardTitle>
//           <CardDescription>Join Houzze Tec to discover amazing tech products.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Nombre completo */}
//             <div className="space-y-2">
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input id="fullName" type="text" placeholder="John Doe" required />
//             </div>
//             {/* Correo electrónico */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="you@example.com" required />
//             </div>
//             {/* Contraseña */}
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" type="password" required />
//             </div>
//             {/* Confirmación de contraseña */}
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input id="confirmPassword" type="password" required />
//             </div>
//             {/* Botón para enviar el formulario */}
//             <Button type="submit" className="w-full bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:opacity-90 text-primary-foreground">
//               Create Account
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col items-center space-y-2">
//           {/* Enlace para iniciar sesión si ya tiene cuenta */}
//           <p className="text-sm text-muted-foreground">
//             Already have an account?{' '}
//             <Button variant="link" asChild className="text-primary p-0 h-auto">
//               <Link href="/login">Login</Link>
//             </Button>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
