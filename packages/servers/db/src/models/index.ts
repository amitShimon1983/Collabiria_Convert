import { getModelForClass } from '@typegoose/typegoose';
import { Message } from './MessageModel';
import { Attachment } from './AttachmentModel';
import { User } from './UserModel';
import { Organization } from './OrganizationModel';
import { Team } from './TeamModel';
import { Geography } from './GeographyModel';
import { OrganizationMember } from './OrganizationMemberModel';
import { TeamMember } from './TeamMemberModel';

export * from './MessageModel';
export * from './AttachmentModel';
export * from './UserModel';
export * from './GeographyModel';
export * from './OrganizationModel';
export * from './TeamModel';
export * from './OrganizationMemberModel';
export * from './TeamMemberModel';

export const MessageModel = getModelForClass(Message);
export const AttachmentModel = getModelForClass(Attachment);
export const UserModel = getModelForClass(User);
export const GeographyModel = getModelForClass(Geography);
export const OrganizationModel = getModelForClass(Organization);
export const TeamModel = getModelForClass(Team);
export const OrganizationMemberModel = getModelForClass(OrganizationMember);
export const TeamMemberModel = getModelForClass(TeamMember);
