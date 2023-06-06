const API_URL = "https://j635an2edqmaoyggrqy4sritge0qlsqf.lambda-url.us-east-2.on.aws";

const fetchWrap = (url, { method = "GET", body = undefined, headers = { "Content-Type": "application/json" } }) => {
  return fetch(`${API_URL}${url}`, {
    method,
    body: body && typeof body === "string" ? body : JSON.stringify(body),
    headers,
  });
};

export default fetchWrap;
