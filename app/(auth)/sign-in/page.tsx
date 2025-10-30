"use client"

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result  = await signInWithEmail(data);
      if(result.success) router.push("/")
    } catch (e) {
      console.log(e);
      toast.error('Sign in failed', {
        description:'Failed to sign in.'
    })
    }
  };
  
  return (
    <>
      <h1 className="form-title">Welcome back</h1>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="email"
        label="Email"
        placeholder="sai@email.com"
        register={register}
        error={errors.email}
        validation={{required:'Email is required',pattern: /^\w+@\w+\.\w+$/ }}
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        validation={{required:'Pas is required',minLength:8}}
      />

      <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />

      </form>
    </>
  );
};

export default SignIn;
