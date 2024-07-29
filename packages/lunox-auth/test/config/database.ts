export default {
  default: "sqlite",
  connections: {
    sqlite: {
      driver: "sqlite",
      database: base_path("database/database.sqlite")
    },
  },
};
