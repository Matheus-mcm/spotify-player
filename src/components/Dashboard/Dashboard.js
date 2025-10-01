import './Dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [playerUri, setPlayerUri] = useState('');

  const accessToken = 'BQDXMtls23aUfs4cq26_kV6NYVmPA_5C4Ifrn2iMBeGh6f0LezVLFI3LIYRhhnEYK8KTh9mYY6P1RPgffhG1cqVHwLIY8jDXhv9SHhftt-6O6DyAFWartXt-VtdX5y6bQTF-JfrxwtaYsy37XCofvPiuYx_3nbFi-Mck0kAymjcNoAW6yk7SZcG2i6F4LCsst3JZ7swZx6I61vPSDw4JpR9HsiDlWgpaFJGd5Ju3zK8Sm_CNgmpV8-kQeL-UiTzEM8k64rQ'; // Ideal: passar como prop ou via Context

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (res.data && res.data.item) {
          const track = res.data.item;
          setCurrentTrack(track);
          setPlayerUri(track.uri); // ou um URI de contexto (playlist, album)
        }
      } catch (error) {
        console.error('Erro ao buscar música atual:', error);
      }
    };

    const fetchQueue = async () => {
      try {
        const res = await axios.get('https://api.spotify.com/v1/me/player/queue', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (res.data && res.data.queue) {
          setQueue(res.data.queue);
        }
      } catch (error) {
        console.error('Erro ao buscar fila de reprodução:', error);
      }
    };

    fetchCurrentTrack();
    fetchQueue();

    const interval = setInterval(() => {
      fetchCurrentTrack();
      fetchQueue();
    }, 10000); // atualiza a cada 10s

    return () => clearInterval(interval);
  }, [accessToken]);

  useEffect(() => {
    if (playerUri) {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById('embed-iframe');
        const options = {
          uri: playerUri,
          width: '100%',
          height: 80,
        };
        const callback = (EmbedController) => { };
        IFrameAPI.createController(element, options, callback);
      };
    }
  }, [playerUri]);

  return (
    <div className="dashboard-container">
      <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>

      {currentTrack && (
        <div className="current-track">
          <img src={currentTrack.album.images[0].url} alt="Capa do álbum" />
          <div>
            <h2>{currentTrack.name}</h2>
            <p>{currentTrack.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        </div>
      )}

      <div id="embed-iframe"></div>

      {queue.length > 0 && (
        <div className="queue-list">
          <h3>Próximas músicas:</h3>
          <ul>
            {queue.map((track, index) => (
              <li key={track.id || index}>
                <img src={track.album.images[2]?.url} alt="Capa" />
                <span>{track.name} - {track.artists.map(a => a.name).join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
