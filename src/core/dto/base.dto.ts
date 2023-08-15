export interface IBaseDTO {
  // When record was created in our DB
  createdAt?: Date;

  // When record was updated in our DB
  updatedAt?: Date;

  // Indicates if record is active now
  isActive: boolean;

  // Indicate if record is archived
  isArchived: boolean;
}
