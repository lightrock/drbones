# Doctor Bones

Doctor Bones ist eine anbieterunabhängige Repository-Vorlage für KI-unterstützte Entwicklung.

Sie hilft dabei, Projekterinnerung im Repository zu halten, statt sie im Chat einzuschließen. Sie gibt dem Mensch/KI-Team eine gemeinsame Arbeitsdisziplin: Workorders, Playbooks, Beispiele, Checks, Übergaberegeln und Release-Readiness-Gewohnheiten.

Du musst nicht zwingend die Vorlagenkopie deines Repositorys lokal auschecken, um es zu nutzen. Doctor Bones trägt seine Cognitionkitecture im Repository selbst. Wenn du die Startanweisungen unten befolgst, sollte deine Foreground-KI genug Projektwissen haben, um mit Repo-Leitlinien, Beispielen, Playbooks, Checks und Übergaberegeln zu arbeiten.

Standardmäßig muss nichts im traditionellen Sinn irgendwo “laufen”, und du musst nicht zwingend einen Executor wie Codex aufrufen. Richte deine Foreground-KI zuerst auf die passende Doctor-Bones-basierte Repository-Instanz aus. Nutze einen Executor nur dann, wenn die Aufgabe Dateiänderungen, eine Laufzeitumgebung, Checks, Commits oder Pull Requests braucht.

## Sprachen

- [English](../../README.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- Deutsch: diese Datei
- [Português do Brasil](README.pt-BR.md)
- [हिन्दी](README.hi.md)

## Was das ist

Doctor Bones ist kein weiterer Coding-Agent.

Es ist eine repo-native Disziplinschicht, damit man KI-Assistenten und Coding-Agenten nutzen kann, ohne Absicht, Einschränkungen, Checks oder Projekthistorie zu verlieren.

Das Grundmodell ist:

```text
menschliche Absicht
→ die Foreground-KI klärt die Aufgabe
→ das Repository speichert dauerhafte Leitlinien
→ die Executor-KI erledigt begrenzte Arbeit
→ Checks prüfen, was prüfbar ist
→ der Abschluss verweist zurück auf die ursprüngliche Absicht
```

Betrachte die Foreground-KI als Planungs- und Architekturassistenten. Betrachte die Executor-KI als den Arbeiter mit Dateizugriff, Laufzeitumgebung, Tests und Commit/PR-Werkzeugen.

Das Repository ist die Gedächtnis- und Disziplinschicht zwischen beiden.

## Erste Schritte

1. Wenn du diese Vorlage kopiert hast, schreibe dieses README bald für dein echtes Projekt um.
2. Lies [`examples/README.md`](../../examples/README.md), um die Day-in-the-Life-Workflow-Beispiele zu sehen.
3. Lies [`readme_pmp.md`](../../readme_pmp.md) mindestens einmal und halte es griffbereit.
4. Lies [`AGENTS.md`](../../AGENTS.md), bevor du einen KI-Assistenten bittest, im Repository zu arbeiten.
5. Nutze eine Workorder für umfangreiche, mehrdateiige, architektursensible oder prozesssensible Arbeit.
6. Führe die verfügbaren Checks aus, bevor du Arbeit als abgeschlossen behandelst.

## Start-Prompt für die Foreground-KI

Dieser Prompt ist für ein Repository gedacht, das aus der Doctor-Bones-Vorlage erstellt wurde. Ersetze nach dem Kopieren dieser Vorlage `<your project repository URL>` durch die URL deines eigenen Projekt-Repositorys.

Wenn du einen neuen Chat oder Tab für dein Projekt-Repository startest, füge dies in die Foreground-KI ein:

```text
You are the foreground AI for <your project repository URL>.

Current repo state beats chat memory. Inspect the current project repository before giving
architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder
guidance from the project repository first. Then identify current state, target, constraints,
foreground/executor decision, and the smallest useful next move.
```

## Workorder-Abkürzung

Für umfangreiche Arbeit in deinem kopierten Projekt-Repository sprich mit der Foreground-KI, bis die Aufgabe klar ist, und sage dann:

```text
Create a workorder and also show it to me here.
```

Du kannst einen Link zur Workorder-Datei kopieren und deiner Executor-KI, die in einer Umgebung für dein Projekt-Repository arbeitet, sagen, dass sie diese ausführen soll.

Du kannst auch den Workorder-Text kopieren/einfügen, wenn du die Foreground-KI gebeten hast, ihn zuerst anzuzeigen. Halte diesen Block sauber: keine Zitate, Assistentennotizen, Erklärungen, zusätzlichen Links oder Kommentare innerhalb des Workorder-Texts.

## Checks

Führe dies vom Repository-Root aus, wenn verfügbar:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Wenn ein Check fehlschlägt, füge die exakte Befehlsausgabe in die Foreground-KI ein und bitte um die kleinste sichere Korrektur.

## Über Doctor Bones

Doctor Bones ist eine KI-anbieterunabhängige Arbeitsdisziplin für KI-unterstützte Projekte.

Die Kurzfassung:

```text
Absicht erfasst
Umfang begrenzt
Einschränkungen bewahrt
Executor instruiert
Checks erforderlich
Abschluss an ursprüngliche Absicht zurückgebunden
```

Die vollständige Erklärung steht in [`readme_pmp.md`](../../readme_pmp.md).
