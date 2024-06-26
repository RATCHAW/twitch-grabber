import axios from "axios"

const clipDirectUrl = async (originalUrl: string) => {
  const parts = originalUrl.split("/")
  const clip_id = parts[parts.length - 1]

  const requestData = [
    {
      extensions: {
        persistedQuery: {
          sha256Hash: "36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11",
          version: 1,
        },
      },
      operationName: "VideoAccessToken_Clip",
      variables: {
        slug: clip_id,
      },
    },
  ]

  const twitchClipData = await axios.post("https://gql.twitch.tv/gql", requestData, {
    headers: {
      "Content-Type": "application/json",
      "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko",
    },
  })
  if (twitchClipData) {
    const data: string = twitchClipData?.data[0]?.data.clip?.videoQualities[0]?.sourceURL
    if (!data) {
      return null
    }
    const mp4url = data.replace(
      "https://production.assets.clips.twitchcdn.net/",
      "https://clips-media-assets2.twitch.tv/",
    )
    return mp4url
  } else {
    return null
  }
}

export default clipDirectUrl
