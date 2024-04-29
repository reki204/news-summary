export const withErrorHandling = (fn: () => Promise<void>): () => Promise<Response> => {
  return async () => {
    try {
      await fn();
      return new Response(JSON.stringify({ message: "Operation completed successfully" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (err) {
      console.error("Error occurred:", err);
      return new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  };
};
