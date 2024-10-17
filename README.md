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

### Query and Retrieve Passages in the Same Language

```ts
import { seekPassages } from "ephrem-ai";

await seekPassages("Baptism of Jesus", "KJV", {
	contentType: "text",
})
	.then((passages) =>
		passages.forEach((passage) => {
			console.log(`- - ${passage.data.reference} - -`);
			console.log(passage.data.content);
		}),
	)
	.catch((err) => console.error(`Error fetching passage: ${err.message}`));
```

#### Passages from King James (Authorised) Version (KJV)

```plaintext
- - Matthew 3:13-17 - -
     [13] ¶ Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him.  [14] But John forbad him, saying, I have need to be baptized of thee, and comest thou to me?  [15] And Jesus answering said unto him, Suffer it to be so now: for thus it becometh us to fulfil all righteousness. Then he suffered him.  [16] And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him, and he saw the Spirit of God descending like a dove, and lighting upon him:  [17] And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.

- - Mark 1:9-11 - -
     [9] And it came to pass in those days, that Jesus came from Nazareth of Galilee, and was baptized of John in Jordan.  [10] And straightway coming up out of the water, he saw the heavens opened, and the Spirit like a dove descending upon him:  [11] And there came a voice from heaven, saying, Thou art my beloved Son, in whom I am well pleased.

- - Luke 3:21-22 - -
     [21] Now when all the people were baptized, it came to pass, that Jesus also being baptized, and praying, the heaven was opened,  [22] And the Holy Ghost descended in a bodily shape like a dove upon him, and a voice came from heaven, which said, Thou art my beloved Son; in thee I am well pleased.

- - John 1:32-34 - -
     [32] And John bare record, saying, I saw the Spirit descending from heaven like a dove, and it abode upon him.  [33] And I knew him not: but he that sent me to baptize with water, the same said unto me, Upon whom thou shalt see the Spirit descending, and remaining on him, the same is he which baptizeth with the Holy Ghost.  [34] And I saw, and bare record that this is the Son of God.
```

### Query in English and Retrieve Passage in Malayalam

```ts
import { seekPassages } from "ephrem-ai";

await seekPassages("Daniel's friends refuse to bow", "MAL10RO", {
	contentType: "text",
})
	.then((passages) =>
		passages.forEach((passage) => {
			console.log(`- - ${passage.data.reference} - -`);
			console.log(passage.data.content);
		}),
	)
	.catch((err) => console.error(`Error fetching passage: ${err.message}`));
```

#### Passage in മലയാളം സത്യവേദപുസ്തകം 1910 പതിപ്പ് (MAL10RO)

