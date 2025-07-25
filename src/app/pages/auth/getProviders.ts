import { getProviders } from 'next-auth/react'

export const getAuthProviders = async () => {
  const providers = await getProviders()

  if (!providers) return null

  const emailProvider = Object.values(providers).filter((provider) => {
    if (provider.name === 'Email') {
      return true
    }
  })

  const oAuthProviders = Object.values(providers).filter((provider) => {
    if (provider.name == 'Google') {
      return true
    }
  })

  return { oAuthProviders, emailProvider }
}
