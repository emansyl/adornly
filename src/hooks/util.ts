export function fetchWithBody(
  url: string,
  method: "GET" | "PUT" | "POST" | "DEL",
  data: any
) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
