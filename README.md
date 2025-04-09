
# R2

So you've found R2, nice. I wanted to use a bullet journal-like habit tracker, so I've decided to build one.
It's a modern web app built to be intuitive, fast, and developer-friendly. It doesn't mean that it is (yet). This doc will walk you through what's under the hood, how to get it running locally, and how you can make it better.

## 🧱 What’s it made of?

I've picked tools that make building fast and efficient, as well as 100% free.

- **React** – It’s the backbone of the app. Components, state, all that good stuff.
- **TypeScript** – Because catching bugs *before* production feels like a win.
- **Supabase** – An open-source Postgres database with a generous free tier.
- **Clerk** – Plug-and-play auth without the tears. It takes care of sign-ups, logins, and all that identity jazz.
- **Tailwind CSS** – Utility-first styling that doesn’t make you want to cry. Your UI looks clean without a 400-line stylesheet.
- **React Query** – Data fetching that Just Works™. Goodbye, loading spinners from hell.

## 🛠️ Getting it running locally

Here’s how to go from 0 to local dev in under 5 minutes (depending on caffeine levels).

1. **Clone the repo**:
    ```bash
    git clone https://github.com/arthurdedeus/r2.git
    cd r2
    ```

2. **Install dependencies**:
    Make sure you’ve got Node.js installed. Then:
    ```bash
    npm install
    ```

3. **Add your env vars**:
    Create a `.env.local` file and drop in your keys:
    ```env
    POSTGRES_URL=
    POSTGRES_PRISMA_URL=
    SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_URL=
    POSTGRES_URL_NON_POOLING=
    SUPABASE_JWT_SECRET=
    POSTGRES_USER=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    POSTGRES_PASSWORD=
    POSTGRES_DATABASE=
    SUPABASE_SERVICE_ROLE_KEY=
    POSTGRES_HOST=

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    SIGNING_SECRET=

    NEXT_PUBLIC_POSTHOG_KEY=
    ```

4. **Fire it up**:
    ```bash
    npm run dev
    ```

5. **Visit** `http://localhost:3000/habits` and bask in the glory.
Actually, this won't really work until you have the db schema created.
I plan to update this documentation with instructions on how to set it up. For now, you'll have to guess it.

## 🤝 Want to contribute?

Yes, please. Found a bug? Got a cool feature idea? Submit an issue or open a PR. We’re friendly.

## 🪪 License

MIT. Do whatever you want. Responsibly.

## 👀 Poke around

Feel free to dive into the codebase and see how everything’s stitched together. Got questions? Reach out or open a discussion.

---

Let’s build cool stuff. 🎉
