<h1 align="center">Ephrem AI</h1>

<p align="center">ephrem-ai is a Node.js package that combines the ephrem library with OpenAI’s API, enabling users to input queries about biblical narratives and receive generated references along with the corresponding scripture passages.</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 2" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-2-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/stevin-wilson/ephrem-ai/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/stevin-wilson/ephrem-ai" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/stevin-wilson/ephrem-ai?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/stevin-wilson/ephrem-ai/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/ephrem-ai"><img alt="📦 npm version" src="https://img.shields.io/npm/v/ephrem-ai?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

`ephrem-ai` is a Node.js package that combines the ephrem library with OpenAI’s API to fetch Bible passages based on user-inputted descriptions.
It uses OpenAI models to generate scriptural references and the ephrem library to retrieve the corresponding Bible passages.
This open-source tool is designed to make scripture exploration easier and more intuitive for developers, scholars, and laypersons alike, all for the glory of God.

## Features

- Natural Language Queries: Users can input descriptive queries like “Jesus turns water into wine,” and the package will generate the relevant Bible reference and retrieve the scripture text.
- Multiple Bible Versions: Fetch Bible passages from various translations, such as the KJV, BSB, and more.
- OpenAI Integration: Supports multiple OpenAI models (gpt-3.5-turbo, gpt-4, gpt-4o, gpt-4o-mini) for accurate generation of Bible references.
- Multilingual Support: Ephrem allows fetching Bible passages in multiple languages, supporting both LTR and RTL text directions.

## Prerequisites

1. API.Bible Account: You’ll need an API key from API.Bible.
2. OpenAI Account: You’ll need an API key from OpenAI.

## Installation

To install the package, run the following command:

```shell
npm i ephrem-ai
```

## Setup (One-time Configuration)

Before using `ephrem-ai`, you need to configure it to use OpenAI and API.Bible APIs.

### Setting the `OPENAI_API_KEY` Environment Variable

Follow the steps below based on your platform to set the environment variable.

#### Windows

1. Open Start and search for “Environment Variables”.
2. Click on Edit the system environment variables.
3. In the System Properties window, click Environment Variables.
4. Under User variables, click New.
5. Set the Variable name to `OPENAI_API_KEY` and the Variable value to your OpenAI API key.
6. Click OK to save.

Alternatively, if you are using PowerShell, you can set it temporarily with:

```shell
$env:OPENAI_API_KEY = "your-openai-api-key"
```

#### macOS / Linux

1. Open a Terminal.
2. Use the following command to set the environment variable temporarily (only for the current session):

```shell
export OPENAI_API_KEY="your-openai-api-key"
```

3. To set the environment variable permanently, add the above line to your shell configuration file:

- If using bash, add it to your `~/.bashrc` or `~/.bash_profile`.
- If using zsh, add it to your `~/.zshrc`.

### Setting up `ephrem`

Please follow [these instructions](https://github.com/stevin-wilson/ephrem?tab=readme-ov-file#installation) to set up the `ephrem` library.

## Usage

Once the setup is complete, you can fetch scripture text by describing a biblical event or passage.

Example: Fetch a Passage

```ts
import { seekPassages } from "ephrem-ai";

await seekPassages("Jesus turns water into wine", "KJV", {
	contentType: "text",
})
	.then((details) => {
		console.log(`Passage Text: ${details.data.content}`);
	})
	.catch((err) => console.error(`Error fetching passage: ${err.message}`));
```

## License

`ephrem-ai` is open-source under the MIT License.
This package will remain non-commercial and open-source, serving the glory of God by facilitating scriptural engagement for everyone.

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/stevin-wilson"><img src="https://avatars.githubusercontent.com/u/55603058?v=4?s=100" width="100px;" alt="Stevin Wilson"/><br /><sub><b>Stevin Wilson</b></sub></a><br /><a href="https://github.com/stevin-wilson/ephrem-ai/commits?author=stevin-wilson" title="Code">💻</a> <a href="#content-stevin-wilson" title="Content">🖋</a> <a href="https://github.com/stevin-wilson/ephrem-ai/commits?author=stevin-wilson" title="Documentation">📖</a> <a href="#ideas-stevin-wilson" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-stevin-wilson" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-stevin-wilson" title="Maintenance">🚧</a> <a href="#projectManagement-stevin-wilson" title="Project Management">📆</a> <a href="#tool-stevin-wilson" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app).
