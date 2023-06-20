import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Plant {
  @Field()
  name: string;

  @Field()
  color: string;

  @Field()
  lastTimeWatered: Date;
}