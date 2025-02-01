import fastify from "fastify";

export const server = fastify({
  logger: true,
});

server.get("/health", (req, reply) => {
  return reply.send({ message: "Its alive" });
});

server.listen(
  {
    port: 4000,
    host: "0.0.0.0",
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);
