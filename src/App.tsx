import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ConstructOS } from './components/constructOS';
import { DiscordListeners } from './listeners/discord-listeners';
import AgentsPage from './pages/agents';
import ActionsPage from './pages/actions';
import ChatPage from './pages/chat';
import DocsPage from './pages/docs';
import DevPanel from './components/dev-panel';
import NavBar from './components/shared/NavBar';
import SettingsPage from './pages/settings';

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const greenTheme = {
    bgImage: "/backgrounds/bluedefault.svg",
    bgColor: "lime-200",
    borderColor: "lime-200",
  };

  const selectedTheme = greenTheme;

  const isDev = process.env.NODE_ENV === 'development';
  return (
  <div className='App'>
    <Router>
      <DiscordListeners/>
      <NavBar />
      <Routes>
        <Route path='/*' element={<></>} />
        <Route path='/actions' element={<ActionsPage/>} />
        <Route path='/agents' element={<AgentsPage/>} />
        <Route path='/chat' element={<ChatPage themeProps={selectedTheme}/>} />
        <Route path='/docs' element={<DocsPage/>} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/terminal' element={<ConstructOS/>} />
      </Routes>
      {isDev ? <DevPanel /> : null}
    </Router>
  </div>
  )
}

export default App
