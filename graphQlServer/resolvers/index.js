import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";


const MergedResolvers = mergeResolvers([userResolver]);

export default MergedResolvers;
