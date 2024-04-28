export const withErrorHandling = <T>(fn: () => Promise<T>): () => Promise<T | Response> => {
  return async () => {
    try {
      return await fn();
    } catch (err) {
      console.error("Error occurred:", err);
      return new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  };
};
