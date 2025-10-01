import './Dashboard.css';

function Dashboard() {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
      uri: ''
    };
    const callback = (EmbedController) => { };
    IFrameAPI.createController(element, options, callback);
  };

  return (
    <div className="dashboard-container">
      <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
      <div id="embed-iframe"></div>
    </div >
  );
}

export default Dashboard;