# 3D design synthesis

When the project wants artifact documentation, for a substantial scene or “show the design system,” provide a concise `design-system.md` in the user's artifact project. It should read like one coherent design, not a printout of search hits.

Choose useful sections: intent/audience; artistic concept; factual grounding; spatial composition/terrain; geometry/scale; material/color/light; camera/navigation; actors/motion; behavior/interactions; labels/UI; accessibility; runtime constraints; assumptions/checks. Omit irrelevant sections.

Identify the selected records and important custom choices without implying that every choice must come from the catalog. Explain metaphor boundaries when the scene teaches a real system. Avoid identical building silhouettes, uniformly flat terrain or constant-speed actors when they weaken the intended world; these are design considerations, not universal prohibitions.

Use `scene-spec.json` when structured persistence helps: task objective, record IDs/revisions, model entities/state/actions, visual choices, interaction map and claim-to-visual references. Keep it with the artifact, not in the installed skill. The implemented state remains authoritative for runtime; reconcile the design summary after meaningful edits so documentation cannot silently diverge.

Fillable versions of all three documents live in [templates/docs](../templates/docs/design-system.md): copy the documents that help the project next to the artifact and replace their placeholders. User-excluded internal experiments do not require these files.

Keep `validation-report.md` separate: proposed design is not evidence that it works. Record observations and limitations honestly. Rendering a Markdown design summary in chat is sufficient; an interactive design board is optional. Continue implementation within user authorization without imposing another approval step.

## Optional context helpers

For a large request, `python3 scripts/design-context.py "fantasy village" --kind style-profile --kind object-archetype` gathers recipe and selected knowledge-family candidates from this skill folder. Choose only the families that answer missing decisions. It returns source metadata and records, not a finished design or new research. Interpret exclusions, aesthetic intent and existing project constraints yourself.

After choosing IDs, `python3 scripts/resolve.py recipe.fantasy-village-diorama knowledge.framed-shelter` retrieves their complete content and cited sources. Add `--related` only when one hop of linked records is useful. Neither helper needs network access or modifies the project. Directly reading the JSON remains equally valid.

## Compose a design, not a catalog excerpt

Begin with the intended experience and the object or relationship carrying its meaning. Combine independent decisions: a theme establishes a fictional world; a style shapes geometry and surface treatment; a representation exposes the relevant structure; an authoritative model produces meaningful state. Style, theme, lighting, composition, motion and presentation profiles are authored creative proposals to adapt to the explicit user brief, not historical definitions, fixed templates, required rendering libraries or certifications of factual geometry, measured materials or simulated behavior.

Tie each important choice to a consequence. For example: thick timber framing makes the workshop's construction legible; a cutaway reveals its mechanism; a controlled release shows how the mechanism responds. A list of unrelated style names is insufficient. Resolve conflicting suggestions according to the user's intent, sourced invariants and project constraints, then retain room for original design.

Where scientific encoding is used, record units, scale, coordinate conventions and legend meanings alongside the visual choice. Where the subject is fictional, state deliberate exaggerations only when they might confuse the intended explanation. Keep an alternative only when it helps a real unresolved choice.

## Detail and material direction

For important object families, include silhouette/proportions, connected subparts, surface/material choices, articulation and the intended close viewing distance. Use [object craft](object-craft.md) to turn a broad style name into specific modeling decisions. Object count, polygon count and shader complexity are not substitutes for craftsmanship. Scientific detailing must preserve sourced structures. Keep these choices flexible and proportional to the task.

Where joins or finish carry the design, state which regions form one continuous skin and which remain
layered or articulated. Connect material references to actual part assignments, palette relationships,
texture scale/direction and light response. Record only decisions that help build or review the object;
do not turn this into a mandatory surface inventory or require an A/B study for ordinary work.
