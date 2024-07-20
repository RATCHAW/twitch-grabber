import axios from "axios"

const clipDirectUrl = async (originalUrl: string) => {
  const url = new URL(originalUrl)
  const modifiedUrl = url.toString()
  const parts = modifiedUrl.split("/")
  const clip_id = parts[parts.length - 1]

  console.log(modifiedUrl)
  const requestData = [
    {
      operationName: "ClipMetadata",
      variables: {},
      extensions: {
        persistedQuery: { version: 1, sha256Hash: "49817470e0129051cd93c86069aee755795f1a952688f0111bac71a49841ece7" },
      },
    },
    {
      operationName: "ShareClipRenderStatus",
      variables: { slug: clip_id },
      extensions: {
        persistedQuery: { version: 1, sha256Hash: "f130048a462a0ac86bb54d653c968c514e9ab9ca94db52368c1179e97b0f16eb" },
      },
    },
    {
      operationName: "GetDisplayName",
      variables: { login: "" },
      extensions: {
        persistedQuery: { version: 1, sha256Hash: "ba351b3d3018c3779fcaa398507e41579ae6cf12ad123a04f090943c21dedb8a" },
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
    const data: string = twitchClipData?.data[1]?.data?.clip?.videoQualities[0]?.sourceURL
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
