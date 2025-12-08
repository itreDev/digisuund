import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/validations/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = contactFormSchema.parse(body);

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
    const emailPort = parseInt(process.env.EMAIL_PORT || "587");
    const recipientEmail = process.env.RECIPIENT_EMAIL || emailUser;

    if (!emailUser || !emailPassword) {
      console.error("Email configuration is missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: `"Digisuund Website" <${emailUser}>`,
      to: recipientEmail,
      replyTo: validatedData.email,
      subject: `Uus kontakt: ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5a3e5b;">Uus kontakt Digisuund veebilehelt</h2>
          
          <div style="background-color: #f4f0f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nimi:</strong> ${validatedData.name}</p>
            <p><strong>E-post:</strong> <a href="mailto:${
              validatedData.email
            }">${validatedData.email}</a></p>
            ${
              validatedData.phone
                ? `<p><strong>Telefon:</strong> ${validatedData.phone}</p>`
                : ""
            }
            <p><strong>Uudiskiri:</strong> ${
              validatedData.newsletter ? "Jah" : "Ei"
            }</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #5a3e5b;">Sõnum:</h3>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
              ${validatedData.message}
            </p>
          </div>
        </div>
      `,
      text: `
Uus kontakt Digisuund veebilehelt

Nimi: ${validatedData.name}
E-post: ${validatedData.email}
${validatedData.phone ? `Telefon: ${validatedData.phone}` : ""}
Uudiskiri: ${validatedData.newsletter ? "Jah" : "Ei"}

Sõnum:
${validatedData.message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
