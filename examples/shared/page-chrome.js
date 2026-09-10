/** Page-chrome flags. `?plate=1` hides every HUD for capture. `?embed=1` hides the title, readouts
 * and hint so a host (the landing-page modal) can supply its own chrome without covering the model.
 * The viewer contract, the loading state and the error state stay visible in both modes. */

/** True only for an explicit `plate=1`; any other value (or none) leaves the page as authored. */
export function plateMode(search){
 return new URLSearchParams(typeof search==='string'?search:'').get('plate')==='1';
}

/** True only for an explicit `embed=1`. */
export function embedMode(search){
 return new URLSearchParams(typeof search==='string'?search:'').get('embed')==='1';
}

/** Sets `data-plate="1"` on `<html>` when plate mode is on. Returns the mode, never throws on a
 * document stub without a documentElement (the node test passes one). */
export function applyPlate(doc,search){
 const plate=plateMode(search);
 if(plate&&doc?.documentElement?.dataset)doc.documentElement.dataset.plate='1';
 return plate;
}

/** Sets `data-embed="1"` on `<html>` when embed mode is on. Same stub-safety as `applyPlate`. */
export function applyEmbed(doc,search){
 const embed=embedMode(search);
 if(embed&&doc?.documentElement?.dataset)doc.documentElement.dataset.embed='1';
 return embed;
}
