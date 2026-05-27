# Doctor Bones

Doctor Bones é um modelo de repositório independente de fornecedor de IA para desenvolvimento assistido por IA.

Ele ajuda a manter a memória do projeto dentro do repositório, em vez de presa no chat. Ele dá ao time humano/IA uma disciplina operacional compartilhada: ordens de trabalho, playbooks, exemplos, verificações, regras de passagem de contexto e hábitos de prontidão para releases.

Você não precisa necessariamente fazer checkout local da cópia de template do seu repositório para usar isso. O Doctor Bones carrega sua cognitionkitecture no próprio repositório. Se você seguir as instruções de inicialização abaixo, sua IA de primeiro plano deve ter contexto suficiente do projeto para raciocinar a partir da orientação do repositório, dos exemplos, dos playbooks, das verificações e das regras de handoff.

Por padrão, nada precisa “rodar” em lugar nenhum no sentido tradicional, e você não precisa necessariamente invocar um executor como o Codex. Aponte primeiro sua IA de primeiro plano para a instância apropriada de repositório baseada em Doctor Bones. Use um executor apenas quando a tarefa exigir edições de arquivo, ambiente de execução, verificações, commits ou pull requests.

## Idiomas

- [English](../../README.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Deutsch](README.de.md)
- Português do Brasil: este arquivo
- [हिन्दी](README.hi.md)

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
4. Leia [`AGENTS.md`](../../AGENTS.md) antes de pedir a um assistente de IA para trabalhar no repositório.
5. Use uma ordem de trabalho para trabalhos substanciais, com vários arquivos, sensíveis à arquitetura ou sensíveis ao processo.
6. Execute as verificações disponíveis antes de tratar o trabalho como concluído.

## Prompt de início para a IA de primeiro plano

Este prompt é para um repositório criado a partir do modelo Doctor Bones. Depois de copiar este modelo, substitua `<your project repository URL>` pela URL do seu próprio repositório de projeto.

Ao iniciar um novo chat ou aba para o repositório do seu projeto, cole isto na IA de primeiro plano:

```text
You are the foreground AI for <your project repository URL>.

Current repo state beats chat memory. Inspect the current project repository before giving
architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder
guidance from the project repository first. Then identify current state, target, constraints,
foreground/executor decision, and the smallest useful next move.
```

## Atalho de ordem de trabalho

Para trabalho substancial no seu repositório de projeto copiado, converse com a IA de primeiro plano até que a tarefa esteja clara, depois diga:

```text
Create a workorder and also show it to me here.
```

Você pode copiar um link para o arquivo de ordem de trabalho e dizer à sua IA executora, trabalhando em um ambiente para o repositório do seu projeto, para executá-la.

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
