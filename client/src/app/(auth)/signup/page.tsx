"use client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/schemas/signupSchema"
import axios, { Axios, AxiosError } from "axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const Signup = () => {
    const [username, setUsername] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isCheckigUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [debouncedUsername, setDebouncedUsername] = useDebounceValue(username, 300)
    const router = useRouter()

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            display_name: "",
            username: "",
            password: "",
            email: ""
        }
    })

    useEffect(() => {
        const checkingUsernameUnique = async () => {
            if (debouncedUsername) {
                console.log(debouncedUsername)
                setIsCheckingUsername(true);
                setUsernameMessage('')
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/check-username?username=${debouncedUsername}`
                    )
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    setUsernameMessage('Error checking username')
                } finally {
                    setIsCheckingUsername(false)
                }

            }
        }
        checkingUsernameUnique()
    }, [debouncedUsername])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`, data)
            toast("Signup successfull")
            console.log(response)
            router.replace('/')
        } catch (error) {
            toast(`Signup failed \n${error}`)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md" >
                <div className="text-center" >
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6" >
                        STORY FORGE
                    </h1>
                    <p className="mb-4">
                        Sign up to start adventure journey.
                    </p>
                </div>
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="display_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="display name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setUsername(e.target.value)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting} >
                            {
                                isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                    </>
                                ) : ('Signup')
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
export default Signup