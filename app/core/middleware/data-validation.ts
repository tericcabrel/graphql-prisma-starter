import * as yup from 'yup';
import { GraphQLResolveInfo } from 'graphql';

export const dataValidationMiddleware = {
  // tslint:disable-next-line:function-name
  async Mutation(resolve: any, root: any, args: any, context: any, info: GraphQLResolveInfo) {
    const mutationField: any = info.schema.getMutationType()!.getFields()[info.fieldName];
    const mutationValidationSchema = mutationField.validationSchema;

    // If the mutation has a validation schema, validate otherwise continue
    if (mutationValidationSchema) {
      try {
        const values = await mutationValidationSchema.validate(args.data ? args.data : args);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new Error(error.message);
        }

        throw error;
      }
    }
    return await resolve(root, args, context, info);
  },
};
