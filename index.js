const rp = require("request-promise-native");

exports.shorten = async function(
  apiUrl,
  apiKey,
  longUrl,
  code,
  expand = false
) {
  const options = {
    method: "POST",
    uri: `${apiUrl}/create`,
    json: { longUrl, code, apiKey }
  };

  // CORS headers if on browser
  if (typeof window !== "undefined") {
    options.headers = {
      Origin: window.location.origin
    };
  }

  return rp(options)
    .then(function(data) {
      return expand ? data : data.shortUrl;
    })
    .catch(function(err) {
      return expand
        ? {
            longUrl,
            error: true,
            message: err.message
          }
        : longUrl;
    });
};

exports.batchShorten = async function(
  apiUrl,
  apiKey,
  longUrls,
  expand = false
) {
  const options = {
    method: "POST",
    uri: `${apiUrl}/create`,
    json: { longUrl: longUrls, apiKey }
  };

  // CORS headers if on browser
  if (typeof window !== "undefined") {
    options.headers = {
      Origin: window.location.origin
    };
  }

  return rp(options)
    .then(async function(data) {
      return expand
        ? data
        : await Promise.all(
            data.map(async res => {
              return res.shortUrl || res.longUrl;
            })
          );
    })
    .catch(async function(err) {
      return await Promise.all(
        longUrls.map(async longUrl => {
          return expand
            ? {
                longUrl,
                error: true,
                message: err.message
              }
            : longUrl;
        })
      );
    });
};
