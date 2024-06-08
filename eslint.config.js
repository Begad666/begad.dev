import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		files: ["**/*.ts","**/*.js"],
		rules: {
			"arrow-body-style": "error",
			"constructor-super": "error",
			eqeqeq: ["error", "smart"],
			"guard-for-in": "error",
			"id-blacklist": "off",
			"id-match": "off",
			"no-template-curly-in-string": "error",
			"no-constant-binary-expression": "error",
			"no-bitwise": "error",
			"no-caller": "error",
			"no-console": [
				"error",
				{
					allow: [
						"log",
						"warn",
						"dir",
						"time",
						"timeEnd",
						"timeLog",
						"assert",
						"clear",
						"count",
						"countReset",
						"group",
						"groupEnd",
						"table",
						"dirxml",
						"error",
						"groupCollapsed",
						"Console",
						"profile",
						"profileEnd",
						"timeStamp",
						"context"
					]
				}
			],
			"no-debugger": "error",
			"no-empty": ["error", { allowEmptyCatch: true }],
			"no-eval": "error",
			"no-fallthrough": "error",
			"no-new-wrappers": "error",
			"no-restricted-imports": ["error", "rxjs/Rx"],
			"no-throw-literal": "error",
			"no-undef-init": "error",
			"no-underscore-dangle": "off",
			"no-var": "error",
			"prefer-const": "error",
			radix: "error",
			yoda: ["error", "never", { exceptRange: true }],
			"no-alert": "warn",
			"no-await-in-loop": "error",
			"no-warning-comments": "warn",
			"no-constructor-return": "error"
		},
	},
	{
		files: ["**/*.ts"],
		rules: {
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/consistent-type-definitions": "error",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/dot-notation": "off",
			"@typescript-eslint/explicit-member-accessibility": [
				"off",
				{ accessibility: "explicit" },
			],
			"@typescript-eslint/member-ordering": [
				"error",
				{
					default: [
						"signature",
						"call-signature",
						"public-static-field",
						"protected-static-field",
						"private-static-field",
						"#private-static-field",
						"public-decorated-field",
						"protected-decorated-field",
						"private-decorated-field",
						"public-instance-field",
						"protected-instance-field",
						"private-instance-field",
						"#private-instance-field",
						"public-abstract-field",
						"protected-abstract-field",
						"public-field",
						"protected-field",
						"private-field",
						"#private-field",
						"static-field",
						"instance-field",
						"abstract-field",
						"decorated-field",
						"field",
						"static-initialization",
						"public-constructor",
						"protected-constructor",
						"private-constructor",
						"constructor",
						["public-static-get", "public-static-set"],
						["protected-static-get", "protected-static-set"],
						["private-static-get", "private-static-set"],
						["#private-static-get", "#private-static-set"],
						["public-decorated-get", "public-decorated-set"],
						["protected-decorated-get", "protected-decorated-set"],
						["private-decorated-get", "private-decorated-set"],
						["public-instance-get", "public-instance-set"],
						["protected-instance-get", "protected-instance-set"],
						["private-instance-get", "private-instance-set"],
						["#private-instance-get", "#private-instance-set"],
						["public-abstract-get", "public-abstract-set"],
						["protected-abstract-get", "protected-abstract-set"],
						["public-get", "public-set"],
						["protected-get", "protected-set"],
						["#private-get", "#private-set"],
						["instance-get", "instance-set"],
						["abstract-get", "abstract-set"],
						["decorated-get", "decorated-set"],
						["get", "set"],
						"public-static-method",
						"protected-static-method",
						"private-static-method",
						"#private-static-method",
						"public-decorated-method",
						"protected-decorated-method",
						"private-decorated-method",
						"public-instance-method",
						"protected-instance-method",
						"private-instance-method",
						"#private-instance-method",
						"public-abstract-method",
						"protected-abstract-method",
						"public-method",
						"protected-method",
						"private-method",
						"#private-method",
						"static-method",
						"instance-method",
						"abstract-method",
						"decorated-method",
						"method",
					],
				},
			],
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: [
						"classProperty",
						"objectLiteralProperty",
						"typeProperty",
						"classMethod",
						"objectLiteralMethod",
						"typeMethod",
						"accessor",
						"enumMember",
					],
					format: null,
					modifiers: ["requiresQuotes"],
				},
				{
					selector: "classProperty",
					modifiers: ["static"],
					format: ["UPPER_CASE"],
				},
			],
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-empty-interface": [
				"error",
				{ allowSingleExtends: true },
			],
			"@typescript-eslint/no-inferrable-types": [
				"error",
				{ ignoreParameters: true },
			],
			"@typescript-eslint/no-misused-new": "error",
			"@typescript-eslint/no-non-null-assertion": "warn",
			"@typescript-eslint/no-shadow": ["warn", { hoist: "all" }],
			"@typescript-eslint/no-unused-expressions": "error",
			"@typescript-eslint/prefer-function-type": "error",
			"@typescript-eslint/unified-signatures": "error",
		},
	}
	{
		ignores: ["build/", ".svelte-kit/", "dist/"]
	}
];
