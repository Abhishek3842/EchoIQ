import { query, mutation } from "./_generated/server";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = ctx.db.query("users").collect();
    return users;
  },
});
export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const users = ctx.db.insert("users", {
      name: "PQR",
    });
  },
});
