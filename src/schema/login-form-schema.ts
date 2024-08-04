import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email!" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 8 character!" }),
});

type LoginFormProps = z.infer<typeof LoginSchema>;

export type { LoginFormProps };
export default LoginSchema;
