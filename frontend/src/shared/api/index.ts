import { config } from "shared/config"

export const fetcherMatchById = (id: number) => async (): Promise<Match> => {
  const response = await fetch(`${config.API_URL}/match/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export const fetcherMatches = () => (): Promise<ResponseData<Match[]>> => {
  return fetch(`${config.API_URL}/match?status=CREATED`, {
    method: "GET",
  }).then((res) => res.json())
}

export const fetcherMatchesByIds =
  (sport: string, matchesIds: number[]) =>
  (): Promise<ResponseData<Match[]>> => {
    return fetch(
      `${config.API_URL}/match?status=CREATED&sport=${sport}&matchesIds=${matchesIds}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  }

export const fetcherMatchesBySport =
  (sport: string, limit: number, page: number) =>
  (): Promise<ResponseData<Match[]>> => {
    return fetch(
      `${config.API_URL}/match?status=CREATED&sport=${sport}&limit=${limit}&page=${page}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  }

export const createMatchAPI = async ({
  sc_id,
  title,
  sport_id,
  status,
  markets,
  start_at,
}: {
  sc_id: number
  title: string
  sport_id: string
  status: number
  markets: string
  start_at: number
}) => {
  const response = await fetch(`${config.API_URL}/match`, {
    method: "POST",
    body: JSON.stringify({
      sc_id,
      title,
      sport_id,
      status,
      markets,
      start_at,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}
