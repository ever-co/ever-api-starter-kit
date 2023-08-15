import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Cursor for paging through collections */
  ConnectionCursor: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateEmployee = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isActive: Scalars['Boolean']['input'];
  isArchived: Scalars['Boolean']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateEmployeeSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EmployeeSubscriptionFilter;
};

export type CreateManyEmployeesInput = {
  /** Array of records to create */
  employees: Array<CreateEmployee>;
};

export type CreateOneEmployeeInput = {
  /** The record to create */
  employee: CreateEmployee;
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type DeleteManyEmployeesInput = {
  /** Filter to find records to delete */
  filter: EmployeeDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteOneEmployeeInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneEmployeeSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EmployeeSubscriptionFilter;
};

export type Employee = {
  __typename?: 'Employee';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive: Scalars['Boolean']['output'];
  isArchived: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EmployeeAggregateFilter = {
  and?: InputMaybe<Array<EmployeeAggregateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isArchived?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EmployeeAggregateFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type EmployeeAggregateGroupBy = {
  __typename?: 'EmployeeAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type EmployeeAggregateGroupByCreatedAtArgs = {
  by?: GroupBy;
};


export type EmployeeAggregateGroupByUpdatedAtArgs = {
  by?: GroupBy;
};

export type EmployeeAggregateResponse = {
  __typename?: 'EmployeeAggregateResponse';
  count?: Maybe<EmployeeCountAggregate>;
  groupBy?: Maybe<EmployeeAggregateGroupBy>;
  max?: Maybe<EmployeeMaxAggregate>;
  min?: Maybe<EmployeeMinAggregate>;
};

export type EmployeeConnection = {
  __typename?: 'EmployeeConnection';
  /** Array of edges. */
  edges: Array<EmployeeEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type EmployeeCountAggregate = {
  __typename?: 'EmployeeCountAggregate';
  createdAt?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isActive?: Maybe<Scalars['Int']['output']>;
  isArchived?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type EmployeeDeleteFilter = {
  and?: InputMaybe<Array<EmployeeDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isArchived?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EmployeeDeleteFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type EmployeeDeleteResponse = {
  __typename?: 'EmployeeDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EmployeeEdge = {
  __typename?: 'EmployeeEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Employee */
  node: Employee;
};

export type EmployeeFilter = {
  and?: InputMaybe<Array<EmployeeFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isArchived?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EmployeeFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type EmployeeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isActive: Scalars['Boolean']['input'];
  isArchived: Scalars['Boolean']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EmployeeMaxAggregate = {
  __typename?: 'EmployeeMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EmployeeMinAggregate = {
  __typename?: 'EmployeeMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EmployeeSort = {
  direction: SortDirection;
  field: EmployeeSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum EmployeeSortFields {
  CreatedAt = 'createdAt',
  FirstName = 'firstName',
  Id = 'id',
  IsActive = 'isActive',
  IsArchived = 'isArchived',
  LastName = 'lastName',
  UpdatedAt = 'updatedAt'
}

export type EmployeeSubscriptionFilter = {
  and?: InputMaybe<Array<EmployeeSubscriptionFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isArchived?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EmployeeSubscriptionFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type EmployeeUpdateFilter = {
  and?: InputMaybe<Array<EmployeeUpdateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isArchived?: InputMaybe<BooleanFieldComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EmployeeUpdateFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

/** Group by */
export enum GroupBy {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iLike?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  notILike?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  notLike?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyEmployees: Array<Employee>;
  createOneEmployee: Employee;
  deleteManyEmployees: DeleteManyResponse;
  deleteOneEmployee: EmployeeDeleteResponse;
  updateManyEmployees: UpdateManyResponse;
  updateOneEmployee: Employee;
};


export type MutationCreateManyEmployeesArgs = {
  input: CreateManyEmployeesInput;
};


export type MutationCreateOneEmployeeArgs = {
  input: CreateOneEmployeeInput;
};


export type MutationDeleteManyEmployeesArgs = {
  input: DeleteManyEmployeesInput;
};


export type MutationDeleteOneEmployeeArgs = {
  input: DeleteOneEmployeeInput;
};


export type MutationUpdateManyEmployeesArgs = {
  input: UpdateManyEmployeesInput;
};


export type MutationUpdateOneEmployeeArgs = {
  input: UpdateOneEmployeeInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

export type Query = {
  __typename?: 'Query';
  employee: Employee;
  employeeAggregate: Array<EmployeeAggregateResponse>;
  employees: EmployeeConnection;
};


export type QueryEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeeAggregateArgs = {
  filter?: InputMaybe<EmployeeAggregateFilter>;
};


export type QueryEmployeesArgs = {
  filter?: EmployeeFilter;
  paging?: CursorPaging;
  sorting?: Array<EmployeeSort>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  createdEmployee: Employee;
  deletedManyEmployees: DeleteManyResponse;
  deletedOneEmployee: EmployeeDeleteResponse;
  updatedManyEmployees: UpdateManyResponse;
  updatedOneEmployee: Employee;
};


export type SubscriptionCreatedEmployeeArgs = {
  input?: InputMaybe<CreateEmployeeSubscriptionFilterInput>;
};


export type SubscriptionDeletedOneEmployeeArgs = {
  input?: InputMaybe<DeleteOneEmployeeSubscriptionFilterInput>;
};


export type SubscriptionUpdatedOneEmployeeArgs = {
  input?: InputMaybe<UpdateOneEmployeeSubscriptionFilterInput>;
};

export type UpdateEmployee = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateManyEmployeesInput = {
  /** Filter used to find fields to update */
  filter: EmployeeUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateEmployee;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateOneEmployeeInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateEmployee;
};

export type UpdateOneEmployeeSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EmployeeSubscriptionFilter;
};

export type EmployeeQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeeQuery = { __typename?: 'Query', employees: { __typename?: 'EmployeeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null, startCursor?: any | null, endCursor?: any | null }, edges: Array<{ __typename?: 'EmployeeEdge', node: { __typename?: 'Employee', id?: string | null, firstName?: string | null, lastName?: string | null } }> } };

export type EmployeeByNameQueryVariables = Exact<{
  firstNameFilter: Scalars['String']['input'];
  lastNameFilter: Scalars['String']['input'];
}>;


export type EmployeeByNameQuery = { __typename?: 'Query', employees: { __typename?: 'EmployeeConnection', totalCount: number, edges: Array<{ __typename?: 'EmployeeEdge', node: { __typename?: 'Employee', id?: string | null, firstName?: string | null, lastName?: string | null } }> } };

export type UpdateOneEmployeeMutationVariables = Exact<{
  input: UpdateOneEmployeeInput;
}>;


export type UpdateOneEmployeeMutation = { __typename?: 'Mutation', updateOneEmployee: { __typename?: 'Employee', isActive: boolean, isArchived: boolean, firstName?: string | null, lastName?: string | null } };


export const EmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EmployeeQuery, EmployeeQueryVariables>;
export const EmployeeByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"employeeByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstNameFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastNameFilter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstNameFilter"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastNameFilter"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EmployeeByNameQuery, EmployeeByNameQueryVariables>;
export const UpdateOneEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateOneEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOneEmployeeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isArchived"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<UpdateOneEmployeeMutation, UpdateOneEmployeeMutationVariables>;