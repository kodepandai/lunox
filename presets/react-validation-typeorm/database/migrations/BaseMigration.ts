import type { TableColumnOptions } from "typeorm";

export const timestamps: TableColumnOptions[] = [
  {
    name: "created_at",
    type: "timestamp",
    default: "now()",
  },
  {
    name: "updated_at",
    type: "timestamp",
    default: "now()",
  },
  {
    name: "deleted_at",
    type: "timestamp",
    isNullable: true,
  },
];

export const idIncrement: TableColumnOptions[] = [
  {
    name: "id",
    type: "bigint",
    isPrimary: true,
    isGenerated: true,
    generationStrategy: "increment",
    unsigned: true,
  },
];
