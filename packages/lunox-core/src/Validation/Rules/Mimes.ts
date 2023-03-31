import type { Rule } from "../../Contracts/Validation";
import UploadedFile from "../../Http/UploadedFile";

const Mimes: Rule = {
  name: "mimes",
  passes: async (args, value) => {
    if (!args || args.length == 0) {
      throw new Error("Invalid rule args, the usage must be mime:a,b,c");
    }
    if (value instanceof UploadedFile) {
      let match = false;
      args.forEach((arg) => {
        if (value.getClientMimeType()?.includes(arg)) {
          match = true;
        }
      });
      return match;
    }
    return false;
  },
  message: "The :attr must be a file of type: :args.",
};

export default Mimes;
