import { config } from "shared/config"

export const fetcherMatches = () => (): Promise<Match[]> => {
  return fetch(`${config.API_URL}/match?status=CREATED`, {
    method: "GET",
  }).then((res) => res.json())
}

export const fetcherMatchesBySport =
  (sport: string) => (): Promise<Match[]> => {
    return fetch(`${config.API_URL}/match?status=CREATED&sport=${sport}`, {
      method: "GET",
    }).then((res) => res.json())
  }
