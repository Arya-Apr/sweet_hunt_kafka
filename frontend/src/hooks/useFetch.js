export function useFetch(url, method, token) {
    method = method || "GET";
    let payload = null;
    const setPayload = (pl) => {
        payload = pl;
    };
    async function MakeHttpRequest(id, query) {
        try {
            const response = await fetch(id && query
                ? url + id + query
                : id
                    ? url + id
                    : query
                        ? url + query
                        : url, method !== "GET"
                ? {
                    method: method,
                    headers: token
                        ? {
                            Authorization: `Bearer ${token}`,
                            "content-type": "application/json",
                        }
                        : { "content-type": "application/json" },
                    body: JSON.stringify(payload),
                }
                : token
                    ? {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                    : {});
            if (response.status >= 400 && response.status <= 505) {
                return { error: "Unable to perform an action", result: null };
            }
            else {
                const result = await response.json();
                return { error: null, result: result };
            }
        }
        catch (ex) {
            return { error: "Unable to perform an action", result: null };
        }
    }
    if (method === "PATCH" || method === "PUT" || method === "POST" || method == "DELETE") {
        return { setPayload, MakeHttpRequest };
    }
    else {
        return { MakeHttpRequest };
    }
}