```plaintext
- - ദാനീയേൽ 3:1-30 - -
     [1] നെബൂഖദ്നേസർരാജാവു പൊന്നുകൊണ്ടു ഒരു ബിംബം ഉണ്ടാക്കി; അതിന്റെ ഉയരം അറുപതു മുഴവും വണ്ണം ആറു മുഴവും ആയിരുന്നു; അവൻ അതിനെ ബാബേൽസംസ്ഥാനത്തു ദൂരാസമഭൂമിയിൽ നിർത്തി.  [2] നെബൂഖദ്നേസർരാജാവു പ്രധാനദേശാധിപന്മാരും സ്ഥാനാപതിമാരും ദേശാധിപന്മാരും ന്യായാധിപന്മാരും, ഭണ്ഡാരവിചാരകന്മാരും മന്ത്രിമാരും നഗരാധിപന്മാരും സകലസംസ്ഥാനപാലകന്മാരും നെബൂഖദ്നേസർരാജാവു നിർത്തിയ ബിംബത്തിന്റെ പ്രതിഷ്ഠെക്കു വന്നുകൂടുവാൻ ആളയച്ചു.  [3] അങ്ങനെ പ്രധാനദേശാധിപന്മാരും സ്ഥാനാപതിമാരും ദേശാധിപന്മാരും ന്യായാധിപന്മാരും ഭണ്ഡാരവിചാരകന്മാരും മന്ത്രിമാരും നഗരാധിപന്മാരും സകലസംസ്ഥാനപാലകന്മാരും നെബൂഖദ്നേസർരാജാവു നിർത്തിയ ബിംബത്തിന്റെ പ്രതിഷ്ഠെക്കു വന്നുകൂടി, നെബൂഖദ്നേസർ നിർത്തിയ ബിംബത്തിന്റെ മുമ്പാകെ നിന്നു.  [4] അപ്പോൾ ഘോഷകൻ ഉച്ചത്തിൽ വിളിച്ചുപറഞ്ഞതു: വംശങ്ങളും ജാതികളും ഭാഷക്കാരുമായുള്ളോരേ, നിങ്ങളോടു കല്പിക്കുന്നതെന്തെന്നാൽ:  [5] കാഹളം, കുഴൽ, തംബുരു, കിന്നരം, വീണ, നാഗസ്വരം മുതലായ സകലവിധവാദ്യനാദവും കേൾക്കുമ്പോൾ, നിങ്ങൾ വീണു, നെബൂഖദ്നേസർരാജാവു നിർത്തിയിരിക്കുന്ന സ്വർണ്ണബിംബത്തെ നമസ്കരിക്കേണം.  [6] ആരെങ്കിലും വീണു നമസ്കരിക്കാതെ ഇരുന്നാൽ, അവനെ ആ നാഴികയിൽ തന്നേ, എരിയുന്ന തീച്ചൂളയിൽ ഇട്ടുകളയും.  [7] അതുകൊണ്ടു സകലവംശങ്ങളും കാഹളം, കുഴൽ, തംബുരു, കിന്നരം, വീണ മുതലായ സകലവിധ വാദ്യനാദവും കേട്ടപ്പോൾ സകലവംശങ്ങളും ജാതികളും ഭാഷക്കാരും വീണു നെബൂഖദ്നേസർരാജാവു നിർത്തിയ സ്വർണ്ണബിംബത്തെ നമസ്കരിച്ചു.  [8] എന്നാൽ ആ സമയത്തു ചില കല്ദയർ അടുത്തുവന്നു യെഹൂദന്മാരെ കുറ്റം ചുമത്തി.  [9] അവർ നെബൂഖദ്നേസർരാജാവിനെ ബോധിപ്പിച്ചതു: രാജാവു ദീർഘായുസ്സായിരിക്കട്ടെ!  [10] രാജാവേ, കാഹളം കുഴൽ, തംബുരു, കിന്നരം, വീണ, നാഗസ്വരം മുതലായ സകലവിധ വാദ്യനാദവും കേൾക്കുന്ന ഏവനും വീണു സ്വർണ്ണബിംബത്തെ നമസ്കരിക്കേണമെന്നും  [11] ആരെങ്കിലും വീണു നമസ്കരിക്കാതെയിരുന്നാൽ അവനെ എരിയുന്ന തീച്ചൂളയിൽ ഇട്ടുകളയുമെന്നും ഒരു തീർപ്പു കല്പിച്ചുവല്ലോ.  [12] ബാബേൽസംസ്ഥാനത്തിലെ കാര്യാദികൾക്കു മേൽവിചാരകന്മാരായി നിയമിച്ച ശദ്രക്, മേശക്, അബേദ്നെഗോ എന്ന ചില യെഹൂദന്മാരുണ്ടല്ലോ: ഈ പുരുഷന്മാർ രാജാവിനെ കൂട്ടാക്കിയില്ല; അവർ തിരുമനസ്സിലെ ദേവന്മാരെ സേവിക്കയോ തിരുമനസ്സുകൊണ്ടു നിർത്തിയ സ്വർണ്ണ ബിംബത്തെ നമസ്കരിക്കയോ ചെയ്യുന്നില്ല.  [13] അപ്പോൾ നെബൂഖദ്നേസർ ഉഗ്രകോപവും ക്രോധവും പൂണ്ടു ശദ്രക്കിനെയും മേശക്കിനെയും അബേദ്നെഗോവിനെയും കൊണ്ടുവരുവാൻ കല്പിച്ചു; അവർ ആ പുരുഷന്മാരെ രാജസന്നിധിയിൽ കൊണ്ടുവന്നു.  [14] നെബൂഖദ്നേസർ അവരോടു കല്പിച്ചതു: ശദ്രക്കേ, മേശക്കേ, അബേദ്നെഗോവേ, നിങ്ങൾ എന്റെ ദേവന്മാരെ സേവിക്കയോ ഞാൻ നിർത്തിയ സ്വർണ്ണബിംബത്തെ നമസ്കരിക്കയോ ചെയ്യുന്നില്ല എന്നുള്ളതു നേർതന്നേയോ?  [15] ഇപ്പോൾ കാഹളം, കുഴൽ, തംബുരു, കിന്നരം, വീണ, നാഗസ്വരം മുതലായ സകലവിധ വാദ്യനാദവും കേൾക്കുന്ന സമയത്തു നിങ്ങൾ, ഞാൻ പ്രതിഷ്ഠിച്ച ബിംബത്തെ വീണു നമസ്കരിപ്പാൻ ഒരുങ്ങിയിരുന്നാൽ നന്നു; നമസ്കരിക്കാതെയിരുന്നാലോ ഈ നാഴികയിൽതന്നേ നിങ്ങളെ എരിയുന്ന തീച്ചൂളയിൽ ഇട്ടുകളയും; നിങ്ങളെ എന്റെ കയ്യിൽനിന്നു വിടുവിക്കാകുന്ന ദേവൻ ആർ?  [16] ശദ്രക്കും മേശക്കും അബേദ്നെഗോവും രാജാവിനോടു: നെബൂഖദ്നേസരേ, ഈ കാര്യത്തിൽ ഉത്തരം പറവാൻ ആവശ്യമില്ല.  [17] ഞങ്ങൾ സേവിക്കുന്ന ദൈവത്തിന്നു ഞങ്ങളെ വിടുവിപ്പാൻ കഴിയുമെങ്കിൽ, അവൻ ഞങ്ങളെ എരിയുന്ന തീച്ചൂളയിൽനിന്നും രാജാവിന്റെ കയ്യിൽനിന്നും വിടുവിക്കും.  [18] അല്ലെങ്കിലും ഞങ്ങൾ രാജാവിന്റെ ദേവന്മാരെ സേവിക്കയില്ല. രാജാവു നിർത്തിയ സ്വർണ്ണബിംബത്തെ നമസ്കരിക്കയുമില്ല എന്നു അറിഞ്ഞാലും എന്നു ഉത്തരം പറഞ്ഞു.  [19] അപ്പോൾ നെബൂഖദ്നേസരിന്നു കോപം മുഴുത്തു ശദ്രക്കിന്റെയും മേശക്കിന്റെയും അബേദ്നെഗോവിന്റെയും നേരെ മുഖഭാവം മാറി; ചൂള പതിവായി ചൂടുപിടിപ്പിച്ചതിൽ ഏഴുമടങ്ങു ചൂടുപിടിപ്പിപ്പാൻ അവൻ കല്പിച്ചു.  [20] അവൻ തന്റെ സൈന്യത്തിലെ മഹാബലവാന്മാരായ ചില പുരുഷന്മാരോടു ശദ്രക്കിനെയും മേശക്കിനെയും അബേദ്നെഗോവെയും ബന്ധിച്ചു എരിയുന്ന തീച്ചൂളയിൽ ഇട്ടുകളവാൻ കല്പിച്ചു.  [21] അങ്ങനെ അവർ ആ പുരുഷന്മാരെ, അവരുടെ കാൽചട്ട, കുപ്പായം, മേലാട മുതലായ വസ്ത്രങ്ങളോടുകൂടെ ബന്ധിച്ചു എരിയുന്ന തീച്ചൂളയിൽ ഇട്ടുകളഞ്ഞു.  [22] രാജകല്പന കർശനമായിരിക്കകൊണ്ടും ചൂള അത്യന്തം ചൂടായിരിക്കകൊണ്ടും ശദ്രക്കിനെയും മേശക്കിനെയും അബേദ്നെഗോവെയും എടുത്തു കൊണ്ടുപോയ പുരുഷന്മാരെ അഗ്നിജ്വാല ദഹിപ്പിച്ചുകളഞ്ഞു.  [23] ശദ്രക്, മേശക്, അബേദ്നെഗോ എന്നീ മൂന്നു പുരുഷന്മാരോ ബന്ധിക്കപ്പെട്ടവരായി എരിയുന്ന തീച്ചൂളയിൽ വീണു.  [24] നെബൂഖദ്നേസർരാജാവു ഭ്രമിച്ചു വേഗത്തിൽ എഴുന്നേറ്റു മന്ത്രിമാരോടു: നാം മൂന്നു പുരുഷന്മാരെ അല്ലയോ ബന്ധിച്ചു തീയിൽ ഇട്ടതു എന്നു ചോദിച്ചതിന്നു അവർ: സത്യം തന്നേ രാജാവേ എന്നു രാജാവിനോടു ഉണർത്തിച്ചു.  [25] അതിന്നു അവൻ: നാലു പുരുഷന്മാർ കെട്ടഴിഞ്ഞു തീയിൽ നടക്കുന്നതു ഞാൻ കാണുന്നു; അവർക്കു ഒരു കേടും തട്ടീട്ടില്ല; നാലാമത്തവന്റെ രൂപം ഒരു ദൈവപുത്രനോടു ഒത്തിരിക്കുന്നു എന്നു കല്പിച്ചു.  [26] നെബൂഖദ്നേസർ എരിയുന്ന തീച്ചൂളയുടെ വാതില്ക്കൽ അടുത്തുചെന്നു: അത്യുന്നതദൈവത്തിന്റെ ദാസന്മാരായ ശദ്രക്കേ, മേശക്കേ, അബേദ് നെഗോവേ, പുറത്തുവരുവിൻ എന്നു കല്പിച്ചു; അങ്ങനെ ശദ്രക്കും മേശക്കും അബേദ്നെഗോവും തീയിൽനിന്നു പുറത്തുവന്നു.  [27] പ്രധാനദേശാധിപതിമാരും സ്ഥാനാപതിമാരും ദേശാധിപതിമാരും രാജമന്ത്രിമാരും വന്നുകൂടി, ആ പുരുഷന്മാരുടെ ദേഹത്തിന്നു തീ പിടിക്കാതെയും അവരുടെ തലമുടി കരിയാതെയും കാൽചട്ടെക്കു കേടു പറ്റാതെയും അവർക്കു തീയുടെ മണംപോലും തട്ടാതെയും ഇരുന്നതു കണ്ടു.  [28] അപ്പോൾ നെബൂഖദ്നേസർ കല്പിച്ചതു: ശദ്രക്കിന്റെയും മേശക്കിന്റെയും അബേദ്നെഗോവിന്റെയും ദൈവം വാഴ്ത്തപ്പെട്ടവൻ; തങ്കൽ ആശ്രയിക്കയും സ്വന്തദൈവത്തെയല്ലാതെ വേറൊരു ദൈവത്തെയും സേവിക്കയോ നമസ്കരിക്കയോ ചെയ്യാതിരിക്കത്തക്കവണ്ണം രാജകല്പനകൂടെ മറുത്തു തങ്ങളുടെ ദേഹത്തെ ഏല്പിച്ചുകൊടുക്കയും ചെയ്ത തന്റെ ദാസന്മാരെ അവൻ സ്വദൂതനെ അയച്ചു വിടുവിച്ചിരിക്കുന്നുവല്ലോ.  [29] ഈ വിധത്തിൽ വിടുവിപ്പാൻ കഴിയുന്ന മറ്റൊരു ദൈവവും ഇല്ലായ്കകൊണ്ടു ഏതു ജാതിക്കാരിലും വംശക്കാരിലും ഭാഷക്കാരിലും ആരെങ്കിലും ശദ്രക്കിന്റെയും മേശക്കിന്റെയും അബേദ്നെഗോവിന്റെയും ദൈവത്തിന്നു വിരോധമായി വല്ല തെറ്റും പറഞ്ഞാൽ അവനെ കഷണംകഷണമായി ശകലിക്കയും അവന്റെ വീടു കുപ്പക്കുന്നാക്കുകയും ചെയ്യുമെന്നു ഞാൻ ഒരു വിധി കല്പിക്കുന്നു.  [30] പിന്നെ രാജാവു ശദ്രക്കിന്നും മേശക്കിന്നും അബേദ്നെഗോവിന്നും ബാബേൽസംസ്ഥാനത്തു സ്ഥാനമാനങ്ങൾ കല്പിച്ചുകൊടുത്തു
```

