# 🌪️ ChaosCook - The Unhinged Recipe Generator

ChaosCook is a chaotic culinary adventure generator that turns your random ingredients into absolutely wild recipes, complete with unhinged commentary. It's the perfect tool for when you're staring at your fridge wondering "what cursed meal can I make with these leftovers?"

## ✨ Features

- 🧪 **Chaotic Recipe Generation**: Input whatever ingredients you have, and get back a completely unhinged recipe
- 🤪 **Unhinged Commentary**: Each recipe comes with hilariously chaotic cooking instructions and commentary
- 👍 **Vote on Chaos**: Upvote the most cursed creations
- 🔄 **Real-time Updates**: Watch as new chaotic recipes appear in the gallery
- 📱 **Responsive Design**: Create culinary chaos on any device

## 🛠️ Tech Stack

- **Frontend**: React (TypeScript) with Shadcn UI components
- **Backend**: Express.js
- **AI**: OpenAI GPT-4o for generating unhinged recipes
- **Styling**: Tailwind CSS with custom neon/glitch effects
- **State Management**: TanStack Query
- **Routing**: Wouter

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Create a `.env` file
   - Add your OpenAI API key: `OPENAI_API_KEY=your_key_here`

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎮 How to Use

1. Visit the homepage
2. Enter your ingredients in the input fields
3. Click "Generate Chaos!" to create your cursed recipe
4. Upvote your favorite chaotic creations
5. Share the madness with your friends

## 🎨 UI Features

- Dark mode with vibrant neon accents
- Glitch animations for that extra chaotic feel
- Responsive card layout for recipe display
- Loading skeletons for smooth user experience

## 🔜 Coming Soon

- 📸 Image recognition for fridge scanning
- 👤 User authentication and profiles
- 📊 Recipe popularity leaderboards
- 🌈 More chaos!

## 💻 Development

The project uses Vite for fast development and builds. The development server runs on port 5000 and includes both the frontend and backend.

### Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   └── lib/        # Utility functions
├── server/          # Express backend
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage
└── shared/          # Shared types and schemas
```

### API Endpoints

- `POST /api/recipes/generate` - Generate a new chaotic recipe
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes/:id/upvote` - Upvote a recipe

## 🤝 Contributing

Feel free to contribute to the chaos! Open an issue or submit a PR to add more features or enhance the existing ones.

## 📄 License

MIT License - Feel free to use this for your own chaotic culinary adventures!
