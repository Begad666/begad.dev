import { verificationErrorDescriptions, verify } from "$lib/turnstile";
import { fail } from "@sveltejs/kit";
import { validate } from "email-validator";
import type { Actions } from "./$types";

export const prerender = false;

export const actions = {
	default: async ({ request, getClientAddress, platform }) => {
		const body = await request.formData();
		let email = body.get("email");
		let message = body.get("message");
		if (!email) {
			return fail(400, { email, message, error: "No email was provided." });
		}
		email = `${email}`;
		if (!validate(email)) {
			return fail(400, { email, message, error: "Invalid email." });
		}
		if (!message) {
			return fail(400, { email, message, error: "No message was provided." });
		}
		message = `${message}`;
		if (message.length > 500) {
			return fail(400, { email, message, error: "Message exceeds 500 characters." });
		}

		const token = body.get("cf-turnstile-response");
		if (!token) {
			return fail(400, { email, message, error: "Invalid CAPTCHA." });
		}
		const ip = getClientAddress();

		const verification = await verify(`${token}`, ip, "contact-submit");
		if (!verification.success) {
			return fail(400, {
				email,
				message,
				error: verification.errors.map((v) => verificationErrorDescriptions[v]).join("\n")
			});
		}
		const ps = await platform!.env.DB.prepare(
			`INSERT INTO messages (email, message, created_at) VALUES (?, ?, ?)`
		)
			.bind(email, message, new Date().toISOString())
			.run();
		if (ps.success) {
			return { success: true };
		}
		console.error(ps);
		return fail(500, {
			success: false,
			error: "An internal error occurred. Please try again later."
		});
	}
} satisfies Actions;
