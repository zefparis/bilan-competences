"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FormData = {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })

    if (result?.error) {
      toast.error("Email ou mot de passe incorrect")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              {...register("email", { required: true })}
            />
          </div>
          
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input 
              id="password" 
              type="password" 
              {...register("password", { required: true })}
            />
          </div>
          
          <Button type="submit" className="w-full">Se connecter</Button>
        </form>
      </div>
    </div>
  )
}
