// Rebuild the policy HTML after editing its Markdown source. The public site
// serves the generated HTML directly and does not need Node or JavaScript.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { Marked } = await import(process.env.MARKED_MODULE || 'marked');
const privacyIds = {
  'WHAT INFORMATION DO WE COLLECT?': 'infoCollect',
  'HOW DO WE PROCESS YOUR INFORMATION?': 'processInfo',
  'WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?': 'legalBases',
  'WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?': 'shareInfo',
  'IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?': 'transferInfo',
  'HOW LONG DO WE KEEP YOUR INFORMATION?': 'infoRetention',
  'HOW DO WE KEEP YOUR INFORMATION SAFE?': 'infoSafety',
  'DO WE COLLECT INFORMATION FROM MINORS?': 'minorsInfo',
  'WHAT ARE YOUR PRIVACY RIGHTS?': 'privacyRights',
  'CONTROLS FOR DO-NOT-TRACK FEATURES': 'doNotTrack',
  'DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?': 'usRights',
  'DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?': 'regionRights',
  'DO WE MAKE UPDATES TO THIS NOTICE?': 'noticeUpdates',
  'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?': 'contact',
  'HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?': 'reviewUpdateDelete',
};

for (const [source, output, sunset] of [
  ['sunset-score/privacy-policy.md', 'sunset-score/index.html', true],
  ['terms-and-privacy.md', 'double-you/index.html', false],
]) {
  const used = new Set();
  const marked = new Marked({ gfm: true, renderer: {
    heading(token) {
      const text = token.text.replace(/^\d+\.\s*/, '');
      let id = sunset && privacyIds[text] || text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      if (sunset && token.depth === 1 && text === 'PRIVACY POLICY') id = 'privacy-notice';
      const base = id;
      for (let i = 2; used.has(id); i++) id = `${base}-${i}`;
      used.add(id);
      const depth = Math.min(6, token.depth + (sunset ? 1 : 0));
      return `<h${depth} id="${id}">${this.parser.parseInline(token.tokens)}</h${depth}>\n`;
    },
  }});
  const markdown = await readFile(resolve(root, source), 'utf8');
  // Repair the source's bare-www destination without changing policy wording.
  const content = marked.parse(markdown).replaceAll(
    'href="www.sunset-score.com/sunset-score"',
    'href="https://sunset-score.com/sunset-score/"',
  );
  const destination = resolve(root, output);
  const page = await readFile(destination, 'utf8');
  const pattern = /<!-- policy-content:start -->[\s\S]*?<!-- policy-content:end -->/;
  if (!pattern.test(page)) throw new Error(`Missing policy markers in ${output}`);
  await writeFile(destination, page.replace(pattern, `<!-- policy-content:start -->\n${content}<!-- policy-content:end -->`));
  console.log(`Rendered ${source} → ${output}`);
}
