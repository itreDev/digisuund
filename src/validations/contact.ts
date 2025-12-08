import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nimi on kohustuslik")
    .min(2, "Nimi peab olema vähemalt 2 tähemärki")
    .max(50, "Nimi ei tohi ületada 50 tähemärki"),
  email: z
    .string()
    .min(1, "E-post on kohustuslik")
    .email("Palun sisesta kehtiv e-posti aadress"),
  phone: z.string().min(1, "Telefon on kohustuslik"),
  // .refine(
  //   (val) => !val || /^(\+372|0)?[0-9]{7,8}$/.test(val.replace(/\s/g, "")),
  //   "Palun sisesta kehtiv telefoni number (nt: +372 1234 5678)"
  // ),
  message: z
    .string()
    .min(1, "Sõnum on kohustuslik")
    .min(5, "Sõnum peab olema vähemalt 5 tähemärki")
    .max(1000, "Sõnum ei tohi ületada 1000 tähemärki"),
  newsletter: z.boolean().refine((val) => val === true, {
    message: "Palun nõustu uudiskirjaga liitumisega",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
