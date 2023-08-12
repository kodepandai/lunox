// TODO: move this to module @lunoxjs/validation/eloquent
import type { Rule } from "@lunoxjs/core/contracts";
import DB from "../facades/DB";
const Unique: Rule = {
  name: "unique",
  passes: async (args, value) => {
    if (!args || args.length < 2 || args.length > 4) {
      throw new Error(
        "Invalid rule args, the usage must be unique:table,value,?ignored,?ignoredColumn=id",
      );
    }
    const [table, column, ignored, ignoredColumn = "id"] = args;
    const dupplicate = await DB.table(table).where(column, value).first();
    if (
      ignored &&
      dupplicate?.[ignoredColumn].toString() == ignored.toString()
    ) {
      return true;
    }
    if (dupplicate) return false;
    return true;
  },
};

export default Unique;
