"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { registerUser } from "@/services/api";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isPasswordMismatch =
    confirmPassword !== "" && password !== confirmPassword;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await registerUser({
        email: email,
        password: password,
      });

      if (res && res.token) {
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        console.log('Register Failed');
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error", err);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Create an account</CardTitle>
          {/* <CardDescription>
            Enter your email below to login to your account
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                <Input
                  id="full-name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="test@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="confirm-password"
                    className={isPasswordMismatch ? "text-red-500" : ""}
                  >
                    Confirm Password
                  </FieldLabel>
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="********"
                  className={
                    isPasswordMismatch
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
                {isPasswordMismatch && (
                  <FieldDescription className="text-sm text-red-500">
                    Password Mismatch
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button
                  disabled={isPasswordMismatch || !password}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin" />
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/signin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
