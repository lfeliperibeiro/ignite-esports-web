import './styles/main.css'
import logo from './assets/logo-nlw-esports.svg'
import { GamesBanner } from './components/GamesBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import { api } from './lib/api'

interface Games {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Games[]>([])

  useEffect(() => {
    api.get('/games').then((response) => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className={'max-w-[1344px] mx-auto flex items-center flex-col my-20'}>
      <img src={logo} alt="" />
      <h1 className={'text-6xl text-white font-black mt-20'}>
        Seu{' '}
        <span className={'bg-nlw-gradient bg-clip-text text-transparent'}>
          duo
        </span>{' '}
        está aqui.
      </h1>
      <div className={'grid grid-cols-6 gap-6 mt-16'}>
        {games.map((game) => {
          return (
            <GamesBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <CreateAdBanner />
    </div>
  )
}

export default App
