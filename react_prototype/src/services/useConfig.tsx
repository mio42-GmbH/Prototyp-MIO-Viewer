export const initialConfig: {
  XML_DATA: string[]
} = {
  XML_DATA: [],
}

export async function loadConfig() {
  let config = initialConfig
  try {
    config = await (await fetch('config.json')).json()
  } catch (e) {
    console.log(e)
  }
  return config
}
