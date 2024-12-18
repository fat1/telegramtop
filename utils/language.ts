import { create } from 'zustand'

type Language = 'en' | 'es' | 'ru' | 'zh'

type LanguageStore = {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}))

export const translations = {
  en: {
    channel: 'Channel',
    bot: 'Bot',
    group: 'Group',
    user: 'User',
    subscribe: 'Subscribe',
    language: 'Language',
    subscribeToUpdates: 'Subscribe to updates',
  },
  es: {
    channel: 'Canal',
    bot: 'Bot',
    group: 'Grupo',
    user: 'Usuario',
    subscribe: 'Suscribirse',
    language: 'Idioma',
    subscribeToUpdates: 'Suscribirse a actualizaciones',
  },
  ru: {
    channel: 'Канал',
    bot: 'Бот',
    group: 'Группа',
    user: 'Пользователь',
    subscribe: 'Подписаться',
    language: 'Язык',
    subscribeToUpdates: 'Подписаться на обновления',
  },
  zh: {
    channel: '频道',
    bot: '机器人',
    group: '群组',
    user: '用户',
    subscribe: '订阅',
    language: '语言',
    subscribeToUpdates: '订阅更新',
  },
}

