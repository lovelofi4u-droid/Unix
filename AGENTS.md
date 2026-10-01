<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Site content is data-driven: edit arrays in src/data/content.ts (videos, testimonials, services, process, clients); components never hardcode cards.
WhatsApp number and calendar link live in src/data/content.ts (WHATSAPP_NUMBER, CALENDAR_URL) — placeholders until the client supplies real values.
