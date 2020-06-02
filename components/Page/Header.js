import Head from "next/head";

const Header = () => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.bundle.min.js"></script>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
      <script>
        window.onSpotifyWebPlaybackSDKReady = () => {
            const access_token = props.access_token;
            const player = new Spotify.Player({
              name: 'Web Playback SDK Quick Start Player',
              getOAuthToken: cb => { cb(access_token); }
            });
        };
      </script>
    </Head>
  </div>
);

export default Header;
