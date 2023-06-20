import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePlantInput {
  @Field()
  name: string;

  @Field()
  color: string;

  @Field()
  lastTimeWatered: Date;
}