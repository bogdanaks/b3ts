import { config } from "shared/config"

export const fetcherMatches = () => (): Promise<ResponseData<Match[]>> => {
  return fetch(`${config.API_URL}/match?status=CREATED`, {
    method: "GET",
  }).then((res) => res.json())
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
