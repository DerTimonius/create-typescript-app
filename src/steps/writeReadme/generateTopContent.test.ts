import { describe, expect, it } from "vitest";

import { Options } from "../../shared/types.js";
import { generateTopContent } from "./generateTopContent.js";

const optionsBase = {
	access: "public",
	description: "Test description",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	mode: "create",
	owner: "test-owner",
	repository: "test-repository",
	title: "Test Title",
} satisfies Options;

describe("findExistingBadges", () => {
	it("generates full contents when there are no existing badges", () => {
		expect(generateTopContent(optionsBase, [])).toMatchInlineSnapshot(`
			"<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/test-owner/test-repository/branch/main/graph/badge.svg"/></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/test-owner/test-repository?color=21bb42"></a>
				<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
				<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
				<img alt="npm package version" src="https://img.shields.io/npm/v/test-repository?color=21bb42" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`"
		`);
	});

	it("replaces existing contents when there is an existing known badge", () => {
		expect(
			generateTopContent(optionsBase, [
				`<img alt="TypeScript: Strict" src="invalid svg" />`,
			]),
		).toMatchInlineSnapshot(`
			"<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/test-owner/test-repository/branch/main/graph/badge.svg"/></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/test-owner/test-repository?color=21bb42"></a>
				<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
				<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
				<img alt="npm package version" src="https://img.shields.io/npm/v/test-repository?color=21bb42" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`"
		`);
	});

	it("push existing badges to the end when there is an existing unknown badge", () => {
		expect(
			generateTopContent(optionsBase, [
				`<img alt="Unknown Badge" src="unknown.svg" />`,
			]),
		).toMatchInlineSnapshot(`
			"<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/test-owner/test-repository/branch/main/graph/badge.svg"/></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/test-owner/test-repository?color=21bb42"></a>
				<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
				<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
				<img alt="npm package version" src="https://img.shields.io/npm/v/test-repository?color=21bb42" />
				<img alt="Unknown Badge" src="unknown.svg" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`"
		`);
	});

	it("does not include a greet section when the mode is migrate", () => {
		expect(generateTopContent({ ...optionsBase, mode: "migrate" }, []))
			.toMatchInlineSnapshot(`
				"<h1 align="center">Test Title</h1>

				<p align="center">Test description</p>

				<p align="center">
					<!-- prettier-ignore-start -->
					<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
					<a href="#contributors" target="_blank"><img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" /></a>
					<!-- ALL-CONTRIBUTORS-BADGE:END -->
					<!-- prettier-ignore-end -->
					<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/test-owner/test-repository/branch/main/graph/badge.svg"/></a>
					<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
					<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/test-owner/test-repository?color=21bb42"></a>
					<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
					<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
					<img alt="npm package version" src="https://img.shields.io/npm/v/test-repository?color=21bb42" />
				</p>"
			`);
	});
});
