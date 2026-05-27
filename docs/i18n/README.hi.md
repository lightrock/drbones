# Doctor Bones

Doctor Bones AI-सहायता प्राप्त विकास के लिए एक vendor-independent repository template है।

यह project memory को chat में फँसाकर रखने के बजाय repo के अंदर रखने में मदद करता है। यह आपके human/AI team को साझा operating discipline देता है: workorders, playbooks, examples, checks, handoff rules, और release-readiness habits।

इसे उपयोग करने के लिए आपको अपने repository की template copy का local checkout करना हमेशा ज़रूरी नहीं है। Doctor Bones अपनी cognitionkitecture खुद repository के अंदर रखता है। अगर आप नीचे दिए गए startup instructions का पालन करते हैं, तो आपकी foreground AI के पास repo guidance, examples, playbooks, checks, और handoff rules से reason करने के लिए पर्याप्त project context होना चाहिए।

डिफ़ॉल्ट रूप से, पारंपरिक तरीके से कहीं भी कुछ “run” करना ज़रूरी नहीं है, और आपको Codex जैसे executor को हर बार invoke करना भी ज़रूरी नहीं है। पहले अपनी foreground AI को सही Doctor Bones-based repository instance पर point करें। executor का उपयोग केवल तब करें जब task में file edits, runtime environment, checks, commits, या pull requests की ज़रूरत हो।

## भाषाएँ

- [English](../../README.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Deutsch](README.de.md)
- [Português do Brasil](README.pt-BR.md)
- हिन्दी: यह फ़ाइल

## यह क्या है

Doctor Bones कोई और coding agent नहीं है।

यह AI assistants और coding agents का उपयोग करने के लिए repo-native discipline layer है, ताकि intent, constraints, checks, और project history खो न जाएँ।

मूल model यह है:

```text
human intent
→ foreground AI task को स्पष्ट करता है
→ repo durable guidance capture करता है
→ executor AI bounded work करता है
→ checks verify करते हैं जो verify किया जा सकता है
→ completion source intent से वापस जुड़ती है
```

Foreground AI को planning और architecture assistant समझें। Executor AI को वह worker समझें जिसके पास file access, runtime environment, tests, और commit/PR tools हैं।

Repo उन दोनों के बीच memory और discipline layer है।

## शुरुआत

1. यदि आपने यह template copy किया है, तो जल्द ही इस README को अपने real project के हिसाब से rewrite करें।
2. day-in-the-life workflow examples देखने के लिए [`examples/README.md`](../../examples/README.md) पढ़ें।
3. [`readme_pmp.md`](../../readme_pmp.md) कम से कम एक बार पढ़ें और इसे पास रखें।
4. किसी AI assistant से repo में काम करवाने से पहले [`AGENTS.md`](../../AGENTS.md) पढ़ें।
5. substantial, multi-file, architecture-sensitive, या process-sensitive काम के लिए workorder का उपयोग करें।
6. काम को complete मानने से पहले available checks चलाएँ।

## Foreground AI startup prompt

यह prompt Doctor Bones template से बने repository के लिए है। इस template को copy करने के बाद `<your project repository URL>` को अपने project repository की URL से बदलें।

अपने project repository के लिए नया chat या tab शुरू करते समय foreground AI में यह paste करें:

```text
You are the foreground AI for <your project repository URL>.

Current repo state beats chat memory. Inspect the current project repository before giving
architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder
guidance from the project repository first. Then identify current state, target, constraints,
foreground/executor decision, and the smallest useful next move.
```

## Workorder shortcut

अपने copied project repository में substantial काम के लिए, foreground AI से बात करें जब तक task clear न हो जाए, फिर कहें:

```text
Create a workorder and also show it to me here.
```

आप workorder file का link copy करके अपने executor AI को, जो आपके project repository के environment में काम कर रहा हो, उसे execute करने को कह सकते हैं।

यदि आपने foreground AI से workorder body पहले दिखाने को कहा है, तो आप उसे copy/paste भी कर सकते हैं। उस copy/paste block को clean रखें: workorder body के अंदर citations, assistant notes, explanations, extra links, या commentary न डालें।

## Checks

जब उपलब्ध हों, repository root से ये चलाएँ:

```text
python tools/pmp_check.py --area all
python -m pytest
```

यदि कोई check fail होता है, तो exact command output foreground AI में paste करें और smallest safe fix माँगें।

## Doctor Bones के बारे में

Doctor Bones AI-assisted projects के लिए AI-vendor-agnostic operating discipline है।

Short version:

```text
intent captured
scope bounded
constraints preserved
executor instructed
checks required
completion tied back to source intent
```

पूरी explanation [`readme_pmp.md`](../../readme_pmp.md) में है।
