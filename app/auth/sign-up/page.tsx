"use client"

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function SingUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const [isPending, startStransition] = useTransition()

    const router = useRouter()
    const onSubmit = (data: z.infer<typeof signUpSchema>) => {
        startStransition(async ()=>{
            await authClient.signUp.email({
                email: data.email,
                name: data.name,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Sign up successfully")
                        router.push("/auth/login")
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    }
                }
            });
        });


    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Sign Up
                </CardTitle>
                <CardDescription>Create an accout to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller name="name" control={form.control} render={({field, fieldState})=>(
                            <Field>
                                <FieldLabel>Full name</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field} />
                                {fieldState.invalid &&(
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )} />

                        <Controller name="email" control={form.control} render={({field, fieldState})=>(
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="John@doe.com" type="email" {...field} />
                                {fieldState.invalid &&(
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )} />

                        <Controller name="password" control={form.control} render={({field, fieldState})=>(
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="*****" type="password" {...field} />
                                {fieldState.invalid &&(
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )} />
                        <Button disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <span>
                                    Sign Up
                                </span>
                            )}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}