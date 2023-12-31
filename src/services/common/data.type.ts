// 该文件需要与服务端 `prisma generate` 生成的接口保持一致

/**
 * Model Version
 *
 */
export type Version = {
  id: string;
  version: string;
  releasedBy: User;
  releasedAt: Date;
  majorVersionId: string;
};

/**
 * Model ComponentDetail
 *
 */
export type ComponentDetail = {
  componentId: string;
  description: string;
  isNew?: boolean;
};

/**
 * Model APIDocPendingUpdate
 *
 */
export type APIDocPendingUpdate = {
  contentId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

/**
 * Model DesignDocPendingUpdate
 *
 */
export type DesignDocPendingUpdate = {
  contentId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

/**
 * Model User
 *
 */
export type User = {
  id: string;
  name: string;
  nickname: string | null;
  email: string;
  pwd: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  role: Role;
};

/**
 * Model MajorVersion
 *
 */
export type MajorVersion = {
  id: string;
  majorVersion: number;
  createdById: string;
  createdAt: Date;
  versions: Version[];
};

/**
 * Model Component
 *
 */
export type Component = {
  id: string;
  category: string;
  components: ComponentDetail[];
  majorVersionId: string;
};

/**
 * Model APIDoc
 *
 */
export type APIDoc = {
  id: string;
  componentId: string;
  majorVersionId: string;
  createdAt: Date;
  updatedAt: Date | null;
  contentId: string;
  pendingUpdate: APIDocPendingUpdate | null;
};

/**
 * Model APIContent
 *
 */
export type APIContent = {
  id: string;
  content: string;
  compiledContent: string;
  docId: string;
};

/**
 * Model APIChangelog
 *
 */
export type APIChangelog = {
  id: string;
  docId: string;
  content: string;
  createdAt: Date;
  createdById: string;
  demandId: string | null;
};

/**
 * Model DesignDoc
 *
 */
export type DesignDoc = {
  id: string;
  componentId: string;
  majorVersionId: string;
  createdAt: Date;
  updatedAt: Date | null;
  contentId: string;
  pendingUpdate: DesignDocPendingUpdate | null;
};

/**
 * Model DesignContent
 *
 */
export type DesignContent = {
  id: string;
  content: string;
  compiledContent: string;
  docId: string;
};

/**
 * Model DesignChangelog
 *
 */
export type DesignChangelog = {
  id: string;
  docId: string;
  content: string;
  createdAt: Date;
  createdById: string;
  demandId: string | null;
};

/**
 * Model Demand
 *
 */
export type Demand = {
  id: string;
  no: number;
  content: string;
  contentDelta: any[];
  createdById: string;
  createdAt: Date;
  updatedAt: Date | null;
  status: DemandStatus;
  majorVersionId: string;
  componentId: string;
  version: Version | null;
  versionId: string | null;
};

/**
 * Model DemandComment
 *
 */
export type DemandComment = {
  id: string;
  content: string;
  contentDelta: any[];
  createdAt: Date;
  createdById: string;
  createdBy?: User;
  updatedAt: Date | null;
  demandId: string;
  commentId: string | null;
  comments?: DemandComment[];
};

/**
 * Model Discussion
 *
 */
export type Discussion = {
  id: string;
  componentId: string;
  content: string;
  contentDelta: any[];
  createdById: string;
  createdAt: Date;
  updatedAt: Date | null;
  majorVersionId: string;
};

/**
 * Model DiscussionComment
 *
 */
export type DiscussionComment = {
  id: string;
  content: string;
  contentDelta: any[];
  createdAt: Date;
  createdById: string;
  updatedAt: Date | null;
  commentId: string | null;
  discussionId: string | null;
  comments?: DiscussionComment[];
  createdBy?: User;
};

/**
 * Model VersionChangelog
 *
 */
export type VersionChangelog = {
  id: string;
  componentId: string;
  type: VersionChangelogType;
  content: string;
  createdAt: Date;
  createdById: string;
  version: string;
  majorVersionId: string;
  demandId: string | null;
  demandNo: number | null;
};

export enum DemandStatus {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED'
}

export enum Role {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  GUEST = 'GUEST'
}

export enum VersionChangelogType {
  FEATURE = 'FEATURE',
  BUGFIX = 'BUGFIX',
  STYLE = 'STYLE',
  REFACTOR = 'REFACTOR'
}
