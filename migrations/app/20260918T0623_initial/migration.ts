#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/712f26f1bda35588abe643ed857fc4d286ca56c493ee71db101e1570ee08b294/contract';
import endContract from '../../snapshots/712f26f1bda35588abe643ed857fc4d286ca56c493ee71db101e1570ee08b294/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'project',
        columns: [
          col('apiDocumentationUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('architecture', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('caseStudyEnabled', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('challenges', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('displayOrder', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('engineeringDecisions', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('featured', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('githubMetadata', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('liveUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('logoUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('previewImageUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('previewVideoUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('problem', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('repositoryUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('results', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('shortDescription', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('solution', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('IN_DEVELOPMENT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('technologies', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'project_challenges_elem_not_null_8c29d25c',
            'array_position("challenges", NULL) IS NULL',
          ),
          checkExpression(
            'project_engineeringDecisions_elem_not_null_e709f9d6',
            'array_position("engineeringDecisions", NULL) IS NULL',
          ),
          checkExpression(
            'project_results_elem_not_null_ff91de2d',
            'array_position("results", NULL) IS NULL',
          ),
          checkExpression(
            'project_technologies_elem_not_null_89b37e18',
            'array_position("technologies", NULL) IS NULL',
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'project',
        constraint: 'project_slug_key',
        columns: ['slug'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
