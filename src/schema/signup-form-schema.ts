import z from "zod";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const SignupSchema = z.object({
  userName: z.string().min(1, { message: "Name is required!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email!" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required!" }),
  gender: z.string().min(1, { message: "Gender is required!" }),
  birthDay: z.string().refine((date) => DATE_REGEX.test(date), {
    message: "Birthday is invalid!",
  }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character!" }),
});

type SignupFormProps = z.infer<typeof SignupSchema>;

export type { SignupFormProps };
export default SignupSchema;
