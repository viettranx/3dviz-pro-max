# Reason from the object to the scene

Use this before choosing construction for important objects, and again when a result feels generic or motion conceals how it works. Choose the objects that carry the user's meaning; secondary scenery can stay economical.

## Establish identity before decoration

Ask what makes this object recognizable, buildable and functional. A mill needs a wheel, an axle and an intelligible connection to its work. A creature needs a coherent body plan and joints that explain its gait. A mathematical vector needs the correct origin, direction and magnitude; scratches and bevels rarely help it.

Resolve the useful layers together:

- **Structure:** parts, thickness, attachment, support, pivots, moving clearances and scale relationships.
- **Surface:** which parts are wood, metal, skin, glass or an intentional abstraction; how those surfaces respond to light at the intended camera distance.
- **Behavior:** what owns position and orientation, what can move relative to what, and what action causes a visible response.
- **Inspection:** how the viewer can discover these properties through framing, isolation, a cutaway, a control or an experiment.

For an articulated creature, trace the visible chain from torso through every supporting or moving
part before adding surface detail. Inspect front, side and an informative motion extreme: parenting
alone does not establish a visible connection, and a shadow cannot bridge a gap between belly, legs
and feet. Conceal a mechanical seam only after the underlying attachment and motion envelope work.
Feather, scale and fur fields should follow body regions and growth direction; repeating one tile in
columns is not evidence of coverage or structure. At close range, check face landmarks and material
response separately from decorative jewelry. These checks allow stylized proportions and invented
species; they do not require photorealism or a particular construction tool.

When an object should read as a solid form, consider whether its volume suits the subject, references
and chosen style. A convincing front silhouette can still conceal an unintentionally shallow torso,
head or assembly. Use informative oblique, side or rear views as needed to judge depth, cross-sections
and how parts merge into the main mass. Consider whether fur, feathers or other surface layers should
contribute volume around the form rather than decorate only its front. Distinguish shallow geometry
from flattening caused by camera projection or lighting before choosing a correction. Reliefs, thin
structures and deliberately flattened styles are valid: this is a prompt for spatial judgment, not a
minimum-thickness rule, fixed view count or pass/fail gate.

Detail should explain identity or use. Put roof thickness and beam connections ahead of another ring of identical decorative spheres. Preserve stylistic exaggeration when it strengthens readability; research real anatomy or engineering claims separately.

## Plan the form and its changes together

For a demanding object, establish a compact working model: identity-bearing masses, secondary
structures, surface regions, attachments and the states that stress them. This can stay in the
agent's working context; it is not a required document or a fixed construction sequence. Let the
chosen style determine how literal or exaggerated those features should be.

Treat a blockout as a hypothesis about the form. Before spending heavily on texture, consider
whether joints, openings, thickness, digits or mating surfaces remain intelligible with a neutral
material. A deliberate rounded sculpture can be finished; accidental primitive-like anatomy is a
reason to revisit construction. More polygons, a Blender export or a tier label do not resolve it.

For moving objects, identify which part owns each region and what may blend across its boundary:
head and jaw, torso and limb, digit and claw, flexible seal and housing. Coordinate masks can help
implement those choices, but proximity on one global axis does not establish ownership. Nearby
unrelated parts may occupy the same coordinate range. Reconsider weights, bind relationships,
correctives and attachment seating when geometry or proportions change; do not assume the previous
rig remains appropriate merely because export succeeds.

Retrieve `knowledge.hero-prop-detail-hierarchy` for form versus surface decisions and
`knowledge.skin-weight-and-deformation-inspection` when moving regions collapse or detach. These
are complementary to numerical motion validation, not substitutes for it.

## Choose reuse by fit

First decide what must be true of the object, then choose how to build it. A finished kit is useful
when its shape, parts, behavior and surface already fit. Adapt a kit when common construction saves
work but its silhouette, proportions, attachments or articulation need a different design. Author
custom geometry or use a suitable sourced asset when another representation better serves the brief.
A hero may use a kit; a background object may need custom work. Blender and Three.js are tools for
these choices, not quality levels.

Reuse lower-level construction mechanisms freely: sockets, profile sweeps, instance placement,
material utilities, state models and asset handoff. This saves infrastructure work without imposing
one finished shape. Dataset absence is a cue to reason or research, not a prohibition.

Separate visual quality (identity, structure, surface and framing), factual fidelity (what is
supported by the model/source), and implementation feasibility (tools, pipeline and delivery cost).
A bake cannot fix the wrong outline; a source mesh cannot validate a new deformation. Make a
representative demanding object convincing before repeating its approach across a large collection.

## Retrieve by the missing decision

