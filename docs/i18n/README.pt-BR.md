# Doctor Bones

Doctor Bones é um modelo de repositório independente de fornecedor de IA para desenvolvimento assistido por IA.

Ele ajuda a manter a memória do projeto dentro do repositório, em vez de presa no chat. Ele dá ao time humano/IA uma disciplina operacional compartilhada: ordens de trabalho, playbooks, exemplos, verificações, regras de passagem de contexto e hábitos de prontidão para releases.

## Idiomas

- [English](../../README.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Deutsch](README.de.md)
- Português do Brasil: este arquivo

## O que é isto

Doctor Bones não é mais um agente de programação.

É uma camada de disciplina nativa do repositório para usar assistentes de IA e agentes de programação sem perder intenção, restrições, verificações ou histórico do projeto.

O modelo básico é:

```text
intenção humana
→ a IA de primeiro plano esclarece a tarefa
→ o repositório captura orientação durável
→ a IA executora realiza trabalho delimitado
→ as verificações validam o que pode ser validado
→ a conclusão se conecta de volta à intenção original
```

Pense na IA de primeiro plano como o assistente de planejamento e arquitetura. Pense na IA executora como o trabalhador com acesso a arquivos, ambiente de execução, testes e ferramentas de commit/PR.

O repositório é a camada de memória e disciplina entre os dois.

## Primeiros passos

1. Se você copiou este modelo, reescreva este README em torno do seu projeto real em breve.
2. Leia [`examples/README.md`](../../examples/README.md) para ver os exemplos de fluxo de trabalho “day-in-the-life”.
3. Leia [`readme_pmp.md`](../../readme_pmp.md) pelo menos uma vez e mantenha-o por perto.
4. Leia [`AGENTS.md`](../../AGENTS.md) antes de pedir a um assistente de IA para alterar o repositório.
5. Use uma ordem de trabalho para trabalhos substanciais, com vários arquivos, sensíveis à arquitetura ou sensíveis ao processo.
6. Execute as verificações disponíveis antes de tratar o trabalho como concluído.

## Prompt de início para a IA de primeiro plano

Substitua `<caminho para seu repo>` pelo caminho real do seu repositório. Você também pode pedir à sua IA de primeiro plano para atualizar este README para seu novo projeto.

Ao iniciar um novo chat ou aba contra este repositório, cole isto na IA de primeiro plano:

```text
Você é a IA de primeiro plano para <caminho para seu repo>

O estado atual do repositório vale mais que a memória do chat. Inspecione o estado atual do repositório antes de dar conselhos de arquitetura, escrever ordens de trabalho ou sugerir alterações no repo.

Leia primeiro README.md, examples/README.md, readme_pmp.md, AGENTS.md e a orientação relevante de pasta. Depois identifique estado atual, alvo, restrições, decisão primeiro-plano/executor e o menor próximo passo útil.
```

## Atalho de ordem de trabalho

Para trabalho substancial, converse com a IA de primeiro plano até que a tarefa esteja clara, depois diga:

```text
Create a workorder and also show it to me here.
```

Você pode copiar um link para o arquivo de ordem de trabalho e dizer à sua IA executora, trabalhando em um ambiente para este repositório, para executá-la.

Você também pode copiar/colar o corpo da ordem de trabalho se pediu à IA de primeiro plano para mostrá-lo primeiro. Mantenha esse bloco limpo: sem citações, notas do assistente, explicações, links extras ou comentários dentro do corpo da ordem de trabalho.

## Verificações

Execute isto a partir da raiz do repositório quando disponível:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Se uma verificação falhar, cole a saída exata do comando na IA de primeiro plano e peça a menor correção segura.

## Sobre Doctor Bones

Doctor Bones é uma disciplina operacional agnóstica em relação a fornecedor de IA para projetos assistidos por IA.

A versão curta:

```text
intenção capturada
escopo delimitado
restrições preservadas
executor instruído
verificações exigidas
conclusão conectada à intenção original
```

A explicação completa está em [`readme_pmp.md`](../../readme_pmp.md).
