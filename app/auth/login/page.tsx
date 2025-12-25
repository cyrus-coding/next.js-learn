"use client"

import { loginSchema } from "@/app/schemas/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"


export default function LoginPage() {
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const router = useRouter()

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        startTransition(async()=>{
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged in successfully")
                        router.push("/")
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    }
                }
            })
        })
        
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle> Login to your account </CardTitle>
                <CardDescription> Enter your email below to login to your account</CardDescription>
                <CardAction>
                    <Link className={buttonVariants({
                        variant: "link"
                    })} href="/auth/sign-up"> Sign Up</Link>
                </CardAction>
            </CardHeader>
            
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                    <FieldGroup className="flex flex-col gap-6">
                        <Controller name="email" control={form.control} render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel> Email </FieldLabel>
                                <Input aria-invalid={fieldState.invalid} type="email"  {...field}/>
                                {fieldState.invalid &&(
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}/>
                        <Controller name="password" control={form.control} render={({field,fieldState}) => (
                            <Field>
                                <FieldLabel> Password </FieldLabel>
                                <Input aria-invalid={fieldState.invalid} type="password" {...field} />
                                {fieldState.invalid&&(
                                    <FieldError  errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}/>
                    </FieldGroup>
                </CardContent>
                <CardFooter className="flex-col gap-2 pt-4">
                    <Button disabled={isPending} type="submit" className="w-full">
                        {isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Loading</span>
                            </>
                        ) : (
                            <span>Login</span>
                        )}
                    </Button>
                </CardFooter>
            </form>

        </Card>


    )
}