For a visibly filled, non-draining pond, establish the persistent water surface before adding foam, glints, ripples or flow arrows. Hide those cues and inspect the still surface from overview and oblique views: moving highlights cannot stand in for missing water coverage. Separate a missing or buried surface from a material/light combination that makes it unreadable. Opaque stylization, translucent layers and transmission are all available; intentionally draining or appearing water and abstract diagrams have different contracts. See [physical interaction](physical-interaction.md#water-level-and-surface-identity) for level and flow-state ownership.

The optional `knowledge` collection separates reusable families. Start with the family that answers the actual uncertainty, then follow `related_ids` only when useful.

| Family | What it helps decide |
| --- | --- |
| `object-archetype` | Parts, support, joints and functional assembly |
| `material-profile` | Optical identity and the conditions that make it visible |
| `physical-behavior` | State, forces or constraints, contact and causal response |
| `tool-adapter` | Which tool owns which responsibility and how states connect |
| `inspection-pattern` | How viewers examine an object or compare outcomes |
| `validation-profile` | Which observations could expose a mistaken implementation |
| `style-profile` | Shape and surface treatment, compatible combinations and viewing conditions |
| `theme-profile` | Fictional setting and motifs, independently of geometry style or factual model |
| `presentation-profile` | Layer, section or graph representation that exposes the intended information |
| `composition-profile` | Overview, focal hierarchy and consistent comparison views |
| `motion-profile` | Playback, interruption and articulation tied to the appropriate state |
| `interaction-profile` | Selection, parameter actions and alternative controls with useful feedback |

For example, run `python3 scripts/search.py "contact impulse" --collection knowledge` from the skill folder. Narrow with `--kind physical-behavior` when appropriate. Recipes answer a whole task; knowledge records supply reusable decisions. Neither should replace the model's own synthesis.

## Make physics discoverable

Collision avoidance can be correct yet visually uneventful. When understanding physics is part of the brief, stage an observable cause and consequence: drop, push, drag against a stop, release a joint, or compare a controlled parameter. Let the viewer reset the same initial state. A short repeatable experiment often teaches more than perpetual wandering.

Connect controls to the actual model. An impulse should change authoritative momentum/velocity through the solver; a friction control should change contact parameters. Roughness, metalness and color belong to optical rendering and do not establish mechanical properties. Label illustrative values and model limits where they affect interpretation.

Use contact highlights, velocity arrows, trails or collider overlays as optional explanations. These are derived views of real state; do not animate a convincing overlay independently of the simulation. Avoid requiring debug graphics in every finished artwork.

For a water surface that reads as flat paint, consider restrained color variation and small normal-map ripples before adding costly reflection or refraction passes. Generate reusable detail once and animate lightweight coordinates where appropriate. Keep the surface footprint independent of the pattern; visual readability still needs an observed frame or user feedback.

## Choose tools by responsibility

| Need | Useful approach | Boundary to preserve |
| --- | --- | --- |
| Geometry, scene hierarchy, lighting and camera | Three.js procedural meshes or loaded assets | Visible geometry and collision geometry are separate representations |
| Detailed authored characters and mechanisms | A modeling/rigging tool such as Blender, exported through glTF when appropriate | Inspect scale, named parts, pivots, articulation and asset rights after import |
| Authored gait, expression or pose transitions | Three.js animation clips and `AnimationMixer` | Clip playback does not establish obstacle avoidance or dynamic contact |
| Falling, stacking, impacts and physical joints | Three.js with a rigid-body engine such as Rapier | Solver owns dynamic transforms; render from solver state; direct pose overwrites can defeat contact |
| Navigation and controlled locomotion | Route planning plus a collision-aware controller | A destination and a walk cycle alone do not produce clearance or support |
| Exact algebra, puzzle state or scientific equations | Explicit mathematical/discrete state or a suitable numerical solver | Rendered interpolation must preserve the stated model and its assumptions |

Keep dependencies proportional to the problem. A prescribed gear ratio may only need kinematics. A chain of colliding, constrained parts benefits from a suitable solver. Scientific fidelity needs a researched model, calibrated inputs where claimed, and validation beyond choosing an engine.

Read API documentation for the installed version before integrating. The official [Three.js animation overview](https://threejs.org/manual/en/animation-system.html) describes clip tracks, mixers and actions; its [glTF guide](https://threejs.org/manual/en/load-gltf.html) covers importing scene structure and materials. [Rapier rigid-body documentation](https://rapier.rs/docs/user_guides/javascript/rigid_bodies/) distinguishes dynamic and kinematic control. Read on 2026-09-07; these sources support tool responsibilities, not the accuracy of a generated asset.