### Query in Malayalam and Retrieve Passage in English

```ts
import { seekPassages } from "ephrem-ai";

await seekPassages("ഡേവിഡ് ഗോലിയാത്തിനെ പരാജയപ്പെടുത്തി", "BSB", {
	contentType: "text",
})
	.then((passages) =>
		passages.forEach((passage) => {
			console.log(`- - ${passage.data.reference} - -`);
			console.log(passage.data.content);
		}),
	)
	.catch((err) => console.error(`Error fetching passage: ${err.message}`));
```

#### Passages from Berean Standard Bible BSB)

```plaintext
- - 1 Samuel 17:1-58 - -
Goliath’s Challenge
 [1] Now the Philistines gathered their forces for war at Socoh in Judah, and they camped between Socoh and Azekah in Ephes-dammim.  [2] Saul and the men of Israel assembled and camped in the Valley of Elah, arraying themselves for battle against the Philistines.

 [3] The Philistines stood on one hill and the Israelites stood on another, with the valley between them.

 [4] Then a champion named Goliath, who was from Gath, came out from the Philistine camp. He was six cubits and a span in height,  [5] and he had a bronze helmet on his head. He wore a bronze coat of mail weighing five thousand shekels,  [6] and he had armor of bronze on his legs and a javelin of bronze slung between his shoulders.  [7] The shaft of his spear was like a weaver’s beam, and its iron point weighed six hundred shekels. In addition, his shield bearer went before him.

 [8] And Goliath stood and shouted to the ranks of Israel, “Why do you come out and array yourselves for battle? Am I not a Philistine, and are you not servants of Saul? Choose one of your men and have him come down against me.  [9] If he is able to fight me and kill me, then we will be your servants. But if I prevail against him and kill him, then you shall be our servants and labor for us.”

 [10] Then the Philistine said, “I defy the ranks of Israel this day! Give me a man to fight!”

 [11] On hearing the words of the Philistine, Saul and all the Israelites were dismayed and greatly afraid.
David Accepts the Challenge

 [12] Now David was the son of a man named Jesse, an Ephrathite from Bethlehem of Judah who had eight sons in the days of Saul. And Jesse was old and well along in years.  [13] The three older sons of Jesse had followed Saul into battle: The firstborn was Eliab, the second was Abinadab, and the third was Shammah.  [14] And David was the youngest.

The three oldest had followed Saul,  [15] but David went back and forth from Saul to tend his father’s sheep in Bethlehem.

 [16] For forty days the Philistine came forward every morning and evening to take his stand.

 [17] One day Jesse said to his son David, “Take this ephah of roasted grain  and these ten loaves of bread for your brothers and hurry to their camp.  [18] Take also these ten portions of cheese to the commander of their unit. Check on the welfare of your brothers and bring back an assurance from them.  [19] They are with Saul and all the men of Israel in the Valley of Elah, fighting against the Philistines.”

 [20] So David got up early in the morning, left the flock with a keeper, loaded up, and set out as Jesse had instructed him. He reached the camp as the army was marching out to its position and shouting the battle cry.  [21] And Israel and the Philistines arrayed in formation against each other.

 [22] Then David left his supplies in the care of the quartermaster and ran to the battle line. When he arrived, he asked his brothers how they were doing.  [23] And as he was speaking with them, suddenly the champion named Goliath, the Philistine from Gath, came forward from the Philistines and shouted his usual words, which David also heard.

 [24] When all the men of Israel saw Goliath, they fled from him in great fear.

 [25] Now the men of Israel had been saying, “Do you see this man who keeps coming out to defy Israel? To the man who kills him the king will give great riches. And he will give him his daughter in marriage and exempt his father’s house from taxation in Israel.”

 [26] David asked the men who were standing with him, “What will be done for the man who kills this Philistine and removes this disgrace from Israel? Just who is this uncircumcised Philistine, that he should defy the armies of the living God?”

 [27] The people told him about the offer, saying, “That is what will be done for the man who kills him.”

 [28] Now when David’s oldest brother Eliab heard him speaking to the men, his anger burned against David. “Why have you come down here?” he asked. “And with whom did you leave those few sheep in the wilderness? I know your pride and wickedness of heart—you have come down to see the battle!”

 [29] “What have I done now?” said David. “Was it not just a question?”  [30] Then he turned from him toward another and asked about the offer, and those people answered him just as the first ones had answered.

 [31] Now David’s words were overheard and reported to Saul, who called for him.

 [32] And David said to Saul, “Let no man’s heart fail on account of this Philistine. Your servant will go and fight him!”

 [33] But Saul replied, “You cannot go out against this Philistine to fight him. You are just a boy, and he has been a warrior from his youth.”

 [34] David replied, “Your servant has been tending his father’s sheep, and whenever a lion or a bear came and carried off a lamb from the flock,  [35] I went after it, struck it down, and delivered the lamb from its mouth. If it reared up against me, I would grab it by its fur, strike it down, and kill it.  [36] Your servant has killed lions and bears; this uncircumcised Philistine will be like one of them, for he has defied the armies of the living God.”

 [37] David added, “The LORD, who delivered me from the claws of the lion and the bear, will deliver me from the hand of this Philistine.”

“Go,” said Saul, “and may the LORD be with you.”
David Slays Goliath

 [38] Then Saul clothed David in his own tunic, put a bronze helmet on his head, and dressed him in armor.  [39] David strapped his sword over the tunic and tried to walk, but he was not accustomed to them.

“I cannot walk in these,” David said to Saul. “I am not accustomed to them.” So David took them off.  [40] And David took his staff in his hand, selected five smooth stones from the brook, and put them in the pouch of his shepherd’s bag. And with his sling in hand, he approached the Philistine.

 [41] Now the Philistine came closer and closer to David, with his shield-bearer before him.  [42] When the Philistine looked and saw David, he despised him because he was just a boy, ruddy and handsome.  [43] “Am I a dog,” he said to David, “that you come at me with sticks?” And the Philistine cursed David by his gods.  [44] “Come here,” he called to David, “and I will give your flesh to the birds of the air and the beasts of the field!”

 [45] But David said to the Philistine, “You come against me with sword and spear and javelin, but I come against you in the name of the LORD of Hosts, the God of the armies of Israel, whom you have defied.  [46] This day the LORD will deliver you into my hand. This day I will strike you down, cut off your head, and give the carcasses of the Philistines to the birds of the air and the creatures of the earth. Then the whole world will know that there is a God in Israel.  [47] And all those assembled here will know that it is not by sword or spear that the LORD saves; for the battle is the LORD’s, and He will give all of you into our hands.”

 [48] As the Philistine started forward to attack him, David ran quickly toward the battle line to meet him.  [49] Then David reached into his bag, took out a stone, and slung it, striking the Philistine on the forehead. The stone sank into his forehead, and he fell facedown on the ground.

 [50] Thus David prevailed over the Philistine with a sling and a stone; without a sword in his hand he struck down the Philistine and killed him.  [51] David ran and stood over him. He grabbed the Philistine’s sword and pulled it from its sheath and killed him; and he cut off his head with the sword.

When the Philistines saw that their hero was dead, they turned and ran.  [52] Then the men of Israel and Judah charged forward with a shout and pursued the Philistines to the entrance of Gath  and to the gates of Ekron. And the bodies of the Philistines were strewn along the Shaaraim road to Gath and Ekron.

 [53] When the Israelites returned from their pursuit of the Philistines, they plundered their camps.  [54] David took the head of the Philistine and brought it to Jerusalem, and he put Goliath’s weapons in his own tent.

 [55] As Saul had watched David going out to confront the Philistine, he said to Abner the commander of the army, “Abner, whose son is this young man?”

“As surely as you live, O king,” Abner replied, “I do not know.”

 [56] “Find out whose son this young man is!” said the king.

 [57] So when David returned from killing the Philistine, still holding his head in his hand, Abner took him and brought him before Saul.

 [58] “Whose son are you, young man?” asked Saul.

“I am the son of your servant Jesse of Bethlehem,” David replied.

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
