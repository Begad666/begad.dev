import { env } from "$env/dynamic/private";

type VerificationErrorCf =
	| "missing-input-secret"
	| "invalid-input-secret"
	| "missing-input-response"
	| "invalid-input-response"
	| "invalid-widget-id"
	| "invalid-parsed-secret"
	| "bad-request"
	| "timeout-or-duplicate"
	| "internal-error";

const verificationErrorCfDescriptions: { [key in VerificationErrorCf]: string } = {
	"missing-input-secret": "The secret parameter was not passed.",
	"invalid-input-secret": "The secret parameter was invalid or did not exist.",
	"missing-input-response": "The response parameter was not passed.",
	"invalid-input-response": "The response parameter is invalid or has expired.",
	"invalid-widget-id":
		"The widget ID extracted from the parsed site secret key was invalid or did not exist.",
	"invalid-parsed-secret": "The secret extracted from the parsed site secret key was invalid.",
	"bad-request": "The request was rejected because it was malformed.",
	"timeout-or-duplicate": "The response parameter has already been validated before.",
	"internal-error":
		"An internal error happened while validating the response. The request can be retried."
};

const verificationErrorCfDescriptionsAlt: { [key in VerificationErrorCf]?: string } = {
	"invalid-input-response": "The CAPTCHA is invalid or has expired.",
	"bad-request": "The CAPTCHA was rejected because it was malformed.",
	"timeout-or-duplicate": "The CAPTCHA has already been validated before.",
	"internal-error":
		"An internal error happened while validating the CAPTCHA. Please try again later."
};

type VerificationErrorApp = "invalid-action" | "invalid-cdata";

const verificationErrorAppDescriptions: { [key in VerificationErrorApp]: string } = {
	"invalid-action": "Invalid action.",
	"invalid-cdata": "Invalid cdata."
};

export type VerificationError = VerificationErrorCf | VerificationErrorApp;

export const verificationErrorDescriptions: { [key in VerificationError]: string } = {
	...verificationErrorCfDescriptions,
	...verificationErrorCfDescriptionsAlt,
	...verificationErrorAppDescriptions
};

export type VerificationResult =
	| {
			success: true;
			errors?: undefined;
	  }
	| {
			success: false;
			errors: (VerificationErrorCf | VerificationErrorApp)[];
	  };

export async function verify(
	token: string,
	ip: string,
	action?: string,
	cdata?: string
): Promise<VerificationResult> {
	const secretKey = env.TURNSTILE_SECRET_KEY;
	const formData = new FormData();
	formData.append("secret", secretKey);
	formData.append("response", token);
	formData.append("remoteip", ip);

	const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
	const response = await fetch(url, { body: formData, method: "POST" });

	const result = await response.json();
	if (result.success) {
		if ((action || result.action) && result.action !== action) {
			return {
				success: false,
				errors: ["invalid-action"]
			};
		}
		if ((cdata || result.cdata) && result.cdata !== cdata) {
			return {
				success: false,
				errors: ["invalid-cdata"]
			};
		}
		return {
			success: true
		};
	} else {
		return {
			success: false,
			errors: result["error-codes"]
		};
	}
}
