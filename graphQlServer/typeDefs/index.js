import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js";

const MergedTypeDefs = mergeTypeDefs([userTypeDef]);

export default MergedTypeDefs;