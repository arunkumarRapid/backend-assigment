import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
export type VehicleDocument = Vehicle & Document;

const transformFun = function (doc: any, ret: any) {
  delete ret._id;
  delete ret.__v;
  return ret;
};

enum VehicleType {
  CAR = 'CAR',
  TRUCK = 'TRUCK',
  BIKE = 'BIKE',
}
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: {
    virtuals: true,
    transform: transformFun,
  },
})
export class Vehicle {
  @Prop({ required: true, enum: VehicleType })
  type: mongooseSchema.Types.String;

  @Prop({ required: true })
  price: mongooseSchema.Types.Number;

  @Prop({ required: true })
  name: mongooseSchema.Types.String;

  @Prop({ required: true })
  productionDate: mongooseSchema.Types.Date;
}

const VehicleSchema = SchemaFactory.createForClass(Vehicle);
VehicleSchema.virtual('id').get(function (this: VehicleDocument) {
  return this._id;
});
export { VehicleSchema };
