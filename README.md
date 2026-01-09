# Who's That Pokémon?

A small **React + TypeScript + Tailwind** game inspired by the classic 90's TV show segment *"Who's That Pokémon?"*. Guess the Pokémon before the reveal!

[Try it out here!](https://whos-that-pokemon-azure.vercel.app/)

---

## Screenshots
<img width="270" height="350" alt="image" src="https://github.com/user-attachments/assets/0f5ce0cf-dbb5-44e3-a2c2-85f199e7c8d5" />
<img width="270" height="350" alt="image" src="https://github.com/user-attachments/assets/ed3d1846-2f38-459b-9b46-e35b0c839643" />
<img width="270" height="350" alt="image" src="https://github.com/user-attachments/assets/7d3a61a1-16d8-43ee-9bcd-27438001018a" />

---

## Features

- 🎮 **Gen 1 Pokémon** – Includes all 151 original Pokémon.
- 🔍 **Auto-complete suggestions** – Powered by [Fuse.js](https://fusejs.io/) fuzzy search to help avoid spelling errors. Pills are color-coded dpending on the suggested Pokémon's type
- 🖥️ **Responsive design** – Looks great on both desktop and mobile.
- 📺 **CRT effect** – Retro TV filter using [vault66-crt-effect](https://github.com/mdombrov-33/vault66-crt-effect).
- ✨ **Custom font** – Gives the game a unique, nostalgic feel.
- 🛠️ **Learning project** – Exercises many React concepts:
  - `useState`, `useContext`, `useMemo`
  - Custom hooks
  - Reusable components
  - Tailwind

---

## Tech Stack

- **React** – Frontend framework  
- **TypeScript** – Type safety for scalable code  
- **Tailwind CSS** – Utility-first styling  
- **Fuse.js** – Fuzzy search for Pokémon names  
- **Vault66 CRT effect** – Retro display effect
- **SVGs** - T.V. and Pokeball SVGs were generated via ChatGPT and then edited in Inkscape

---

## Future Improvements

- **Better dynamic sizing** - To get things to generally resize to the screen but with a consistent card aspect-ratio (not overflowing height or width) I used a whole lot of text-[min(6vw,6vh)] type properties. It's pretty ugly and makes it sort of impossible to use as a standalone component inside of another project. I'd like to find a better way and refactor at some point
- **Gamification** - This is more of a toy than a game, but it could be fun to make a sort of "Catch Phrase" game loop out of it where You have a time limit and have to get as many as possible in that time. (or something like that)
- **More Generations** - Could add a menu somewhere that allows you to select more than just gen 1. I only know gen 1 though so that's how it's gonna stay for now 😋
