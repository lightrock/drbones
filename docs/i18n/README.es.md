# Doctor Bones

Doctor Bones es una plantilla de repositorio independiente del proveedor de IA para desarrollo asistido por IA.

Ayuda a mantener la memoria del proyecto dentro del repositorio, en lugar de atrapada en el chat. Da al equipo humano/IA una disciplina operativa compartida: órdenes de trabajo, playbooks, ejemplos, comprobaciones, reglas de traspaso y hábitos de preparación para releases.

No necesariamente tienes que clonar en local la copia de plantilla de tu repositorio para usarlo. Doctor Bones lleva su arquitectura de cognición dentro del propio repositorio. Si sigues las instrucciones de inicio de abajo, tu IA de primer plano debería tener suficiente contexto del proyecto para razonar con la guía del repo, los ejemplos, los playbooks, las comprobaciones y las reglas de traspaso.

De forma predeterminada, no hace falta que nada “se ejecute” en algún lugar de la manera tradicional, y no necesariamente tienes que invocar a un ejecutor como Codex. Primero apunta tu IA de primer plano a la instancia adecuada de repositorio basada en Doctor Bones. Usa un ejecutor solo cuando la tarea necesite ediciones de archivos, un entorno de ejecución, comprobaciones, commits o pull requests.

## Idiomas

- [English](../../README.md)
- Español: este archivo
- [Français](README.fr.md)
- [Deutsch](README.de.md)
- [Português do Brasil](README.pt-BR.md)
- [हिन्दी](README.hi.md)

## Qué es esto

Doctor Bones no es otro agente de programación.

Es una capa de disciplina nativa del repositorio para usar asistentes de IA y agentes de programación sin perder intención, restricciones, comprobaciones ni historial del proyecto.

El modelo básico es:

```text
intención humana
→ la IA de primer plano aclara la tarea
→ el repositorio captura guía duradera
→ la IA ejecutora realiza trabajo acotado
→ las comprobaciones verifican lo verificable
→ el cierre vuelve a conectarse con la intención original
```

Piensa en la IA de primer plano como el asistente de planificación y arquitectura. Piensa en la IA ejecutora como el trabajador con acceso a archivos, entorno de ejecución, pruebas y herramientas de commit/PR.

El repositorio es la capa de memoria y disciplina entre ambos.

## Primeros pasos

1. Si copiaste esta plantilla, reescribe pronto este README para tu proyecto real.
2. Lee [`examples/README.md`](../../examples/README.md) para ver los ejemplos de flujo de trabajo “day-in-the-life”.
3. Lee [`readme_pmp.md`](../../readme_pmp.md) al menos una vez y tenlo a mano.
4. Lee [`AGENTS.md`](../../AGENTS.md) antes de pedir a un asistente de IA que trabaje en el repositorio.
5. Usa una orden de trabajo para trabajos sustanciales, de múltiples archivos, sensibles a la arquitectura o sensibles al proceso.
6. Ejecuta las comprobaciones disponibles antes de tratar el trabajo como terminado.

## Prompt de inicio para la IA de primer plano

Este prompt es para un repositorio creado a partir de la plantilla Doctor Bones. Después de copiar esta plantilla, reemplaza `<URL del repositorio de tu proyecto>` con la URL de tu propio repositorio de proyecto.

Al iniciar un nuevo chat o pestaña para el repositorio de tu proyecto, pega esto en la IA de primer plano:

```text
You are the foreground AI for <your project repository URL>.

Current repo state beats chat memory. Inspect the current project repository before giving
architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder
guidance from the project repository first. Then identify current state, target, constraints,
foreground/executor decision, and the smallest useful next move.
```

## Atajo de orden de trabajo

Para trabajo sustancial en tu repositorio de proyecto copiado, habla con la IA de primer plano hasta que la tarea esté clara, luego di:

```text
Create a workorder and also show it to me here.
```

Puedes copiar un enlace al archivo de la orden de trabajo y decirle a tu IA ejecutora, trabajando en un entorno para el repositorio de tu proyecto, que la ejecute.

También puedes copiar/pegar el cuerpo de la orden de trabajo si pediste a la IA de primer plano que lo mostrara primero. Mantén ese bloque limpio: sin citas, notas del asistente, explicaciones, enlaces extra ni comentarios dentro del cuerpo de la orden.

## Comprobaciones

Ejecuta esto desde la raíz del repositorio cuando esté disponible:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Si una comprobación falla, pega la salida exacta del comando en la IA de primer plano y pide la corrección segura más pequeña.

## Acerca de Doctor Bones

Doctor Bones es una disciplina operativa agnóstica respecto al proveedor de IA para proyectos asistidos por IA.

La versión corta:

```text
intención capturada
alcance acotado
restricciones preservadas
ejecutor instruido
comprobaciones requeridas
cierre conectado con la intención original
```

La explicación completa está en [`readme_pmp.md`](../../readme_pmp.md).
