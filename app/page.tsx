'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface ContentItem {
  name: string
  username: string
  category: string
  description: string
}

const EXAMPLE_DATA: Record<string, ContentItem[]> = {
  bots: [
    { name: "Bitcoin Price Bot", username: "BitcoinPriceBot", category: "Cryptocurrency", description: "Get real-time Bitcoin price updates" },
    { name: "Weather Forecast", username: "WeatherForecastBot", category: "Utilities", description: "Daily weather forecasts for your location" },
    { name: "Language Translator", username: "TranslatorBot", category: "Utilities", description: "Translate text between multiple languages" },
    { name: "Movie Recommendations", username: "MovieRecsBot", category: "Entertainment", description: "Get personalized movie recommendations" },
    { name: "News Aggregator", username: "DailyNewsBot", category: "News", description: "Curated news from various sources" },
    { name: "Reminder Bot", username: "ReminderAssistant", category: "Productivity", description: "Set and manage reminders" },
    { name: "Fitness Tracker", username: "FitnessPalBot", category: "Health", description: "Track your workouts and nutrition" },
    { name: "Trivia Challenge", username: "TriviaChampBot", category: "Games", description: "Daily trivia questions and quizzes" },
    { name: "Stock Market Bot", username: "StockTrackerBot", category: "Finance", description: "Real-time stock market updates" },
    { name: "Recipe Finder", username: "ChefAssistantBot", category: "Food", description: "Find recipes based on ingredients" },
    { name: "Travel Planner", username: "TravelGuruBot", category: "Travel", description: "Plan your trips and get travel tips" },
    { name: "Math Solver", username: "MathWhizBot", category: "Education", description: "Solve complex math problems" },
    { name: "Meditation Guide", username: "ZenMasterBot", category: "Lifestyle", description: "Guided meditation sessions" },
    { name: "Job Search Assistant", username: "CareerFinderBot", category: "Career", description: "Find job openings and career advice" },
    { name: "Meme Generator", username: "MemeMasterBot", category: "Entertainment", description: "Create and share memes" },
    { name: "Crypto Portfolio Tracker", username: "CryptoPortfolioBot", category: "Cryptocurrency", description: "Track your cryptocurrency investments" },
    { name: "Language Learning Bot", username: "LinguaLearnerBot", category: "Education", description: "Daily language lessons and quizzes" },
    { name: "Event Reminder", username: "EventBuddyBot", category: "Productivity", description: "Keep track of upcoming events" },
    { name: "Workout Generator", username: "FitnessCoachBot", category: "Health", description: "Generate personalized workout routines" },
    { name: "Book Recommendations", username: "BookwormBot", category: "Entertainment", description: "Get book recommendations based on your preferences" },
    { name: "Expense Tracker", username: "BudgetMasterBot", category: "Finance", description: "Track your expenses and manage your budget" },
    { name: "Habit Tracker", username: "HabitHeroBot", category: "Productivity", description: "Build and maintain good habits" },
    { name: "Tech News Bot", username: "TechUpdateBot", category: "Technology", description: "Latest news in the tech world" },
    { name: "Mood Tracker", username: "MoodMateBot", category: "Health", description: "Track your daily mood and emotions" },
    { name: "Podcast Recommender", username: "PodcastPalBot", category: "Entertainment", description: "Discover new podcasts based on your interests" },
    { name: "Fact of the Day", username: "FactoidBot", category: "Education", description: "Learn a new fact every day" },
    { name: "Cocktail Recipe Bot", username: "MixologistBot", category: "Food", description: "Find and share cocktail recipes" },
    { name: "Astronomy Bot", username: "StarGazerBot", category: "Science", description: "Daily astronomy facts and sky events" },
    { name: "Motivational Quotes", username: "InspirationBot", category: "Lifestyle", description: "Daily motivational quotes and affirmations" },
    { name: "Currency Converter", username: "ForexBot", category: "Finance", description: "Real-time currency conversion" }
  ],
  groups: [
    { name: "Crypto Traders United", username: "CryptoTradersUnited", category: "Cryptocurrency", description: "Discussion group for cryptocurrency traders" },
    { name: "Book Lovers Club", username: "BookLoversClub", category: "Entertainment", description: "Share and discuss your favorite books" },
    { name: "Tech Enthusiasts", username: "TechEnthusiasts", category: "Technology", description: "Stay updated with the latest tech news and gadgets" },
    { name: "Travel Adventures", username: "TravelAdventuresGroup", category: "Travel", description: "Share travel experiences and tips" },
    { name: "Foodies Paradise", username: "FoodiesParadise", category: "Food", description: "Share recipes and restaurant recommendations" },
    { name: "Language Exchange", username: "LanguageExchangeGroup", category: "Education", description: "Practice languages with native speakers" },
    { name: "Startup Networking", username: "StartupNetworking", category: "Business", description: "Connect with other entrepreneurs and startup enthusiasts" },
    { name: "Fitness Motivation", username: "FitnessMotivationGroup", category: "Health", description: "Share fitness tips and motivate each other" },
    { name: "Digital Nomads", username: "DigitalNomadsUnite", category: "Lifestyle", description: "Connect with other digital nomads around the world" },
    { name: "Movie Buffs", username: "CinephilesClub", category: "Entertainment", description: "Discuss and review movies" },
    { name: "Eco Warriors", username: "EcoWarriorsUnite", category: "Environment", description: "Discuss environmental issues and sustainability" },
    { name: "Pet Lovers", username: "PetLoversParadise", category: "Pets", description: "Share pet photos and advice" },
    { name: "Freelance Hub", username: "FreelancersNetwork", category: "Career", description: "Network and share opportunities for freelancers" },
    { name: "Art Appreciation", username: "ArtEnthusiasts", category: "Art", description: "Discuss and share various forms of art" },
    { name: "Mindfulness & Meditation", username: "MindfulnessGroup", category: "Wellness", description: "Practice mindfulness and meditation together" },
    { name: "DIY Crafters", username: "DIYCraftersUnite", category: "Hobbies", description: "Share DIY projects and crafting tips" },
    { name: "Blockchain Developers", username: "BlockchainDevs", category: "Technology", description: "Discuss blockchain development and projects" },
    { name: "Fashion Trends", username: "FashionistasUnite", category: "Fashion", description: "Discuss the latest fashion trends" },
    { name: "Parenting Support", username: "ParentingCircle", category: "Family", description: "Support and advice for parents" },
    { name: "Music Producers", username: "BeatMakersClub", category: "Music", description: "Collaborate and share music production tips" },
    { name: "Sustainable Living", username: "EcoLifestyleGroup", category: "Lifestyle", description: "Tips for living a more sustainable life" },
    { name: "Amateur Astronomers", username: "StarGazersClub", category: "Science", description: "Discuss astronomy and stargazing" },
    { name: "Mental Health Support", username: "MentalHealthAllies", category: "Health", description: "Support group for mental health awareness" },
    { name: "Vegan Recipe Sharing", username: "VeganFoodies", category: "Food", description: "Share and discuss vegan recipes" },
    { name: "Cybersecurity Experts", username: "CyberSecurityPros", category: "Technology", description: "Discuss latest in cybersecurity" },
    { name: "Creative Writers", username: "WritersSociety", category: "Writing", description: "Share and critique creative writing" },
    { name: "Home Gardeners", username: "GreenThumbsUnite", category: "Gardening", description: "Tips and advice for home gardening" },
    { name: "Board Game Enthusiasts", username: "BoardGamersClub", category: "Games", description: "Discuss and organize board game sessions" },
    { name: "Personal Finance", username: "FinancialFreedomSeekers", category: "Finance", description: "Discuss personal finance strategies" },
    { name: "LGBTQ+ Support", username: "PrideAlliance", category: "Community", description: "Support and discussion group for LGBTQ+ individuals" }
  ],
  channels: [
    { name: "Tech News Daily", username: "TechNewsDaily", category: "Technology", description: "Daily updates on the latest tech news" },
    { name: "Travel Tips & Tricks", username: "TravelTipsChannel", category: "Travel", description: "Expert travel advice and destination guides" },
    { name: "Crypto Market Updates", username: "CryptoMarketUpdates", category: "Cryptocurrency", description: "Real-time cryptocurrency market analysis" },
    { name: "Healthy Recipe Ideas", username: "HealthyRecipes", category: "Food", description: "Daily healthy and delicious recipe ideas" },
    { name: "Daily Motivation", username: "DailyMotivationQuotes", category: "Lifestyle", description: "Inspirational quotes and motivational content" },
    { name: "Science Discoveries", username: "ScienceDiscoveries", category: "Science", description: "Latest breakthroughs in scientific research" },
    { name: "Movie Reviews", username: "MovieReviewsChannel", category: "Entertainment", description: "Reviews of the latest movie releases" },
    { name: "Fashion Trends", username: "FashionTrendsDaily", category: "Fashion", description: "Daily updates on the latest fashion trends" },
    { name: "Fitness Tips", username: "DailyFitnessTips", category: "Health", description: "Daily workout tips and fitness advice" },
    { name: "World News Roundup", username: "WorldNewsDaily", category: "News", description: "Daily summary of major world events" },
    { name: "Startup Insights", username: "StartupDaily", category: "Business", description: "News and insights from the startup world" },
    { name: "Art of the Day", username: "DailyArtDose", category: "Art", description: "Featured artwork and artist spotlights" },
    { name: "Bookworm's Corner", username: "DailyBookReviews", category: "Books", description: "Book recommendations and reviews" },
    { name: "Eco Living Tips", username: "GreenLivingDaily", category: "Environment", description: "Tips for sustainable and eco-friendly living" },
    { name: "Pet Care Advice", username: "PetCareChannel", category: "Pets", description: "Expert advice on pet care and health" },
    { name: "Career Development", username: "CareerGrowthTips", category: "Career", description: "Tips and advice for career advancement" },
    { name: "DIY Home Improvement", username: "DIYHomeProjects", category: "Home", description: "DIY projects and home improvement tips" },
    { name: "Mental Wellness", username: "MindfulnessDaily", category: "Health", description: "Daily tips for mental health and wellness" },
    { name: "Gamer's Paradise", username: "GamingNewsDaily", category: "Gaming", description: "Latest gaming news and reviews" },
    { name: "Foodie Adventures", username: "FoodieFinds", category: "Food", description: "Culinary discoveries and restaurant reviews" },
    { name: "Financial Literacy", username: "FinancialEducation101", category: "Finance", description: "Daily lessons on personal finance" },
    { name: "Language Learning", username: "DailyLanguageLessons", category: "Education", description: "Daily language learning tips and lessons" },
    { name: "Photography Tips", username: "PhotoTipsDaily", category: "Photography", description: "Daily photography tips and techniques" },
    { name: "Parenting Hacks", username: "ParentingTipsChannel", category: "Family", description: "Helpful tips and advice for parents" },
    { name: "Music Discovery", username: "NewMusicDaily", category: "Music", description: "Discover new music releases daily" },
    { name: "Productivity Hacks", username: "ProductivityBoost", category: "Productivity", description: "Tips to increase your daily productivity" },
    { name: "Space Exploration", username: "SpaceNewsDaily", category: "Science", description: "Latest news in space exploration" },
    { name: "Mindful Meditation", username: "DailyMeditationGuide", category: "Wellness", description: "Guided meditation sessions and mindfulness tips" },
    { name: "Coding Challenges", username: "DailyCodingProblems", category: "Programming", description: "Daily coding challenges for developers" },
    { name: "History Facts", username: "HistoryUnveiled", category: "Education", description: "Daily interesting historical facts" }
  ],
  apps: [
    { name: "Telegram Wallet", username: "TelegramWalletApp", category: "Finance", description: "Secure cryptocurrency wallet for Telegram" },
    { name: "Language Learning Pro", username: "LanguageLearningPro", category: "Education", description: "Interactive language learning courses" },
    { name: "Fitness Tracker Plus", username: "FitnessTrackerPlus", category: "Health", description: "Track your workouts and health goals" },
    { name: "Meditation Guide", username: "MeditationGuideApp", category: "Lifestyle", description: "Guided meditation sessions for relaxation" },
    { name: "Travel Planner", username: "TravelPlannerApp", category: "Travel", description: "Plan your trips and manage itineraries" },
    { name: "Recipe Manager", username: "RecipeManagerApp", category: "Food", description: "Organize and discover new recipes" },
    { name: "Crypto Portfolio", username: "CryptoPortfolioApp", category: "Cryptocurrency", description: "Manage and track your crypto investments" },
    { name: "Task Organizer", username: "TaskOrganizerApp", category: "Productivity", description: "Efficiently manage your tasks and projects" },
    { name: "News Aggregator", username: "NewsAggregatorApp", category: "News", description: "Personalized news feed from various sources" },
    { name: "Movie Tracker", username: "MovieTrackerApp", category: "Entertainment", description: "Track movies you've watched and want to watch" },
    { name: "Budget Planner", username: "BudgetPlannerApp", category: "Finance", description: "Manage your personal finances and budgets" },
    { name: "Habit Builder", username: "HabitBuilderApp", category: "Productivity", description: "Build and track positive habits" },
    { name: "Virtual Bookshelf", username: "VirtualBookshelfApp", category: "Books", description: "Manage your book collection and reading list" },
    { name: "Eco Footprint", username: "EcoFootprintApp", category: "Environment", description: "Track and reduce your carbon footprint" },
    { name: "Pet Care Tracker", username: "PetCareTrackerApp", category: "Pets", description: "Manage your pet's health and care routines" },
    { name: "Job Search Assistant", username: "JobSearchAssistantApp", category: "Career", description: "Find job openings and track applications" },
    { name: "Home Inventory", username: "HomeInventoryApp", category: "Home", description: "Keep track of your home inventory and valuables" },
    { name: "Mental Health Tracker", username: "MentalHealthTrackerApp", category: "Health", description: "Monitor your mental health and mood patterns" },
    { name: "Game Companion", username: "GameCompanionApp", category: "Gaming", description: "Track your gaming stats and achievements" },
    { name: "Restaurant Finder", username: "RestaurantFinderApp", category: "Food", description: "Discover and review local restaurants" },
    { name: "Investment Portfolio", username: "InvestmentPortfolioApp", category: "Finance", description: "Manage and analyze your investment portfolio" },
    { name: "Language Flashcards", username: "LanguageFlashcardsApp", category: "Education", description: "Create and study language flashcards" },
    { name: "Photo Editor Pro", username: "PhotoEditorProApp", category: "Photography", description: "Advanced photo editing tools" },
    { name: "Family Organizer", username: "FamilyOrganizerApp", category: "Family", description: "Coordinate family schedules and activities" },
    { name: "Music Practice Tracker", username: "MusicPracticeTrackerApp", category: "Music", description: "Track your music practice sessions" },
    { name: "Focus Timer", username: "FocusTimerApp", category: "Productivity", description: "Boost productivity with Pomodoro technique" },
    { name: "Star Map", username: "StarMapApp", category: "Science", description: "Interactive star map and astronomy guide" },
    { name: "Yoga Studio", username: "YogaStudioApp", category: "Wellness", description: "Guided yoga sessions for all levels" },
    { name: "Code Playground", username: "CodePlaygroundApp", category: "Programming", description: "Practice coding with interactive challenges" },
    { name: "Historical Timeline", username: "HistoricalTimelineApp", category: "Education", description: "Interactive timelines of historical events" }
  ]
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('bots')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const filteredData = EXAMPLE_DATA[activeTab].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase())
  )

  const renderGrid = (items: ContentItem[]) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">
              <Link href={`/${activeTab}/${item.username}`} className="hover:underline">
                {item.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">@{item.username}</p>
            <Badge variant="secondary" className="mt-2">{item.category}</Badge>
            <p className="mt-2 text-sm">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M21.58 11.4L3.15 2.95a1 1 0 00-1.35 1.13l1.7 6.3a1 1 0 00.75.75l6.3 1.7a1 1 0 010 1.9l-6.3 1.7a1 1 0 00-.75.75L1.8 22.2a1 1 0 001.35 1.13L21.58 15a1 1 0 000-1.8z" />
              </svg>
              <span className="hidden font-bold sm:inline-block">
                Telegram Discovery
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted">
                <TabsTrigger 
                  value="bots"
                  className="data-[state=active]:bg-[#0088cc] data-[state=active]:text-white"
                >
                  Bots
                </TabsTrigger>
                <TabsTrigger 
                  value="groups"
                  className="data-[state=active]:bg-[#0088cc] data-[state=active]:text-white"
                >
                  Groups
                </TabsTrigger>
                <TabsTrigger 
                  value="channels"
                  className="data-[state=active]:bg-[#0088cc] data-[state=active]:text-white"
                >
                  Channels
                </TabsTrigger>
                <TabsTrigger 
                  value="apps"
                  className="data-[state=active]:bg-[#0088cc] data-[state=active]:text-white"
                >
                  Apps
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="default" asChild className="bg-[#0088cc] hover:bg-[#0088cc]/90">
              <Link href="/add-content">Add Content</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Discover Telegram Content</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input 
            placeholder="Search content..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-1/2"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-1/2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="productivity">Productivity</SelectItem>
              <SelectItem value="games">Games</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="pets">Pets</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
              <SelectItem value="hobbies">Hobbies</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
              <SelectItem value="gardening">Gardening</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderGrid(filteredData)}
      </main>
    </div>
  )
}

